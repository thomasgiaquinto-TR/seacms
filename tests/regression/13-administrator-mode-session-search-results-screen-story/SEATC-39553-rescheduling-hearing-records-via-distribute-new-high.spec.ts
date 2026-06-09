import { test } from '../../../fixtures';

/**
 * SEATC-39553  Rescheduling Hearing Records Via Distribute (new high)
 * Suite: 13 Administrator Mode – Session Search Results Screen Story
 *
 * Preconditions:
 *   Case record is created Calendar Event A Date X [e.g. 05/08/2024 02:00 PM - 02:30 PM] Calendar Type —
 *   Court Session - Judge Session Type — Conference Calendar Event B Date Y [e.g. 05/09/2024 10:00 AM -
 *   10:30 AM] Calendar Type — Court Session - Judge Session Type — Conference
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-39553', () => {
  test.fixme('SEATC-39553 Rescheduling Hearing Records Via Distribute (new high)', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. In Session Detail screen for Calendar Event A. Add Hearing record for the created the Case record.', async () => {
      // Expected: Case Event Hearing scheduled at Calendar Event A.
      // TODO: implement step
    });
    await test.step('2. Choose the scheduled Hearing record. Select \'Distribute\' option from the \'Action\' button', async () => {
      // Expected: 'Bulk Hearing Distibution' pop-up opens
      // TODO: implement step
    });
    await test.step('3. Select any Assignment Rule value. Search with settings: \'Date From\' and \'Date To\' field values to equal Date Y. Calendar Type — Court Session - Judge Session Type — Conference.', async () => {
      // Expected: Calendar Event B displayed in Sessions bundles.
      // TODO: implement step
    });
    await test.step('4. Choose Calendar Event B. Click the \'Save\' button.', async () => {
      // Expected: The Hearing record removed from Session Detail screen Calendar Event A.
      // TODO: implement step
    });
    await test.step('5. Navigate to the Case Hearings screen for the Case record. And observe the same Hearing record', async () => {
      // Expected: The Hearing record is rescheduled to Calendar Event B. The Hearing record Start Date and End Date have been updated and reflect the Date of Y that was associated with Calendar Event B. NOTE: This behavior is not exhibited when a Hearing record is rescheduled using the Reschedule action instead of the Distribute action.
      // TODO: implement step
    });
  });
});
