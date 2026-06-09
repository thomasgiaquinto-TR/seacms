import { test } from '../../../fixtures';

/**
 * SEATC-28076  Set Hearing Status - Bulk Processing: Submit to CMS
 * Suite: Courtroom Actions - Cycling Actions Enhancements
 *
 * Preconditions:
 *   Create a calendar event (if there is no created events in Calendar) Create at least 2 Cases in CMS
 *   (Case1 and Case2) Add a Hearing to Case1 Add a Hearing from Case1 to the calendar event Open Session
 *   Details page via Case Hearings -> View Session link Click on Open in Courtroom Processing link --->
 *   Hearing Session page is open in Courtroom Processing
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-28076', () => {
  test.fixme('SEATC-28076 Set Hearing Status - Bulk Processing: Submit to CMS', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Click on Add Hearing button top right. Select Case2 in Case Number field. Set Hearing Type. Click on Save button', async () => {
      // Expected: A new hearing is added to Courtroom Hearing Session
      // TODO: implement step
    });
    await test.step('2. Select 2 hearings (1 hearing created in CMS, 1 hearing created in Courtroom)', async () => {
      // Expected: Hearings are selected
      // TODO: implement step
    });
    await test.step('3. Click on Actions button bottom right. Click on Bulk Processing button', async () => {
      // Expected: Bulk Processing screen is open. Selected hearings are presented on the screen
      // TODO: implement step
    });
    await test.step('4. Click on Add Action button. Enter and select \'hearingstatus\' code', async () => {
      // Expected: Code Drawer for Set Hearing Status Action appears. Action Interface contains Status* and Applies To* fields. No default values associated with this code.
      // TODO: implement step
    });
    await test.step('5. Populate the required fields and click on Save (tick) button', async () => {
      // Expected: Success banner is displayed. Code Drawer is not closed.
      // TODO: implement step
    });
    await test.step('6. Close the Code Drawer. Go to Minute Order tab of the hearings with recently added action', async () => {
      // Expected: The added action is displayed on Minute Order tab for each modified hearing. Hearing Status is updated according to the recent 'hearingstatus' action
      // TODO: implement step
    });
    await test.step('7. Click on Submit All button. Confirm submission', async () => {
      // Expected: Hearings are submitted to CMS. The Bulk Processing screen is closed. The main Hearing Session page is open
      // TODO: implement step
    });
    await test.step('8. Go to the cases in CMS with recently modified hearings. Open Case Hearings page. Check the Hearing Status', async () => {
      // Expected: Hearing Status is applied correctly
      // TODO: implement step
    });
  });
});
