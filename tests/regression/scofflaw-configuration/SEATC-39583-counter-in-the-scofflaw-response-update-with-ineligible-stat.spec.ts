import { test } from '../../../fixtures';

/**
 * SEATC-39583  Counter in the Scofflaw response - update with ineligible status
 * Suite: REST Services > Scofflaw > Scofflaw Configuration
 *
 * Preconditions:
 *   Given: Feature Type: scofflaw.eligibleCitations.number is configured and not blank Given: The case
 *   has Scofflaw Eligible Status value found in Scofflaw Eligible Statuses for Evaluation item list or
 *   value is blank Feature Type: scofflaw.eligibleCitations.number value is 3 by default
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-39583', () => {
  test.fixme('SEATC-39583 Counter in the Scofflaw response - update with ineligible status', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Create 3 Scofflaw cases with the same Plate Number (e.g L111111) and Vehicle Region (e.g. WA) Execute "Populate scofflaw details" task', async () => {
      // Expected: 3 Cases with the same Plate Number (e.g L1111111) and Vehicle Region (e.g. WA) are created Task is executed without errors
      // TODO: implement step
    });
    await test.step('2. Swagger / Scofflaw / GET > Click Try it Out > Execute the request', async () => {
      // Expected: Response Body returns the following: "eligibleCitationCount": 3 // Amount of citation records returned in the response with the same VIN, "vehiclePlateNumber": "L1111111", //Vehicle Plate Number "regionTypeValue": "Washington" // Vehicle License State "regionAbbreviation": "WA" // Vehicle Abbreviated License State
      // TODO: implement step
    });
    await test.step('3. Select 1 Scofflaw case > Update its scofflaw information with Ineligible status (NOT presented in Item List / Item List / Scofflaw Evaluation Item List Values) e.g. Ineligible (2000014) Execute "Populate scofflaw details" task', async () => {
      // Expected: Scofflaw data is updated Task is executed without errors
      // TODO: implement step
    });
    await test.step('4. Swagger / Scofflaw / GET > Click Try it Out > Execute the request', async () => {
      // Expected: Response Body returns the empty array: []
      // TODO: implement step
    });
    await test.step('5. Revert Changes made in step #3 Execute "Populate scofflaw details" task', async () => {
      // Expected: Scofflaw data is updated Task is executed without errors
      // TODO: implement step
    });
    await test.step('6. Swagger / Scofflaw / GET > Click Try it Out > Execute the request', async () => {
      // Expected: Response Body returns the following: "eligibleCitationCount": 3 // Amount of citation records returned in the response with the same VIN, "vehiclePlateNumber": "L1111111", //Vehicle Plate Number "regionTypeValue": "Washington" // Vehicle License State "regionAbbreviation": "WA" // Vehicle Abbreviated License State
      // TODO: implement step
    });
  });
});
