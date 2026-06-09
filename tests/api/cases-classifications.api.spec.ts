import { test, expect } from '../../fixtures';
import { ApiClient } from '../../helpers/ApiClient';

/**
 * Live REST read test using an env-configured Authentication Token.
 *
 * Self-skips unless API_BASE_URL + API_TOKEN are set, so CI stays green by
 * default. To run it, mint a token via the User Profile screen (see SEATC-27441)
 * and put it in .env:
 *   API_BASE_URL=https://seacms-qa.ctrack.thomsonreuters.com/api
 *   API_TOKEN=<the token value>
 *
 * Auth is the `auth_token` query parameter (see ApiClient).
 */
const live = Boolean(process.env.API_BASE_URL && process.env.API_TOKEN);

test.describe('API: cases/classifications', () => {
  test.skip(!live, 'set API_BASE_URL + API_TOKEN in .env to run live API tests');

  test('GET /v1/cases/classifications returns a non-empty list', async () => {
    const api = await ApiClient.create();
    try {
      const classifications = await api.listCaseClassifications();
      expect(Array.isArray(classifications)).toBeTruthy();
      expect(classifications.length).toBeGreaterThan(0);
    } finally {
      await api.dispose();
    }
  });
});
