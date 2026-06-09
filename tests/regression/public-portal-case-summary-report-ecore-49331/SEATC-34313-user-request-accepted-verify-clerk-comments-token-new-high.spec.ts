import { test } from '../../../fixtures';

/**
 * SEATC-34313  User Request Accepted - verify 'Clerk Comments' token (new high)
 * Suite: Public Portal Case Summary Report - ECORE-49331
 * Summary:
 *   Created based on ECORE-59101 Steps to add the token: -export the FLPUP configuration. It is an excel
 *   file. -locate the Notification Type sheet. It is protected. -click the menu File - info - unprotect
 *   the sheet -search 5aef655a-eb96-4694-be57-4b7e31bd4094 (and other uuid) row on the sheet and locate
 *   the "RichTextBody of Notification Types" column, -add [[Clerk Comments]] to the field and save
 *   -import the excel file to FLPUP.
 *
 * Preconditions:
 *   PP 'User Request Accepted' Notification type is configured with [[Clerk Comments]] token value in
 *   RichTextBody PP User is created Notification Preferences are configured for 'User Request Accepted'
 *   as TRUE for any method (e.g. In Application)
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-34313', () => {
  test.fixme('SEATC-34313 User Request Accepted - verify \'Clerk Comments\' token (new high)', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Login PP with user from preconditions Initiate Interpreter User link Request', async () => {
      // Expected: Request Access screen opened
      // TODO: implement step
    });
    await test.step('2. Fill all required fields Upload valid file Click Submit Request button', async () => {
      // Expected: User Link Request is submitted
      // TODO: implement step
    });
    await test.step('3. Navigate to the Efile->User Link Request Queue Open Request from step#2 Populate \'Comments\' field -> Accept Request', async () => {
      // Expected: Case Access Request accepted
      // TODO: implement step
    });
    await test.step('4. Verify received notification (e.g. In Public Portal -> Notifications)', async () => {
      // Expected: Notification is sent It contains the [[Clerk Comments]] token populated with the comment value from step 3
      // TODO: implement step
    });
  });
});
