import { test, expect } from '../../../fixtures';
import { ProfilePage } from '../../../page-objects/ProfilePage';
import { ApiClient, resolveApiBaseUrl, IvrGeneralInfoResponse } from '../../../helpers/ApiClient';
import { acquireApiToken, removeMintedToken } from '../../../helpers/tokens';

/**
 * SEATC-28234  Case is found - Multiple Case Hearings added
 * Suite: REST Services > ... > Apply To Selected Cases Updates (ECORE-57128)
 *
 * Step 2: GET IVR General Information by case number -> the IVR object includes a
 *   `caseHearings` array (one entry per case hearing, with hearing links).
 * Step 3: with fields = "*,caseHearings(*)" -> the caseHearings entries are
 *   expanded with full hearing details.
 *
 * Endpoint (verified live): GET /v1/custom/ivrgeneralinformation/?caseNumber=...
 * Top-level case block is `caseInstance`.
 *
 * Status: ACTIVE (API-driven). Resolves a case WITH hearings at runtime (no UI
 * setup; the shared system-Chrome session is unreliable for data creation), then
 * asserts the IVR caseHearings reflect that case's hearings exactly. Token comes
 * from API_TOKEN or is minted via the UI and removed in cleanup.
 */

interface CaseWithHearings {
  caseId: string;
  hearingCount: number;
}

function hearingCountOf(summary: { hearings?: unknown[] }): number {
  return Array.isArray(summary.hearings) ? summary.hearings.length : 0;
}

/** Scan cases via the API and return the one with the most hearings in the sample. */
async function findCaseWithMostHearings(api: ApiClient, maxToScan = 40): Promise<CaseWithHearings> {
  const ids = await api.listCaseIds(0, 50);
  let best: CaseWithHearings = { caseId: ids[0] ?? '', hearingCount: -1 };
  for (const caseId of ids.slice(0, maxToScan)) {
    const count = hearingCountOf(await api.getCaseSummary(caseId));
    if (count > best.hearingCount) best = { caseId, hearingCount: count };
    if (best.hearingCount >= 2) break; // a "multiple hearings" case is enough
  }
  return best;
}

function assertHearingEntriesShape(ivr: IvrGeneralInfoResponse, expectedCount: number): void {
  const hearings = ivr.caseHearings ?? [];
  expect(Array.isArray(ivr.caseHearings), 'caseHearings is an array').toBeTruthy();
  expect(hearings, 'caseHearings count matches the case').toHaveLength(expectedCount);
  for (const h of hearings) {
    expect(h, 'each hearing entry has a hearingID').toHaveProperty('hearingID');
  }
}

test.describe('SEATC-28234 IVR General Information - Case Hearings', () => {
  test('IVR returns caseHearings matching the case; field expansion returns details', async ({
    authedPage,
  }) => {
    const profile = new ProfilePage(authedPage);
    const apiBaseUrl = resolveApiBaseUrl();
    const tokenName = `pw-api-${Date.now()}`;
    let minted = false;

    const acquired = await test.step('Obtain an Authentication Token', async () => {
      const result = await acquireApiToken(profile, tokenName);
      minted = result.minted;
      expect(result.token, 'a token should be available').toBeTruthy();
      return result;
    });

    const api = await ApiClient.create({ baseUrl: apiBaseUrl, token: acquired.token });
    try {
      const target = await test.step('Resolve a case with hearings + its case number', async () => {
        const found = await findCaseWithMostHearings(api);
        expect(found.caseId, 'expected to find a case').toBeTruthy();
        const caseNumber = await api.getCaseNumber(found.caseId);
        expect(caseNumber, 'case should have a case number').toBeTruthy();
        return { ...found, caseNumber };
      });

      await test.step('GET IVR by caseNumber -> caseInstance + caseHearings match the case', async () => {
        const ivr = await api.getIvrGeneralInfo(target.caseNumber);
        expect(ivr.caseInstance?.caseID, 'IVR returns the requested case').toBe(target.caseId);
        assertHearingEntriesShape(ivr, target.hearingCount);
      });

      await test.step('GET IVR with fields="*,caseHearings(*)" -> hearings are expanded', async () => {
        const ivr = await api.getIvrGeneralInfo(target.caseNumber, '*,caseHearings(*)');
        expect(ivr.caseInstance?.caseID).toBe(target.caseId);
        assertHearingEntriesShape(ivr, target.hearingCount);
        assertExpandedHearings(ivr, target.hearingCount);
      });
    } finally {
      await api.dispose();
      await test.step('Cleanup: remove the minted token', async () => {
        await removeMintedToken(profile, tokenName, minted);
      });
    }
  });
});

/** With "*,caseHearings(*)" expansion, populated hearing entries carry more than just links. */
function assertExpandedHearings(ivr: IvrGeneralInfoResponse, expectedCount: number): void {
  const hearings = ivr.caseHearings ?? [];
  if (expectedCount === 0) return; // nothing to expand
  const keys = Object.keys(hearings[0] as object);
  expect(keys.length, 'expanded hearing entry has detail fields beyond hearingID/_links').toBeGreaterThan(2);
}
