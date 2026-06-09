import { test } from '../../../fixtures';

/**
 * SEATC-33809  Verify Compliance Judge value if Sentence record has a Judge value
 * Suite: ACCESS Free Form
 * Summary:
 *   ECORE-16790/ DD ECORE-17064/2 Story/ Acceptance Criteria 3
 *
 * Preconditions:
 *   A Criminal Case was created NO Judge Case assignment was added to the same Case 2 Charge Records
 *   were added to the same Case
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-33809', () => {
  test.fixme('SEATC-33809 Verify Compliance Judge value if Sentence record has a Judge value', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Go to Created Case > Criminal > Charge Management > check both Charge records > [Action] > Bulk Plea/Disposition > add a Sentencing eligible Disposition (e.g. Guilty)', async () => {
      // Expected: Disposition is added
      // TODO: implement step
    });
    await test.step('2. Check both Charge records > [Action] > Sentencing > fill in required fields including Judge (Judge_A) and with an active Sentence status', async () => {
      // Expected: Fields are populated
      // TODO: implement step
    });
    await test.step('3. Click the "Add Another" link under the "Confinement" table > select "Count" = Charge #1 > fill in required fields > save', async () => {
      // Expected: The Confinement record is added in the Confinement table
      // TODO: implement step
    });
    await test.step('4. Click the "Add Another" link under the "Supervision" table > select "Count" = All > fill in required fields > save', async () => {
      // Expected: The Supervision record is added in the Supervision table
      // TODO: implement step
    });
    await test.step('5. Click the "Add Another" link under the "Orders" table > select "Count" = Charge #2 > fill in required fields > save', async () => {
      // Expected: The Order record is added in the Order table
      // TODO: implement step
    });
    await test.step('6. Click the [Save] button', async () => {
      // Expected: The Sentencing record is saved
      // TODO: implement step
    });
    await test.step('7. From the same Case go to Compliance Tracking > open the created within Sentence: Confinement record > verify Judge value Supervision record > verify Judge value Order record > verify Judge value How to recognize records that were created from the Sentence screen: these records have the "Count" field, unlike records that were created by RE Rules or manually from the Compliance Tracking screen (they do not have the "Count" field)', async () => {
      // Expected: Judge = Judge_A in the Confinement record, Supervision record, Order record
      // TODO: implement step
    });
  });
});
