import { test, expect } from '../../../fixtures';
import { ProfilePage } from '../../../page-objects/ProfilePage';
import { ApiClient, resolveApiBaseUrl, CaseSummaryResponse } from '../../../helpers/ApiClient';
import { acquireApiToken, removeMintedToken } from '../../../helpers/tokens';

/**
 * SEATC-755  GET Case Summary - No citations
 * Suite: REST Services > ... > Apply To Selected Cases Updates (ECORE-57128)
 *
 * Step 1: GET /v1/custom/caseSummary/{caseID} for a case WITHOUT a citation
 *   -> Response Code 200; body contains case/caseParticipants/citation(EMPTY)/
 *      compliances/hearings/assessments/chargeSummary.
 *
 * Verified live: the top-level case block is `caseInstance` (the plan's pseudo-
 * schema calls it `case`), and `citation` is an empty object `{}` when the case
 * has no citation.
 *
 * Status: ACTIVE (API-driven). Auth is an Authentication Token (auth_token query
 * param). The token comes from API_TOKEN if set, else it is minted via the UI
 * and removed in cleanup. The citation-less case is resolved at runtime from the
 * API (no UI case creation — the shared system-Chrome session is unreliable for
 * the create-case flow). Needs only BASE_URL + admin creds when minting.
 */

interface ResolvedCase {
  caseId: string;
  summary: CaseSummaryResponse;
}

function citationIsEmpty(citation: unknown): boolean {
  if (citation == null) return true;
  return typeof citation === 'object' && Object.keys(citation as object).length === 0;
}

/** Scan the first cases via the API and return the first one with no citation. */
async function findCitationlessCase(api: ApiClient, maxToScan = 30): Promise<ResolvedCase | null> {
  const ids = await api.listCaseIds(0, 50);
  for (const caseId of ids.slice(0, maxToScan)) {
    const summary = await api.getCaseSummary(caseId);
    if (citationIsEmpty(summary.citation)) return { caseId, summary };
  }
  return null;
}

test.describe('SEATC-755 GET Case Summary - No citations', () => {
  test('caseSummary for a citation-less case returns 200 with an empty citation', async ({
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
      const resolved = await test.step('Resolve a citation-less case via the API', async () => {
        const found = await findCitationlessCase(api);
        expect(found, 'expected at least one citation-less case in the first cases').not.toBeNull();
        return found as ResolvedCase;
      });

      await test.step('GET /v1/custom/caseSummary/{caseID} -> 200 with the documented shape', async () => {
        const res = await api.getRaw(`/v1/custom/caseSummary/${resolved.caseId}`);
        expect(res.status(), 'caseSummary should return 200').toBe(200);

        const summary: CaseSummaryResponse = await res.json();
        expect(summary.caseInstance?.caseID).toBe(resolved.caseId);
        expect(Array.isArray(summary.caseParticipants), 'caseParticipants is a list').toBeTruthy();
        expect(Array.isArray(summary.hearings), 'hearings is a list').toBeTruthy();
        expect(Array.isArray(summary.assessments), 'assessments is a list').toBeTruthy();
        expect(Array.isArray(summary.chargeSummary), 'chargeSummary is a list').toBeTruthy();
        expect(summary, 'compliances is present').toHaveProperty('compliances');
        expect(
          citationIsEmpty(summary.citation),
          `citation should be empty, got: ${JSON.stringify(summary.citation)}`,
        ).toBeTruthy();
      });
    } finally {
      await api.dispose();
      await test.step('Cleanup: remove the minted token', async () => {
        await removeMintedToken(profile, tokenName, minted);
      });
    }
  });
});
