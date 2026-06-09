import { test } from '../../../fixtures';

/**
 * SEATC-27634  Verify Hearing is added if Case Recusal contains Calendar Event Judge (new high)
 * Suite: Hearing Type Judge Conflict Checking
 * Summary:
 *   TC was
 *
 * Preconditions:
 *   Need to ensure there exists a configured TagType of the ID that is specified in the feature value of
 *   feature calendar.resourceConflict.tagTypeID. The following record will need to be added to Config
 *   manager -> Misc -> Tag Type: - ID: specified value in "calendar.resourceConflict.tagTypeID". OR the
 *   feature value will need to be changed to match this value. - Name: Resource Conflict - Description:
 *   A tag that denotes a resource conflict. - Color: #6b6b6b (same as the others) - Table: CA_Hearing
 *   Create Judge Create Calendar Event and add the created Judge to ASSIGNMENT INFORMATION Create Case
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27634', () => {
  test.fixme('SEATC-27634 Verify Hearing is added if Case Recusal contains Calendar Event Judge (new high)', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Go to Conflict History', async () => {
      // Expected: 'Recusal & Conflict History' screen opens
      // TODO: implement step
    });
    await test.step('2. Add Judge from Preconditions as Recusal via \'Add Resucal\' link', async () => {
      // Expected: Judge was added
      // TODO: implement step
    });
    await test.step('3. Go to Hearing', async () => {
      // Expected: 'Case Hearing' screen opens
      // TODO: implement step
    });
    await test.step('4. Click \'Add Hearing\' link', async () => {
      // Expected: 'Add Hearing' pop-up appears
      // TODO: implement step
    });
    await test.step('5. Select any Hearing Type. Court Session = Calendar Event from Preconditions. Click [Save]', async () => {
      // Expected: Confirmation pop-up with validation is displayed: "The following conflicts have been detected: [Judge Name] on Case [Case Number]. Do you want to continue?" [OK], [Cancel] buttons
      // TODO: implement step
    });
    await test.step('6. Click [OK]', async () => {
      // Expected: Hearing is saved
      // TODO: implement step
    });
  });
});
