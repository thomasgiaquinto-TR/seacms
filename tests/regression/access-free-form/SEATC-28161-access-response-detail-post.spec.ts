import { test, expect } from '../../../fixtures';
import { ProfilePage } from '../../../page-objects/ProfilePage';
import { ApiClient, resolveApiBaseUrl } from '../../../helpers/ApiClient';
import { acquireApiToken, removeMintedToken } from '../../../helpers/tokens';

/**
 * SEATC-28161  ACCESS Response Detail - POST
 * Suite: ACCESS Integration > ACCESS Free Form
 *
 * Steps: with an ACCESS Request + an associated ACCESS Response, POST a new
 * ACCESS Response Detail -> the detail is created (HTTP 201) and appears on the
 * Response.
 *
 * Verified live. Two deploy quirks captured here:
 *  - the response-detail path uses a capital "R": .../accessResponse/{id}/...
 *  - an ACCESS Response is only addressable by id WHILE it is linked to a
 *    request; deleting the request first orphans it (then GET/DELETE 404). So
 *    cleanup deletes the response BEFORE the request — leaving no orphan.
 *
 * Status: ACTIVE (API-driven), fully self-cleaning. Token from API_TOKEN or UI.
 */

const RESPONSE_FIELDS =
  'accessResponseID,accessResponseDetails(accessResponseDetailID,accessResponseDetailKey,accessResponseDetailValue)';

function detailWithKey(
  response: Record<string, unknown>,
  key: string,
): Record<string, unknown> | undefined {
  const details = response.accessResponseDetails as Array<Record<string, unknown>> | undefined;
  return Array.isArray(details) ? details.find((d) => d.accessResponseDetailKey === key) : undefined;
}

async function cleanup(api: ApiClient, responseId: string, requestId: string): Promise<void> {
  // Order matters: delete the response while it is still request-linked, then the request.
  if (responseId) await api.deleteAccessResponse(responseId).catch(() => undefined);
  if (requestId) await api.deleteAccessRequest(requestId).catch(() => undefined);
}

test.describe('SEATC-28161 ACCESS Response Detail - POST', () => {
  test('POST creates an ACCESS Response Detail (201) returned on the Response', async ({
    authedPage,
  }) => {
    const profile = new ProfilePage(authedPage);
    const apiBaseUrl = resolveApiBaseUrl();
    const tokenName = `pw-api-${Date.now()}`;
    let minted = false;
    let requestId = '';
    let responseId = '';

    const acquired = await test.step('Obtain an Authentication Token', async () => {
      const result = await acquireApiToken(profile, tokenName);
      minted = result.minted;
      expect(result.token).toBeTruthy();
      return result;
    });

    const api = await ApiClient.create({ baseUrl: apiBaseUrl, token: acquired.token });
    try {
      await test.step('Precondition: create an ACCESS Request + linked Response', async () => {
        const [caseIds, statusIds, typeIds] = await Promise.all([
          api.listCaseIds(0, 1),
          api.listAccessRequestStatusIds(),
          api.listAccessRequestTypeIds(),
        ]);
        const reqRes = await api.createAccessRequest({
          accessRequestDetails: [
            { accessRequestDetailKey: 'FirstName', accessRequestDetailValue: 'PwApi' },
          ],
          caseInstance: caseIds[0],
          requestDate: new Date().toISOString(),
          requestStatus: statusIds[0],
          requestType: typeIds[0],
        });
        expect(reqRes.status(), 'POST accessrequest -> 201').toBe(201);
        requestId = ApiClient.locationId(reqRes);

        const respRes = await api.createAccessResponse({
          accessRequestID: requestId,
          accessResponseDetails: [],
          responseDate: new Date().toISOString(),
        });
        expect(respRes.status(), 'POST accessresponse -> 201').toBe(201);
        responseId = ApiClient.locationId(respRes);
        expect(responseId, 'response id from Location').toBeTruthy();
      });

      await test.step('POST a new ACCESS Response Detail -> 201', async () => {
        const res = await api.createAccessResponseDetail(responseId, {
          accessResponseDetailKey: 'PwApiKey',
          accessResponseDetailValue: 'PwApiValue',
        });
        expect(res.status(), 'POST response detail should return 201').toBe(201);
      });

      await test.step('GET the Response shows the new detail', async () => {
        const detail = detailWithKey(await api.getAccessResponse(responseId, RESPONSE_FIELDS), 'PwApiKey');
        expect(detail, 'created detail should be present on the response').toBeTruthy();
        expect(detail?.accessResponseDetailValue).toBe('PwApiValue');
      });
    } finally {
      await test.step('Cleanup: delete response then request (no orphan)', async () => {
        await cleanup(api, responseId, requestId);
        await api.dispose();
        await removeMintedToken(profile, tokenName, minted);
      });
    }
  });
});
