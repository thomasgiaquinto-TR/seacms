import { test } from '../../../fixtures';

/**
 * SEATC-824  Party/Participant: Adding Attorney to Party (new high)
 * Suite: Document Center > ECORE-14019 Document Template Enhancements > 3 Document Template Mapping Management Screen Story
 * Summary:
 *   TC was , SEACMS-1723
 *
 * Preconditions:
 *   Verify that Return of Service Status Type is configured: Administration > Configuration Manager >
 *   Document > Return of Service Status Type Create Criminal - Traffic - DUI-Related
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-824', () => {
  test.fixme('SEATC-824 Party/Participant: Adding Attorney to Party (new high)', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Go to Parties / Participants', async () => {
      // Expected: 'Parties / Participants' screen opens
      // TODO: implement step
    });
    await test.step('2. Click \'Add Representation\' link', async () => {
      // Expected: 'Add Legal Representation' screen is displayed
      // TODO: implement step
    });
    await test.step('3. Select "Representation Type" = Private Counsel. Select Legal Organization. Click \'Search\' link for "Attorney" field', async () => {
      // Expected: 'Attorney Search' pop-up appears
      // TODO: implement step
    });
    await test.step('4. Click [Add New]', async () => {
      // Expected: 'Add Attorney' pop-up opens
      // TODO: implement step
    });
    await test.step('5. Fill in all required fields. Enter values for these additional fields: Default Service Method: Electronic Service Contact -> Email: <any email address> Address: <set values for all required address fields> Click [Save]', async () => {
      // Expected: 'Add Legal Representation' screen is displayed. All fields are filled.
      // TODO: implement step
    });
    await test.step('6. Click [Save]', async () => {
      // Expected: Legal Representation is saved successfully
      // TODO: implement step
    });
  });
});
