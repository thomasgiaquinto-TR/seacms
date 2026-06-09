import { test } from '../../../fixtures';

/**
 * SEATC-272  Message pop up screen validation
 * Suite: ACCESS Free Form
 * Summary:
 *   v.3 is ACCESS record message pop up screen validation
 *
 * Preconditions:
 *   Create ACCESS Request (SEATC-249) Create ACCESS Response (SEATC-257)
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-272', () => {
  test.fixme('SEATC-272 Message pop up screen validation', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Navigate to Administration - ACCESS Search - Provide Request Date From and To and click on search', async () => {
      // Expected: ACCESS record appears
      // TODO: implement step
    });
    await test.step('2. Click on record', async () => {
      // Expected: Message details pop up box appears
      // TODO: implement step
    });
    await test.step('3. Validate Request Message Details Bundle: - Case Number - Request Type - Free form message (Only as value if record created using Free Form, else empty) - Request Message Date - Request Message By - Request Message', async () => {
      // Expected: Values should appear as expected in Request Message Details Bundle
      // TODO: implement step
    });
    await test.step('4. Validate Response Message Details bundle: - Response Message Date - Read - Response Message', async () => {
      // Expected: Values should appear as expected in Response Message Details Bundle
      // TODO: implement step
    });
  });
});
