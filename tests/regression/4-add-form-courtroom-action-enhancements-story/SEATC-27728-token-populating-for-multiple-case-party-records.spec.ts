import { test } from '../../../fixtures';

/**
 * SEATC-27728  Token populating for multiple Case Party records
 * Suite: ECORE-50639 Form Token Refactoring & User Supplied Token Replacement > 4 Add Form Courtroom Action Enhancements Story
 * Summary:
 *   Based on ECORE-50639 p.5
 *
 * Preconditions:
 *   Courtroom Form of Type X associated with Docket Entry Y that contains multiple token values (e.g.
 *   DefendantName) CMS Token value mapped for Party Type B to the 'Party B' (e.g. Defendant) field on
 *   Form X (Administration -> Configuration Manager -> Courtroom -> Courtroom Form Token)
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27728', () => {
  test.fixme('SEATC-27728 Token populating for multiple Case Party records', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Create case with 2 parties of Type B (Defendant) and add Hearing, Parties are linked to the Hearing', async () => {
      // Expected: Case with Parties and Hearing is created
      // TODO: implement step
    });
    await test.step('2. Navigate to Courtroom via link from Session Details screen', async () => {
      // Expected: Courtroom opens
      // TODO: implement step
    });
    await test.step('3. Click on Case record Add Courtroom Form X via the Code Tray', async () => {
      // Expected: Form X is added successfully
      // TODO: implement step
    });
    await test.step('4. Select the Edit Document link for the Form record', async () => {
      // Expected: The Token Source pop up screen will be launched where the user may select the appropriate Case Party record of Sub Type B to populate the token form
      // TODO: implement step
    });
    await test.step('5. Verify Token Source pop-up', async () => {
      // Expected: Token Source - pop-up name Defendant field - DDL (should be a single ddl for every Token which can be populated with several values) [Save] [Cancel] X- close expanded form
      // TODO: implement step
    });
    await test.step('6. Don\'t select any value and click [Save]', async () => {
      // Expected: Form X is added, 'Defendant' token is not populated
      // TODO: implement step
    });
    await test.step('7. Remove previosly added Form OR Refresh Case in the Hearing Seesion', async () => {
      // Expected: Form is removed
      // TODO: implement step
    });
    await test.step('8. Add Form X once again', async () => {
      // Expected: Form X is added successfully
      // TODO: implement step
    });
    await test.step('9. Select the Edit Document link for the Form record and click [Cancel] button on Token Source pop-up', async () => {
      // Expected: Token Source pop up is closed, 'Forms' tab is displayed Edit Form screen is not opened
      // TODO: implement step
    });
    await test.step('10. Select the Edit Document link for the Form record and click X [Close] button on Token Source pop-up', async () => {
      // Expected: Token Source pop up is closed, 'Forms' tab is displayed Edit Form screen is not opened
      // TODO: implement step
    });
    await test.step('11. Select the Edit Document link for the Form record and select Defendant on Token Source pop-up and click [Save]', async () => {
      // Expected: Successful saving and selected Defendant value is displayed
      // TODO: implement step
    });
  });
});
