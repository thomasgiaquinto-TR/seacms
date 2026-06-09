import { test } from '../../../fixtures';

/**
 * SEATC-27615  Manage Actor screen: Verify Tag is not applied to Global Actor from Local Actor
 * Suite: Case Management > Actor Tag for Invalid Driver’s License Number (SEACMS-82) > Index Entry
 * Summary:
 *   , SEACMS-82
 *
 * Preconditions:
 *   Features driversLicense.pattern.valid and driversLicense.tag.invalid are configured. Default License
 *   State matches the feature app.defaultState (e.g. WA)
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27615', () => {
  test.fixme('SEATC-27615 Manage Actor screen: Verify Tag is not applied to Global Actor from Local Actor', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Create Global Actor (e.g. Person) with valid DL (e.g. WDL123456789) and defaul State (e.g. WA)', async () => {
      // Expected: Global Actor is created. 'Manage: [Global Actor Name]' screen opens. Tag "Invalid License" is NOT added.
      // TODO: implement step
    });
    await test.step('2. Go to Associated Records', async () => {
      // Expected: "All Resords for: [Global Actor Name]" screen opens
      // TODO: implement step
    });
    await test.step('3. Click [Copy to Local]', async () => {
      // Expected: Record for Local Scope Actor was created successfully.
      // TODO: implement step
    });
    await test.step('4. Click Local Scope Actor Record', async () => {
      // Expected: 'Manage: [Local Actor Name]' screen opens
      // TODO: implement step
    });
    await test.step('5. Click \'Edit\' link in DRIVER\'S LICENSE bundle', async () => {
      // Expected: 'Edit License' pop-up appears
      // TODO: implement step
    });
    await test.step('6. In DRIVER\'S LICENSE bundle: License State = any. Change License Number = 123. Click [Save] Note: License Number does not meet the pattern ^WDL[a-zA-Z0-9]{9}$', async () => {
      // Expected: "Manage: [Actor Name]" screen opens. Changes are saved. Tag "Invalid License" is added.
      // TODO: implement step
    });
    await test.step('7. Go to \'Manage: [Global Actor Name]\' screen for Global Actor from Step#1. Verify "Tags" field.', async () => {
      // Expected: Tag "Invalid License" is NOT added.
      // TODO: implement step
    });
  });
});
