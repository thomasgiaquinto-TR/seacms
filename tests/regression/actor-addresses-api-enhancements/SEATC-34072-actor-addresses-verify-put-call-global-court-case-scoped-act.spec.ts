import { test, expect } from '../../../fixtures';
import { ProfilePage } from '../../../page-objects/ProfilePage';
import { ApiClient, resolveApiBaseUrl } from '../../../helpers/ApiClient';
import { acquireApiToken, removeMintedToken } from '../../../helpers/tokens';

/**
 * SEATC-34072  Actor Addresses: verify PUT call
 * Suite: Probation Integration REST Services > Actor Addresses API Enhancements
 *
 * Core behaviour (Story 4): PUT /v1/actors/{actorID}/addresses/{addressID} updates
 * an address (HTTP 204) and the change is reflected by a subsequent GET.
 *
 * SCOPE NOTE: the full test plan exercises Global/Court/Case-scoped propagation
 * with applyToOpenCases=true. That setup isn't reproducible on this shared
 * deploy, so this spec covers the essential PUT-then-GET contract with
 * applyToOpenCases=false. Addresses support DELETE, so the test is fully
 * self-cleaning: it creates a throwaway address (POST), updates it (PUT — the
 * assertion under test), verifies via GET, then deletes it (DELETE).
 *
 * Lookup IDs (addressType/country/region) are the deploy's known-good values
 * (verified live). Status: ACTIVE (API-driven). Token from API_TOKEN or UI-minted.
 */

// Known-good lookup ids on seacms-qa (addressType=21, country=US 561, region=1000011).
const ADDR = { addressType: '21', country: '561', region: '1000011', zipCode: '33333' };

function byId(
  addrs: Array<Record<string, unknown>>,
  addressId: string,
): Record<string, unknown> | undefined {
  return addrs.find((a) => String(a.addressID) === addressId);
}

async function createMarkerAddress(api: ApiClient, actorId: string, line1: string): Promise<string> {
  const res = await api.createActorAddress(actorId, { ...ADDR, line1, city: 'Pwtown', applyToOpenCases: false });
  expect(res.status(), 'POST address should return 201').toBe(201);
  const created = (await api.listActorAddresses(actorId)).find((a) => a.line1 === line1);
  expect(created?.addressID, 'created address should be listed').toBeTruthy();
  return String(created?.addressID);
}

async function deleteIfPresent(api: ApiClient, actorId: string, addressId: string): Promise<void> {
  if (!addressId) return;
  await api.deleteActorAddress(actorId, addressId).catch(() => undefined);
}

test.describe('SEATC-34072 Actor Addresses - verify PUT call', () => {
  test('PUT updates an actor address (204) and the change is reflected by GET', async ({
    authedPage,
  }) => {
    const profile = new ProfilePage(authedPage);
    const apiBaseUrl = resolveApiBaseUrl();
    const tokenName = `pw-api-${Date.now()}`;
    const line1 = `PWADDR-${Date.now()}`;
    const updatedLine1 = `${line1}-UPD`;
    let minted = false;
    let actorId = '';
    let addressId = '';

    const acquired = await test.step('Obtain an Authentication Token', async () => {
      const result = await acquireApiToken(profile, tokenName);
      minted = result.minted;
      expect(result.token).toBeTruthy();
      return result;
    });

    const api = await ApiClient.create({ baseUrl: apiBaseUrl, token: acquired.token });
    try {
      actorId = await test.step('Resolve an actor and create a throwaway address', async () => {
        const ids = await api.listPersonActorIds(1);
        expect(ids[0], 'a person actor should exist').toBeTruthy();
        addressId = await createMarkerAddress(api, ids[0], line1);
        return ids[0];
      });

      await test.step('PUT updates the address -> 204', async () => {
        const res = await api.updateActorAddress(actorId, addressId, {
          ...ADDR,
          line1: updatedLine1,
          city: 'Newpwtown',
          applyToOpenCases: false,
        });
        expect(res.status(), 'PUT should return 204 No Content').toBe(204);
      });

      await test.step('GET reflects the updated values', async () => {
        const addr = byId(await api.listActorAddresses(actorId), addressId);
        expect(addr?.line1).toBe(updatedLine1);
        expect(addr?.city).toBe('Newpwtown');
      });
    } finally {
      await test.step('Cleanup: delete the address and remove the token', async () => {
        await deleteIfPresent(api, actorId, addressId);
        await api.dispose();
        await removeMintedToken(profile, tokenName, minted);
      });
    }
  });
});
