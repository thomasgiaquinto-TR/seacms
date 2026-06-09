import { test } from '../../../fixtures';

/**
 * SEATC-27950  Case Financials for [Party Name]: verify Adjust in Full link
 * Suite: Case Management > Actor Tag for Invalid Driver’s License Number (SEACMS-82) > Index Entry
 *
 * Preconditions:
 *   Active Fee based on any Cost Type exists in the system Case with Party is created Fee is added to
 *   the case w/ Assessment balance = e.g. 10
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27950', () => {
  test.fixme('SEATC-27950 Case Financials for [Party Name]: verify Adjust in Full link', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Go to Financials menu item from Precondition case Click on created Fee record', async () => {
      // Expected: <Case Financials for [Party Name] - Case Number> screen is displayed
      // TODO: implement step
    });
    await test.step('2. Select Assessment record w/ Balance = 10 Click on \'Action\' button', async () => {
      // Expected: 'Adjust in Full' option is displayed
      // TODO: implement step
    });
    await test.step('3. Click on \'Adjust in Full\' option', async () => {
      // Expected: 'Assessment Adjustment in Full' pop up is displayed
      // TODO: implement step
    });
  });
});
