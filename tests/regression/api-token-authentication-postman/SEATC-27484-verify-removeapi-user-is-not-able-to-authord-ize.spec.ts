import { test } from '../../../fixtures';

/**
 * SEATC-27484  Verify removeAPI User is not able to authord ize
 * Suite: API Token Authentication for REST services > API Token Authentication - Postman
 * Summary:
 *   V1 - Based on ECORE-50573
 *
 * Preconditions:
 *   Both 'Global Admin' and 'User Management' administrative components are enabled for the user role in
 *   Role Management At least 1 API User is created in CMS (How to create API User - TC-ECM-28059)
 *   Postman app is installed Authorization cookies are cleared in Postman
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27484', () => {
  test.fixme('SEATC-27484 Verify removeAPI User is not able to authord ize', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Open Postman app. Create any GET request to CMS API (e.g., https://cms-flyers-mssql.ctrack.thomsonreuters.com/api/v1/cases/classifications)', async () => {
      // Expected: Postman is open. Request is created
      // TODO: implement step
    });
    await test.step('2. Open Authorization sub-tab of the request. Select Basic Auth authorization type', async () => {
      // Expected: Authorization sub-tab is open. Basic Auth authorization type is selected
      // TODO: implement step
    });
    await test.step('3. Enter the correct credentials of any existing API User. Click on Send button', async () => {
      // Expected: Request is sent. Response status is not 401 Unauthorized (can be 200, 404 etc. depending on API User role(s)). User is authorized
      // TODO: implement step
    });
    await test.step('4. Go to CMS and log in. Navigate to Administration - API User Management', async () => {
      // Expected: User is logged in to CMS. Search API Users page is open with API Users table
      // TODO: implement step
    });
    await test.step('5. Click on API User row used in Postman request', async () => {
      // Expected: Edit API User page is open
      // TODO: implement step
    });
    await test.step('6. Click on Remove button. Click on OK button', async () => {
      // Expected: Confirmation pop-up "Are you sure you want to remove this item?" appears with OK and Cancel buttons Search API Users page is open. User is removed and not presented in API Users table
      // TODO: implement step
    });
    await test.step('7. Go back to Postman', async () => {
      // Expected: Authorization sub-tab is open in Postman
      // TODO: implement step
    });
    await test.step('8. Leave credentials of removed API User in Username and Password fields. Click on Send button', async () => {
      // Expected: Request is sent. Response status is 401 Unauthorized
      // TODO: implement step
    });
  });
});
