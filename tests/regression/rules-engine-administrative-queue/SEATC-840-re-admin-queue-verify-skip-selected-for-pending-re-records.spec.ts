import { test } from '../../../fixtures';

/**
 * SEATC-840  RE Admin Queue: verify Skip Selected for Pending RE records
 * Suite: Rules Engine Administrative Queue
 * Summary:
 *   v2 is based on ECORE-6251
 *
 * Preconditions:
 *   User has Administrator Rules Engine Queue permission on Several RE result records with Status =
 *   Pending Clerk exist To get Pending Clerk RE records, trigger Maybe Actions, e.g.; Agenda = Tickler
 *   Condition: Tickler Type = Seal File, Is Task = False Event = On Create Action = Maybe Assign
 *   Ticklers Action Parameter: Tickler ID = Tickler ID
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-840', () => {
  test.fixme('SEATC-840 RE Admin Queue: verify Skip Selected for Pending RE records', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Go to Administration > Rules Engine Administrative Queue', async () => {
      // Expected: Rules Engine Administrative Queue screen opens
      // TODO: implement step
    });
    await test.step('2. Select Status = Pending Clerk Click [Search]', async () => {
      // Expected: All records with Status = Pending Clerk are displayed
      // TODO: implement step
    });
    await test.step('3. Check checkbox for one of the pending record Click [Action] > Skip Selected', async () => {
      // Expected: Screen is refreshed, successful save message is displayed Record is no longer displayed in Results table with Pending Clerk status
      // TODO: implement step
    });
    await test.step('4. Select Status = Completed Click [Search]', async () => {
      // Expected: Record updated on step 3 is displayed in Results table
      // TODO: implement step
    });
    await test.step('5. Open case for which record was skipped on step 3 Go to Rules Engine Results Inspect record with Agenda = Tickler', async () => {
      // Expected: Record status = Completed
      // TODO: implement step
    });
  });
});
