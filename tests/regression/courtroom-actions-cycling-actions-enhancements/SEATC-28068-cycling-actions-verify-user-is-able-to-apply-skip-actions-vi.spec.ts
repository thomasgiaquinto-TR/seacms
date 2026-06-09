import { test } from '../../../fixtures';

/**
 * SEATC-28068  Cycling Actions - verify user is able to apply/skip actions via Cycling functionality
 * Suite: Courtroom Actions - Cycling Actions Enhancements
 *
 * Preconditions:
 *   Create a calendar event (if there is no created events in Calendar) Create at least 3 Cases with
 *   Parties in CMS Add a Hearing to each Case Add a Hearings from each Case to the same calendar event
 *   Open Session Details page via Case Hearings -> View Session link Click on Open in Courtroom
 *   Processing link ---> Hearing Session page is open in Courtroom Processing
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-28068', () => {
  test.fixme('SEATC-28068 Cycling Actions - verify user is able to apply/skip actions via Cycling functionality', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Select 3 hearings using a checkbox', async () => {
      // Expected: Hearings are selected
      // TODO: implement step
    });
    await test.step('2. Click on Actions button bottom right. Click on Bulk Processing button', async () => {
      // Expected: Bulk Processing screen is open. Selected hearings are presented on the screen
      // TODO: implement step
    });
    await test.step('3. Leave 1 hearing selected. Click on Add Action button', async () => {
      // Expected: The Code Tray appears
      // TODO: implement step
    });
    await test.step('4. Enter and select any code/action (e.g., \'address\' / Add Address). Check the Code Tray / Action Interface', async () => {
      // Expected: The code/action is selected. A new Information bar is displayed above the Code Tray containing the Case Number and the Case Title from the left, and the Cycle position counter reflecting the number of selected hearings (1 of 1) from the right . The Action Interface displays the fields related to selected action (with default values defined by the Code). The new Skip (>>) button is added to the Action Interface
      // TODO: implement step
    });
    await test.step('5. Close the Code Tray. Select all hearings in Bulk Processing table. Click on Add Action button', async () => {
      // Expected: The Code Tray appears
      // TODO: implement step
    });
    await test.step('6. Enter and select a code/action which can be applied via the Code Tray / Action Interface, but has additional field(s) in Advanced Mode pop-up (e.g., \'address\' / Add Address). Check the Code Tray / Action Interface', async () => {
      // Expected: The code/action is selected. A new Information bar is displayed above the Code Tray containing the Case Number and the Case Title from the left, and the Cycling position counter (1 of 3) from the right . The Action Interface displays the fields related to selected action (with default values defined by the Code). The new Skip (>>) button is added to the Action Interface
      // TODO: implement step
    });
    await test.step('7. Click on Ellipsis button', async () => {
      // Expected: Advanced Mode pop-up is open
      // TODO: implement step
    });
    await test.step('8. Populate required fields. Click on the Save button', async () => {
      // Expected: Action is applied. Information bar is updated with details (Case Number, Case Title) of the next hearing, Cycling position counter is updated as well (2 of 3). Field values (other than the default values defined by the Code) in the Action Interface are cleared
      // TODO: implement step
    });
    await test.step('9. Click on the Skip (>>) button in Action Interface', async () => {
      // Expected: No action is applied. Information bar is updated with details (Case Number, Case Title) of the next hearing, Cycling position counter is updated as well (3 of 3). Field values (other than the default values defined by the Code) in the Action Interface are cleared
      // TODO: implement step
    });
    await test.step('10. Populate required fields in Action Interface. Click on the Checkmark button', async () => {
      // Expected: Action is applied. Success message is displayed in the Code Tray. Action fields are suppressed, the code value is cleared. The Code Tray remains open, user can enter a new code
      // TODO: implement step
    });
    await test.step('11. Close the Code Tray. Select 2 hearings in Bulk Processing table. Click on Add Action button', async () => {
      // Expected: The Code Tray appears
      // TODO: implement step
    });
    await test.step('12. Enter and select any other code/action which can be applied via the Code Tray / Action Interface (e.g., \'int\' / Set Interpreter Language)', async () => {
      // Expected: The code/action is selected. The Cycling position counter in the Information bar above the Code Tray reflects the number of selected hearings (1of 2). The Action Interface displays the fields related to selected action (with default values defined by the Code)
      // TODO: implement step
    });
    await test.step('13. Populate required fields. Click on the Checkmark button in Action Interface', async () => {
      // Expected: Action is applied. Information bar is updated with details (Case Number, Case Title) of the next hearing, Cycling position counter is updated as well (2 of 2). Field values (other than the default values defined by the Code) in the Action Interface are cleared
      // TODO: implement step
    });
    await test.step('14. Click on the Skip (>>) button in Action Interface', async () => {
      // Expected: No action is applied. Success message is displayed in the Code Tray. Action fields are suppressed, the code value is cleared. The Code Tray remains open, user can enter a new code
      // TODO: implement step
    });
    await test.step('15. Close the Code Tray. Click on Back to Hearing Session button top right', async () => {
      // Expected: The main Hearing Session page is open.
      // TODO: implement step
    });
    await test.step('16. Check the actions added via Cycling functionality are applied to each hearing (open all hearings which have been modified)', async () => {
      // Expected: Actions added via Cycling functionality are applied to the hearings correctly. Skipped actions are not applied to the hearings
      // TODO: implement step
    });
  });
});
