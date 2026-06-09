import { test } from '../../../fixtures';

/**
 * SEATC-28078  Add Bulk DE - Hearing Session: submit to CMS
 * Suite: Add Bulk Docket Entry Action > Add Bulk DE - Hearing Session screen
 *
 * Preconditions:
 *   Create a calendar event (if there is no created events in Calendar) Create at least 2 Cases in CMS
 *   Add a Hearing to each Case Add a Hearings from each Case to the same calendar event Open Session
 *   Details page via Case Hearings -> View Session link Click on Open in Courtroom Processing link --->
 *   Hearing Session page is open in Courtroom Processing
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-28078', () => {
  test.fixme('SEATC-28078 Add Bulk DE - Hearing Session: submit to CMS', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Select at least 2 hearings using a checkbox. Enter \'C\' button on a keyboard', async () => {
      // Expected: The Code Tray appears. Information bar above the Code Tray contains a note with a number of hearings selected (e.g., 2 hearings selected)
      // TODO: implement step
    });
    await test.step('2. Enter and select addbulkdocket code', async () => {
      // Expected: The Action Interface with action fields appears (Type, Description, Status) Information bar above the Code Tray contains a note with a number of hearings selected (e.g., 2 hearings selected)
      // TODO: implement step
    });
    await test.step('3. Populate required fields. Click on Checkmark/Save button', async () => {
      // Expected: Action is applied. Success message is displayed in the Code Tray. The code value is cleared. The Code Tray remains open, user can enter a new code
      // TODO: implement step
    });
    await test.step('4. Enter and select addbulkmotiontodismiss code', async () => {
      // Expected: The Action Interface with action fields appears (Type, Description, Status). Fields are prepopulated with default values
      // TODO: implement step
    });
    await test.step('5. Click on Checkmark/Save button', async () => {
      // Expected: Action is applied. Success message is displayed in the Code Tray. The code value is cleared. The Code Tray remains open, user can enter a new code
      // TODO: implement step
    });
    await test.step('6. Close the Code Tray', async () => {
      // Expected: Hearing Session page is open
      // TODO: implement step
    });
    await test.step('7. Select recently modified hearings (if not selected). Click on Actions menu button bottom right. Select Submit option and confirm Submission', async () => {
      // Expected: Hearings are successfully submitted to CMS
      // TODO: implement step
    });
    await test.step('8. Go to CMS and check the cases are updated by actions made in the hearings', async () => {
      // Expected: Appropriate Docket Entries are added to each case
      // TODO: implement step
    });
  });
});
