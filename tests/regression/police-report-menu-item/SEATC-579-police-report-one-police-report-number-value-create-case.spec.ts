import { test } from '../../../fixtures';

/**
 * SEATC-579  Police Report - one Police Report Number value - Create Case
 * Suite: Police Report menu item
 * Summary:
 *   Report is opened is a separate tab afterthe the report link is clicked for a case with one Police
 *   Report Number value - value is added at case creation phase TC was
 *
 * Preconditions:
 *   Configuration form SEATC-409 is done, Verfiy that 'Police Report' security component is ON for
 *   current user's Role PoliceReportCaseClass itemlist is configured with a Case Classification: Go to
 *   Administration -> Configuration -> Item List -> Item List (Item List Management screen) -> Click
 *   'Edit' for Item List = PoliceReportCaseClass Select Item List = PoliceReportCaseClass, Case Class =
 *   e.g. Criminal Case Classification on 'Case Class Item List Management' screen Save Sync to Prod
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-579', () => {
  test.fixme('SEATC-579 Police Report - one Police Report Number value - Create Case', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Create Case with Case Classification from Step 3 of Preconditions. Add Alt Case Number: Select Police Report Number Fill in the number field', async () => {
      // Expected: Case is created
      // TODO: implement step
    });
    await test.step('2. Click \'Police Report\' menu item', async () => {
      // Expected: A new tab will be opened with the URL set and the Police Report Number value from the case. Format is: https://URL Set/?id=[Police Report Number] Example: https://www.google.com/?id=123-456-789
      // TODO: implement step
    });
  });
});
