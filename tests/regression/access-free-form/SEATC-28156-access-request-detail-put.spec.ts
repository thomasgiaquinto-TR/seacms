import { test, expect } from '../../../fixtures';
import { ProfilePage } from '../../../page-objects/ProfilePage';
import { ApiClient, resolveApiBaseUrl } from '../../../helpers/ApiClient';
import { acquireApiToken, removeMintedToken } from '../../../helpers/tokens';

/**
 * SEATC-28156  ACCESS Request Detail - PUT
 * Suite: ACCESS Integration > ACCESS Free Form
 *
 * Steps: create an ACCESS Request (with a detail) for a case, then
 * PUT /v1/custom/accessrequest/{id}/accessrequestdetails/{detailId} to update
 * the detail -> the updated value is reflected on a subsequent GET.
 *
 * Status: ACTIVE (API-driven), fully self-cleaning: the ACCESS Request is
 * created via POST and removed via DELETE (which cascades its details), so the
 * environment is left unchanged. Case + request status/type ids are resolved at
 * runtime (the test plan's literal ids were stale). Token from API_TOKEN or UI.
 */

function firstDetail(request: Record<string, unknown>): Record<string, unknown> | undefined {
  const details = request.accessRequestDetails as Array<Record<string, unknown>> | undefined;
  return Array.isArray(details) ? details[0] : undefined;
}

async function deleteIfPresent(api: ApiClient, requestId: string): Promise<void> {
  if (!requestId) return;
  await api.deleteAccessRequest(requestId).catch(() => undefined);
}

const DETAIL_FIELDS =
  'accessRequestID,accessRequestDetails(accessRequestDetailID,accessRequestDetailKey,accessRequestDetailValue)';

test.describe('SEATC-28156 ACCESS Request Detail - PUT', () => {
  test('PUT updates an ACCESS request detail and the change is reflected by GET', async ({
    authedPage,
  }) => {
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
      await test.step('Create an ACCESS Request with a detail (201)', async () => {
        const [caseIds, statusIds, typeIds] = await Promise.all([
          api.listCaseIds(0, 1),
          api.listAccessRequestStatusIds(),
          api.listAccessRequestTypeIds(),
        ]);
        expect(caseIds[0] && statusIds[0] && typeIds[0], 'case + status + type ids resolved').toBeTruthy();
        const res = await api.createAccessRequest({
          accessRequestDetails: [
            { accessRequestDetailKey: 'FirstName', accessRequestDetailValue: 'PwApiOrig' },
          ],
          caseInstance: caseIds[0],
          requestDate: new Date().toISOString(),
          requestStatus: statusIds[0],
          requestType: typeIds[0],
        });
        expect(res.status(), 'POST accessrequest should return 201').toBe(201);
        requestId = ApiClient.locationId(res);
        expect(requestId, 'new request id from Location header').toBeTruthy();
      });

      const detailId = await test.step('Read the request detail id', async () => {
        const detail = firstDetail(await api.getAccessRequest(requestId, DETAIL_FIELDS));
        expect(detail?.accessRequestDetailValue).toBe('PwApiOrig');
        return String(detail?.accessRequestDetailID);
      });

      await test.step('PUT the request detail -> 204', async () => {
        const res = await api.updateAccessRequestDetail(requestId, detailId, {
          accessRequestDetailKey: 'FirstName',
          accessRequestDetailValue: 'PwApiUpdated',
        });
        expect(res.status(), 'PUT detail should return 204').toBe(204);
      });

      await test.step('GET reflects the updated detail value', async () => {
        const detail = firstDetail(await api.getAccessRequest(requestId, DETAIL_FIELDS));
        expect(detail?.accessRequestDetailValue).toBe('PwApiUpdated');
      });
    } finally {
      await test.step('Cleanup: delete the ACCESS request and remove the token', async () => {
        await deleteIfPresent(api, requestId);
        await api.dispose();
        await removeMintedToken(profile, tokenName, minted);
      });
    }
  });
});
