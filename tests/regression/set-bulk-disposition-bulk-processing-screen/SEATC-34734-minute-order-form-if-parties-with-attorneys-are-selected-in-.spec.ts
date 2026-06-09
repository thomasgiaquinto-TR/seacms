import { test } from '../../../fixtures';

/**
 * SEATC-34734  Minute Order Form - if parties with Attorneys are selected in 'appear' action (new high)
 * Suite: Set Bulk Disposition - Bulk Processing screen
 * Summary:
 *   Based on ECORE-62445
 *
 * Preconditions:
 *   create a Case record with Party1, Party2 and add Representation records associated with each
 *   Party/Participant records: Attorney1 - Former Attorney2 - Active Attorney3 - Future Create a new
 *   Hearing record and link all Party/Participant records to the Hearing record as Applies To Parties
 *   for the Hearing Navigate to the Session Details screen associated with the same Hearing record Click
 *   on the Open in Courtroom Processing link to launch the Courtroom Processing module
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-34734', () => {
  test.fixme('SEATC-34734 Minute Order Form - if parties with Attorneys are selected in \'appear\' action (new high)', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. From the Hearing Session screen, click on the Case Number link for the same Case record to launch the Hearing Processing screen for the same Hearing record Launch the Code Tray Enter the code \'Appear\'', async () => {
      // Expected: Parties Present field is displayed
      // TODO: implement step
    });
    await test.step('2. In the Parties Present field Select parties and Attorneys from Preconditions [Save]', async () => {
      // Expected: Party1 and Party2 are selected Attorney2 - one record is selected Attorney3 - one record is selected Attorney1 is not displayed
      // TODO: implement step
    });
    await test.step('3. Navigate to the Minute Order tab Click the Preview button', async () => {
      // Expected: Minute Order form displays the following Appearance text: "Patry1 (Plaintiff) present. Attorney2 (Representation) present. Attorney3 (Representation) present. Party2 (Defendant) present. Attorney2 (Representation) present. Attorney3 (Representation) present." When a party and their atty is present they will be listed together, however if that atty represents other parties (not present) they are not shown
      // TODO: implement step
    });
  });
});
