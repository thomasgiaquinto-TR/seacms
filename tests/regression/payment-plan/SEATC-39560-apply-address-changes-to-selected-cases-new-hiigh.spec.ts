import { test } from '../../../fixtures';

/**
 * SEATC-39560  Apply Address changes to Selected Cases (new hiigh)
 * Suite: SEATC Test Plan — Optimised Single-Coverage Selection > 57 test cases across 57 functional suites > Methodology: one test case per suite selected for maximum step coverage and functional breadth > Accounting > Payment Plan
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-39560', () => {
  test.fixme('SEATC-39560 Apply Address changes to Selected Cases (new hiigh)', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Go to Administration > Add Index Entry > Add Person > Fill in address fields > Press Save button', async () => {
      // Expected: Manage [Person Name] screen appears. Person is saved succesfully with Address.
      // TODO: implement step
    });
    await test.step('2. Create at least two cases with this person', async () => {
      // Expected: Cases are created successfully
      // TODO: implement step
    });
    await test.step('3. Manage Index Entry > Edit Address fields > Select "Selected Cases"> Press Save button', async () => {
      // Expected: Verify that changes are applied to Selected Cases
      // TODO: implement step
    });
  });
});
