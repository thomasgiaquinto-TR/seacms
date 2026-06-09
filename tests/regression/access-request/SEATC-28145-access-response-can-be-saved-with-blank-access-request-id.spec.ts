import { test, expect } from '../../../fixtures';
import { ProfilePage } from '../../../page-objects/ProfilePage';
import { ApiClient, resolveApiBaseUrl } from '../../../helpers/ApiClient';
import { acquireApiToken, removeMintedToken } from '../../../helpers/tokens';

/**
 * SEATC-28145  ACCESS Response can be saved with blank ACCESS Request ID
 * Suite: ACCESS Integration > ACCESS Request  (SEACMS-2246 AC 4.3)
 *
 * Core behaviour: POST /v1/custom/accessresponse WITHOUT an accessRequestID still
 * saves the response (HTTP 201). We first create an ACCESS Request (the plan's
 * precondition) for context, then post a request-less response.
 *
 * ⚠️ GATED / SELF-SKIPPING BY DEFAULT. A response with no linked request is an
 * orphan on this deploy, and orphan responses cannot be addressed or deleted by
 * id (GET/DELETE 404) — so this test would leave an UNDELETABLE record every run.
 * It only runs when RUN_ORPHANING_TESTS=1; otherwise it skips. (Verified passing
 * when enabled.) Case + request status/type ids are resolved at runtime.
 */

const allowOrphaning = process.env.RUN_ORPHANING_TESTS === '1';

async function deleteRequestIfPresent(api: ApiClient, requestId: string): Promise<void> {
  if (!requestId) return;
  await api.deleteAccessRequest(requestId).catch(() => undefined);
}

test.describe('SEATC-28145 ACCESS Response - blank ACCESS Request ID', () => {
  test.skip(
    !allowOrphaning,
    'Creates an undeletable orphan ACCESS response on this deploy; set RUN_ORPHANING_TESTS=1 to run',
  );

  test('an ACCESS Response saves (201) with no accessRequestID', async ({ authedPage }) => {
    const profile = new ProfilePage(authedPage);
    const apiBaseUrl = resolveApiBaseUrl();
    const tokenName = `pw-api-${Date.now()}`;
    let minted = false;
    let requestId = '';

    const acquired = await test.step('Obtain an Authentication Token', async () => {
      const result = await acquireApiToken(profile, tokenName);
      minted = result.minted;
      expect(result.token).toBeTruthy();
      return result;
    });

    const api = await ApiClient.create({ baseUrl: apiBaseUrl, token: acquired.token });
    try {
      await test.step('Precondition: create an ACCESS Request (201)', async () => {
        const [caseIds, statusIds, typeIds] = await Promise.all([
          api.listCaseIds(0, 1),
          api.listAccessRequestStatusIds(),
          api.listAccessRequestTypeIds(),
        ]);
        const res = await api.createAccessRequest({
          accessRequestDetails: [
            { accessRequestDetailKey: 'FirstName', accessRequestDetailValue: 'PwApi' },
          ],
          caseInstance: caseIds[0],
          requestDate: new Date().toISOString(),
          requestStatus: statusIds[0],
          requestType: typeIds[0],
        });
        expect(res.status(), 'POST accessrequest -> 201').toBe(201);
        requestId = ApiClient.locationId(res);
      });

      await test.step('POST an ACCESS Response with NO accessRequestID -> saved (201)', async () => {
        const res = await api.createAccessResponse({
          accessResponseDetails: [
            { accessResponseDetailKey: 'LastName', accessResponseDetailValue: 'PwApi' },
          ],
          responseDate: new Date().toISOString(),
          // accessRequestID intentionally omitted — the behaviour under test.
        });
        expect(res.status(), 'response should save even without a request id').toBe(201);
      });
    } finally {
      await test.step('Cleanup: delete the request (the request-less response orphan persists)', async () => {
        await deleteRequestIfPresent(api, requestId);
        await api.dispose();
        await removeMintedToken(profile, tokenName, minted);
      });
    }
  });
});
