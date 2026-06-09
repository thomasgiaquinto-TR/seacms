import { test } from '../../../fixtures';

/**
 * SEATC-28074  Set Hearing Status - Bulk Processing: verify 'hearingstatus' code (Apply to This Hearing)
 * Suite: Broadcast Events
 * Summary:
 *   v2 is based on ECORE-6912 Codes used are deactivated per SEACMS-3897> Moving to retired folder
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
test.describe('SEATC-28074', () => {
  test.fixme('SEATC-28074 Set Hearing Status - Bulk Processing: verify \'hearingstatus\' code (Apply to This Hearing)', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Select 2 cases/hearings. Tap C keyboard button', async () => {
      // Expected: The Code Tray appears
      // TODO: implement step
    });
    await test.step('2. Enter and select \'hearing\' code. Fill in required fields (select future hearings). Click on Save (tick) button', async () => {
      // Expected: Future hearings are added to each case/hearing
      // TODO: implement step
    });
    await test.step('3. Close the Code Tray. Click on Actions button bottom right. Click on Bulk Processing button', async () => {
      // Expected: Bulk Processing screen is open. Selected hearings are presented on the screen
      // TODO: implement step
    });
    await test.step('4. Click on Add Action button. Enter and select \'hearingstatus\' code', async () => {
      // Expected: Code Drawer for Set Hearing Status Action appears. Action Interface contains Status* and Applies To* fields. No default values associated with this code.
      // TODO: implement step
    });
    await test.step('5. Populate the required fields (Applies To = This Hearing). Click on Save (tick) button', async () => {
      // Expected: Success banner is displayed. Code Drawer is not closed.
      // TODO: implement step
    });
    await test.step('6. Close the Code Tray. Navigate to Minute Order tab for each modified hearing', async () => {
      // Expected: The added action is displayed on Minute Order tab. Text column for appropriate action is populated "Status for This Hearing set to [[NewStatus]]".
      // TODO: implement step
    });
    await test.step('7. Click on Back to Hearing Session button top right. Open each modified hearing on the Hearings tab. Check the hearing Status', async () => {
      // Expected: Hearing Status is updated only for the current hearing associated to modified cases/hearings
      // TODO: implement step
    });
  });
});
