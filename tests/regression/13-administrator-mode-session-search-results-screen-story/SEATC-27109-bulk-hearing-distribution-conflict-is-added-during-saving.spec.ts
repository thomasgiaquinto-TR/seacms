import { test } from '../../../fixtures';

/**
 * SEATC-27109  Bulk Hearing Distribution - Conflict is added during Saving
 * Suite: 13 Administrator Mode – Session Search Results Screen Story
 * Summary:
 *   Based on p.3.5 of ECORE-13756. V.2 was
 *
 * Preconditions:
 *   Go to Administration > Configuration Manager > Miscellaneous > Tag Type: Configure "Resource
 *   Conflict" tag: Name = Resource Conflict Color = #6b6b6b Table = CA_Hearing Go to Administration >
 *   Configuration Manager > Feature > Feature Enter ID of "Resource Conflict" tag to
 *   "calendar.resourceConflict.tagTypeID" feature value Save and Sync to Prod Create Person1 and add
 *   conflict with Judge A, Judge B, and Judge C Create Case with Person1 and add 3 Hearings in one
 *   two-hour Calendar Event/Session X on 12/29/2020 at 11:00AM in Department Y Judge A, Judge B, and
 *   Judge C are all assigned to three different Calendar Events/Sessions on 12/29/2020 at 11:00AM in
 *   Department Y Login with user with Override Scheduling Conflicts security
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27109', () => {
  test.fixme('SEATC-27109 Bulk Hearing Distribution - Conflict is added during Saving', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Navigate to Session Details screen for Calendar Event/Session X - > Select all 3 Hearings and click [Action] - [Distribute]', async () => {
      // Expected: The Bulk Hearing Distribution pop up is displayed with default values of : Assignment Mode = 'Systemic', Date From = '12/29/2020', Time From = '11:00AM', Date To = '12/29/2020', Time To = '1:00PM', Department = Y
      // TODO: implement step
    });
    await test.step('2. Select a value of \'Round Robin\' in the Assignment Rule field, click [Search] button', async () => {
      // Expected: Session fields representing Judge A, Judge B, and Judge C's Calendar Events/Sessions have dynamically displayed in the Sessions bundle
      // TODO: implement step
    });
    await test.step('3. Click [Save]', async () => {
      // Expected: Confirm message stating the following will be generated: "The following conflicts have been detected: <Judge X> and <Party/Participant Y> From <Case Number>. Do you want to continue? <OK> <Cancel>
      // TODO: implement step
    });
    await test.step('4. Click [Save] on confirm pop-up', async () => {
      // Expected: Confirm pop-up closed Bulk Hearing Distribution pop-up is closed
      // TODO: implement step
    });
    await test.step('5. Navigate to case from Preconditions and Verify Conflicts', async () => {
      // Expected: 3 conflict records from Preconditions are added to case
      // TODO: implement step
    });
  });
});
