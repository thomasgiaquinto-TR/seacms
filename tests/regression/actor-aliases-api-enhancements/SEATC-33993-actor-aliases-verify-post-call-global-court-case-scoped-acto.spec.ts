import { test, expect } from '../../../fixtures';
import { ProfilePage } from '../../../page-objects/ProfilePage';
import { ApiClient, resolveApiBaseUrl, ActorAlias } from '../../../helpers/ApiClient';
import { acquireApiToken, removeMintedToken } from '../../../helpers/tokens';

/**
 * SEATC-33993  Actor Aliases: verify POST call
 * Suite: Probation Integration REST Services > Actor Aliases API Enhancements
 *
 * Core behaviour (Story 2): POST /v1/actors/{actorID}/aliases creates an alias
 * (HTTP 201) which is then returned by GET /v1/actors/{actorID}/aliases.
 *
 * SCOPE NOTE: the full test plan exercises the Global/Court/Case-scoped
 * propagation matrix with applyToOpenCases=true (requires creating a global
 * actor, copying it to court, and adding it as a party to two cases). That
 * scope-propagation setup is not reproducible on this shared deploy, so this
 * spec covers the essential POST-then-GET contract for a person actor with
 * applyToOpenCases=false. The aliases API has no DELETE, so the spec uses a
 * fixed marker alias and a skip-if-exists guard — pollution is bounded to a
 * single alias on a single (deterministically chosen) actor, created once.
 *
 * Status: ACTIVE (API-driven). Token from API_TOKEN or minted via the UI.
 */

const MARKER = 'PwApiAliasMarker';

function findMarker(aliases: ActorAlias[]): ActorAlias | undefined {
  return aliases.find((a) => a.lastName === MARKER);
}

/** GET aliases; POST the marker alias if absent (asserting 201); return final aliases. */
async function ensureMarkerAlias(
  api: ApiClient,
  actorId: string,
  aliasType: string,
): Promise<ActorAlias[]> {
  const before = await api.getActorAliases(actorId, 'person');
  if (findMarker(before)) return before;
  const res = await api.createActorAlias(actorId, {
    type: 'person',
    aliasType,
    lastName: MARKER,
    applyToOpenCases: false,
  });
  expect(res.status(), 'POST alias should return 201 Created').toBe(201);
  return api.getActorAliases(actorId, 'person');
}

test.describe('SEATC-33993 Actor Aliases - verify POST call', () => {
  test('POST creates a person alias that is then returned by GET', async ({ authedPage }) => {
    const profile = new ProfilePage(authedPage);
    const apiBaseUrl = resolveApiBaseUrl();
    const tokenName = `pw-api-${Date.now()}`;
    let minted = false;

    const acquired = await test.step('Obtain an Authentication Token', async () => {
      const result = await acquireApiToken(profile, tokenName);
      minted = result.minted;
      expect(result.token).toBeTruthy();
      return result;
    });

    const api = await ApiClient.create({ baseUrl: apiBaseUrl, token: acquired.token });
    try {
      const fixture = await test.step('Resolve a person actor and an alias type', async () => {
        const [actorIds, aliasTypeIds] = await Promise.all([
          api.listPersonActorIds(1),
          api.listAliasTypeIds(),
        ]);
        expect(actorIds[0], 'a person actor should exist').toBeTruthy();
        expect(aliasTypeIds[0], 'an alias type should exist').toBeTruthy();
        return { actorId: actorIds[0], aliasType: aliasTypeIds[0] };
      });

      await test.step('POST alias if missing, then GET returns the alias', async () => {
        const aliases = await ensureMarkerAlias(api, fixture.actorId, fixture.aliasType);
        const marker = findMarker(aliases);
        expect(marker, `alias "${MARKER}" should be present after POST`).toBeTruthy();
        expect(marker?.type).toBe('person');
        expect(marker?.aliasID, 'created alias has an id').toBeTruthy();
      });

      await test.step('The created alias is retrievable as a single resource', async () => {
        const marker = findMarker(await api.getActorAliases(fixture.actorId, 'person'));
        const res = await api.getRaw(`/v1/actors/${fixture.actorId}/aliases/${marker?.aliasID}`);
        expect(res.status()).toBe(200);
        const single: ActorAlias = await res.json();
        expect(single.lastName).toBe(MARKER);
      });
    } finally {
      await api.dispose();
      await test.step('Cleanup: remove the minted token', async () => {
        await removeMintedToken(profile, tokenName, minted);
      });
    }
  });
});
