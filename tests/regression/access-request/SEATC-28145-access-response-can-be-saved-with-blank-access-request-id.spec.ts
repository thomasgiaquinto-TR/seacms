import { test } from '../../../fixtures';

/**
 * SEATC-28145  ACCESS Response can be saved with blank ACCESS Request ID
 * Suite: ACCESS Integration > ACCESS Request
 * Summary:
 *   Based on the SEACMS-2246 acceptance criteria 4.3
 *
 * Preconditions:
 *   Docket Entry Broadcast Event is configured Broadcast event process configured and running
 *   (SEATC-248)
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-28145', () => {
  test.fixme('SEATC-28145 ACCESS Response can be saved with blank ACCESS Request ID', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Create a Civil case in CMS', async () => {
      // Expected: Case has been created
      // TODO: implement step
    });
    await test.step('2. Navigate to Swagger and authenticate', async () => {
      // Expected: Swagger has been opened and user has been authenticated
      // TODO: implement step
    });
    await test.step('3. Navigate to ACCESS Request - POST /custom/accessrequest and click on \'Try it out!\'', async () => {
      // Expected: accessRequestDTO is opened
      // TODO: implement step
    });
    await test.step('4. Provide values as below and click Execute: { "accessRequestDetails": [ { "accessRequestDetailKey": "FirstName", //Request Key "accessRequestDetailValue": "Potter"//Value for the Request Key } ], "caseInstance": "3", //ID of the created Case "requestDate": "2022-02-14T12:56:56.383Z", //Current Date and Time "requestStatus": "2000008", //Request Status ID "requestType": "2000007" //Request Type ID }', async () => {
      // Expected: Access Request is successfully created with 201 code
      // TODO: implement step
    });
    await test.step('5. Navigate to CMS > Administration > ACCESS Search > Search for the created request', async () => {
      // Expected: Record is displayed in the search results.
      // TODO: implement step
    });
    await test.step('6. Navigate to ACCESS Response - POST /custom/accessresponse and click on \'Try it out!\'', async () => {
      // Expected: accessResponseDTO is opened
      // TODO: implement step
    });
    await test.step('7. Provide values as below and click on execute { "accessRequestID": "2", // Empty value here or we can remove the whole string "accessResponseDetails": [ { "accessResponseDetailKey": "LastName", "accessResponseDetailValue": "Harry" } ], "responseDate": "2022-02-14T13:02:24.509Z" }', async () => {
      // Expected: ACCESS Response Record is saved
      // TODO: implement step
    });
  });
});
