import { test } from '../../../fixtures';

/**
 * SEATC-27890  Document Resource Tokens Management - Import new data
 * Suite: Document Center > ECORE-14019 Document Template Enhancements > 3 Document Template Mapping Management Screen Story
 * Summary:
 *   Based on p. 5 of ECORE-14019 If config is empty download file from Core CMS and remove ID. If error
 *   appears during import, verify Config / Actor / Language / set both for languages from the file.
 *
 * Preconditions:
 *   User with Document Config CRUD components = ON login in the system User added new row with data
 *   (that is not present in the application) to spreadsheet downloaded previously from Document Resource
 *   Tokens Mgmt screen
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27890', () => {
  test.fixme('SEATC-27890 Document Resource Tokens Management - Import new data', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Navigate to Administration -> Configuration Manager -> Document -> Document Resource Tokens', async () => {
      // Expected: Document Resource Tokens Management screen opens
      // TODO: implement step
    });
    await test.step('2. Click [Admin Actions] > Import Data', async () => {
      // Expected: Import Configuration pop-up opens
      // TODO: implement step
    });
    await test.step('3. Select file from precondition Click [Import]', async () => {
      // Expected: File is imported successfully
      // TODO: implement step
    });
    await test.step('4. Inspect Document Resource Tokens Mgmt screen', async () => {
      // Expected: Data from precondition's spreadsheet was added to the table successfully
      // TODO: implement step
    });
    await test.step('5. Go to Administration > Configuration Manager - Sync To Prod', async () => {
      // Expected: Data is successfully Synced
      // TODO: implement step
    });
  });
});
