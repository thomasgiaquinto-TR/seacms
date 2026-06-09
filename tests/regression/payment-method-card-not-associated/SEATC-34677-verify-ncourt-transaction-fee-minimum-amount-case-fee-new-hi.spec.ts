import { test } from '../../../fixtures';

/**
 * SEATC-34677  Verify nCourt Transaction Fee (Minimum amount) - Case Fee (new high)
 * Suite: nCourt Transaction Fees > Payment Method/Card not associated
 * Summary:
 *   Created based on ECORE-59403 nCourt Minimum Fee = $2.00, otherwise - 3.5%
 *
 * Preconditions:
 *   Create Case with Party Add Fee for this Party (Financials -> Add Fee) for amount which does not
 *   exceed the value for applying percentages (e.g. $20.00) At least 1 Payment Rule with Payment Option
 *   is configured to be available for created Case (Config -> Accounting -> Payment Rule) Allow Online
 *   Partial Payment is set as TRUE for the same Payment Option (Config -> Accounting -> Payment Option)
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-34677', () => {
  test.fixme('SEATC-34677 Verify nCourt Transaction Fee (Minimum amount) - Case Fee (new high)', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. On Public Portal Home Page press \'Make Payment\' Find Case from precondition -> Complete all tabs before Summary', async () => {
      // Expected: Make Payment - Summary tab is opened
      // TODO: implement step
    });
    await test.step('2. Populate \'Payment Amount\' with a partial values, which does not exceed the value for applying percentages (e.g. $20.00) Verify nCourt transaction fee in Order Summary bundle', async () => {
      // Expected: nCourt Transaction Fee = $2.00 (Minimum amount)
      // TODO: implement step
    });
    await test.step('3. Press \'Check Out\'', async () => {
      // Expected: User is redirected to the nCourt site
      // TODO: implement step
    });
    await test.step('4. Verify \'Service Fee\' amount', async () => {
      // Expected: Service Fee = nCourt Transaction Fee from step 2 = $2.00
      // TODO: implement step
    });
  });
});
