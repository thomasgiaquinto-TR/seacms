import { test } from '../../../fixtures';

/**
 * SEATC-734  Verify Superform menu item in Courtroom Processing
 * Suite: Police Report menu item
 * Summary:
 *   TC was
 *
 * Preconditions:
 *   Complete SEATC-724, SEATC-725 Go to Administration -> Configuration -> Item List -> Item List (Item
 *   List Management screen) -> Click 'Edit' for Item List = Superform Select Item List = Superform, Case
 *   Class = e.g. Criminal Case Class on 'Case Class Item List Management' screen Save Sync to Prod
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-734', () => {
  test.fixme('SEATC-734 Verify Superform menu item in Courtroom Processing', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Create Case with Case Class group from Step 2 of Preconditions.', async () => {
      // Expected: Case is created
      // TODO: implement step
    });
    await test.step('2. Add Arrest Record via \'Arrest Record Management\' screen. \'Arrest Number\' field is filled.', async () => {
      // Expected: Arrest Record with Arrest Number is created.
      // TODO: implement step
    });
    await test.step('3. Add Hearing to Case', async () => {
      // Expected: Hearing is added
      // TODO: implement step
    });
    await test.step('4. Go to Hearings', async () => {
      // Expected: 'Case Hearing' screen opens
      // TODO: implement step
    });
    await test.step('5. Click \'View Session\' link', async () => {
      // Expected: 'Session Details' screen appears
      // TODO: implement step
    });
    await test.step('6. Click \'Open in Courtroom Processing\' link', async () => {
      // Expected: Courtroom Processing app opens
      // TODO: implement step
    });
    await test.step('7. Click \'Case Number\' link in \'Hearing Session\' bundle. Verfiy meny items.', async () => {
      // Expected: 'Superform' menu item is not displayed
      // TODO: implement step
    });
  });
});
