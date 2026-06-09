import { test } from '../../../fixtures';

/**
 * SEATC-28105  Set Bulk Plea - Hearing Session: Submit to CMS
 * Suite: Add Bulk DE - Bulk Processing screen
 *
 * Preconditions:
 *   Create a calendar event (if there is no created events in Calendar) Create at least 2 Criminal Cases
 *   with Defendants in CMS (Case1 and Case2) Add a charge to each case Add a Plea to Case1, leave Case2
 *   unpled Add a Hearing to each Case (Hearing1 and Hearing2) Add a Hearings from each Case to the same
 *   calendar event Open Session Details page via Case Hearings -> View Session link Click on Open in
 *   Courtroom Processing link ---> Hearing Session page is open in Courtroom Processing
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-28105', () => {
  test.fixme('SEATC-28105 Set Bulk Plea - Hearing Session: Submit to CMS', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Select 2 hearings using a checkbox. Enter \'C\' button on a keyboard', async () => {
      // Expected: The Code Tray appears
      // TODO: implement step
    });
    await test.step('2. Enter and select bulkpleaall code', async () => {
      // Expected: Information bar above the Code Tray contains a note with a number of hearings selected (e.g., 2 hearings selected). The Action Interface with the following fields appear: Plea* (not selected by default) 'Include Charges with Plea' checkbox (TRUE by default) 'Charge' field is not presented in Action Interface
      // TODO: implement step
    });
    await test.step('3. Populate Plea field. Click on Checkmark/Save icon', async () => {
      // Expected: Action is applied. Success message is displayed in the Code Tray. The code value is cleared. The Code Tray remains open, user can enter a new code
      // TODO: implement step
    });
    await test.step('4. Close the Code Tray', async () => {
      // Expected: Hearing Session page is open
      // TODO: implement step
    });
    await test.step('5. Select recently modified hearings (if not selected). Click on Actions menu button bottom right. Select Submit option and confirm Submission', async () => {
      // Expected: Hearings are successfully submitted to CMS
      // TODO: implement step
    });
    await test.step('6. Go to CMS and check the cases are updated by action made in the hearings', async () => {
      // Expected: Case1: an existing Plea is updated with a new value. Case2: a new Plea is added
      // TODO: implement step
    });
  });
});
