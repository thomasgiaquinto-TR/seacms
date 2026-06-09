import { test } from '../../../fixtures';

/**
 * SEATC-27681  Verify Court Date field - Traffic Case
 * Suite: Traffic > Update Court Date Field ECORE-51268
 *
 * Preconditions:
 *   The Court Date field is configured as Hidden = N, Required = N, and Active = Y The Bundle associated
 *   with the Court Date field is configured in as Hidden = N and Active = Y
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27681', () => {
  test.fixme('SEATC-27681 Verify Court Date field - Traffic Case', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Navigate Case Management -> Create Case -> Choose Classification = Traffic', async () => {
      // Expected: Create Case screen is displayed
      // TODO: implement step
    });
    await test.step('2. Verify bundle with Court Date field (defaults = Additional Information)', async () => {
      // Expected: Bundle is present, Court Date field is present, NOT requierd
      // TODO: implement step
    });
    await test.step('3. Fill in all the requierd fields, click [Save]', async () => {
      // Expected: Case is created without filled Court Date value
      // TODO: implement step
    });
    await test.step('4. Navigate Case Management -> Create Traffic Case', async () => {
      // Expected: Create Case screen is displayed
      // TODO: implement step
    });
    await test.step('5. Repeat steps 2-3', async () => {
      // Expected: Case is created without filled Court Date value
      // TODO: implement step
    });
  });
});
