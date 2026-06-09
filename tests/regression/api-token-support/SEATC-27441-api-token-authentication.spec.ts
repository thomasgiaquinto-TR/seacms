import { test, expect } from '../../../fixtures';
import { ProfilePage } from '../../../page-objects/ProfilePage';
import { ApiClient, resolveApiBaseUrl } from '../../../helpers/ApiClient';

/**
 * SEATC-27441  Add Authentication Token — REST authentication dimension
 * Suite: API Token Support > API Token Management
 *
 * The companion UI spec (SEATC-27441-add-authentication-token) proves a token
 * can be created. This spec proves the created token actually WORKS: it mints a
 * token through the UI, then uses it to authenticate a live REST call — and that
 * a bogus token is rejected. This is the point of the feature ("API Token
 * Authentication for REST services") and mirrors the negative path in SEATC-27484.
 *
 * Auth scheme (verified live on seacms-qa): the token is passed as the
 * `auth_token` query parameter; Bearer/Basic/X-Auth-Token are rejected with 401.
 *
 * Status: ACTIVE — self-contained (needs only BASE_URL + admin creds; the API
 * base is derived as {BASE_URL}/api). Mints one marker-named token and removes
 * it again in cleanup (bounded pollution).
 */
test.describe('SEATC-27441 Authentication Token — REST authentication', () => {
  test('a UI-minted token authenticates a REST call; a bogus token is rejected', async ({
    authedPage,
  }) => {
    const profile = new ProfilePage(authedPage);
    const apiBaseUrl = resolveApiBaseUrl();
    const tokenName = `pw-api-${Date.now()}`;
    let token = '';

    await test.step('Mint an Authentication Token via the User Profile screen', async () => {
      await profile.goto();
      token = await profile.createTokenAndReveal(tokenName);
      // Tokens use a broad charset (incl. ~ / + = _ -); just assert a long, no-whitespace value.
      expect(token, 'token value should be revealed').toMatch(/^\S{20,}$/);
    });

    try {
      await test.step('Token authenticates GET /v1/cases/classifications (200, non-empty list)', async () => {
        const api = await ApiClient.create({ baseUrl: apiBaseUrl, token });
        try {
          const res = await api.getRaw('/v1/cases/classifications');
          expect(res.status(), 'authenticated request should not be 401').toBe(200);
          const classifications = await res.json();
          expect(Array.isArray(classifications)).toBeTruthy();
          expect(classifications.length).toBeGreaterThan(0);
        } finally {
          await api.dispose();
        }
      });

      await test.step('A bogus token is rejected with 401 Unauthorized', async () => {
        const api = await ApiClient.create({ baseUrl: apiBaseUrl, token: 'not-a-real-token-value' });
        try {
          const res = await api.getRaw('/v1/cases/classifications');
          expect(res.status()).toBe(401);
        } finally {
          await api.dispose();
        }
      });
    } finally {
      await test.step('Cleanup: remove the minted token', async () => {
        await profile.removeToken(tokenName).catch(() => {
          // Best-effort: leftover marker-named tokens are bounded and harmless.
        });
      });
    }
  });

  test('ApiClient.create throws when base URL or token is missing (contract, no network)', async () => {
    await expect(ApiClient.create({ baseUrl: '', token: '' })).rejects.toThrow(/baseUrl is required/);
    await expect(ApiClient.create({ baseUrl: 'https://x/api', token: '' })).rejects.toThrow(
      /token is required/,
    );
  });
});
