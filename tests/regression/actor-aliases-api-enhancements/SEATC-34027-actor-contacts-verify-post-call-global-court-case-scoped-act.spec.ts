import { test, expect } from '../../../fixtures';
import { ProfilePage } from '../../../page-objects/ProfilePage';
import { ApiClient, resolveApiBaseUrl } from '../../../helpers/ApiClient';
import { acquireApiToken, removeMintedToken } from '../../../helpers/tokens';

/**
 * SEATC-34027  Actor Contacts: verify POST call
 * Suite: Probation Integration REST Services > Actor Contacts API Enhancements
 *
 * Core behaviour (Story 3): POST /v1/actors/{actorID}/contacts creates a contact
 * (HTTP 201) which is then returned by GET /v1/actors/{actorID}/contacts.
 *
 * SCOPE NOTE: the full test plan exercises Global/Court/Case-scoped propagation
 * with applyToOpenCaseDistributionLists=true. That setup isn't reproducible on
 * this shared deploy, so this spec covers the essential POST-then-GET contract
 * with applyToOpenCaseDistributionLists=false. Contacts support DELETE, so the
 * test is fully self-cleaning (POST -> verify via GET -> DELETE).
 *
 * contactTypeEntityID 23 is the deploy's Email contact type (verified live).
 * Status: ACTIVE (API-driven). Token from API_TOKEN or UI-minted.
 */

const EMAIL_CONTACT_TYPE = '23';

function byContactValue(
  contacts: Array<Record<string, unknown>>,
  value: string,
): Record<string, unknown> | undefined {
  return contacts.find((c) => c.contactValue === value);
}

async function deleteIfPresent(api: ApiClient, actorId: string, contactId: string): Promise<void> {
  if (!contactId) return;
  await api.deleteActorContact(actorId, contactId).catch(() => undefined);
}

test.describe('SEATC-34027 Actor Contacts - verify POST call', () => {
  test('POST creates a contact (201) that is then returned by GET', async ({ authedPage }) => {
    const profile = new ProfilePage(authedPage);
    const apiBaseUrl = resolveApiBaseUrl();
    const tokenName = `pw-api-${Date.now()}`;
    const contactValue = `pwapi-${Date.now()}@test.com`;
    let minted = false;
    let actorId = '';
    let contactId = '';

    const acquired = await test.step('Obtain an Authentication Token', async () => {
      const result = await acquireApiToken(profile, tokenName);
      minted = result.minted;
      expect(result.token).toBeTruthy();
      return result;
    });

    const api = await ApiClient.create({ baseUrl: apiBaseUrl, token: acquired.token });
    try {
      actorId = await test.step('Resolve a person actor', async () => {
        const ids = await api.listPersonActorIds(1);
        expect(ids[0], 'a person actor should exist').toBeTruthy();
        return ids[0];
      });

      await test.step('POST contact -> 201', async () => {
        const res = await api.createActorContact(actorId, {
          contactValue,
          contactComment: 'Added within SEATC-34027 (Playwright)',
          contactTypeEntityID: EMAIL_CONTACT_TYPE,
          applyToOpenCaseDistributionLists: false,
        });
        expect(res.status(), 'POST contact should return 201 Created').toBe(201);
      });

      await test.step('GET returns the created contact', async () => {
        const created = byContactValue(await api.listActorContacts(actorId), contactValue);
        expect(created, `contact ${contactValue} should be listed`).toBeTruthy();
        expect(created?.contactID, 'created contact has an id').toBeTruthy();
        contactId = String(created?.contactID);
      });
    } finally {
      await test.step('Cleanup: delete the contact and remove the token', async () => {
        await deleteIfPresent(api, actorId, contactId);
        await api.dispose();
        await removeMintedToken(profile, tokenName, minted);
      });
    }
  });
});
