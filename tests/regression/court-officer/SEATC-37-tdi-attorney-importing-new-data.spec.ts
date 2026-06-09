import { test } from '../../../fixtures';

/**
 * SEATC-37  TDI - Attorney - Importing New Data
 * Suite: Court Officer
 * Summary:
 *   Reference info: Epic Notes: Transactional Data Import Sample Attorney.csv
 *
 * Preconditions:
 *   User has permissions to navigate to the Transactional Data Import screen Create Attorney1 in CMS and
 *   save the actorInstanceID from the URL (i.e. actorInstanceID=2275) Attorney2 is present only in file
 *   for Import with filled in fields with correct data: Field Name Type Level Req Note Last Name
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-37', () => {
  test.fixme('SEATC-37 TDI - Attorney - Importing New Data', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Go to Administration - Transactional Data Import Click Import button - select Attorney Data Type - attach file from precondition - click Import button', async () => {
      // Expected: Transactional Data Import Search screen is opened Transactional Data Import screen is opened Import is performed
      // TODO: implement step
    });
    await test.step('2. Go to Administration - Transactional Data Import Verify Import History table', async () => {
      // Expected: Table contains record from step 1 Log column is empty Status is Complete
      // TODO: implement step
    });
    await test.step('3. Go to Administration - Utilities - Crawler Select Consumer = Indexed Search - click Crawl button Run Crawler for Actor Instance with Starting ID set to equal Attorney1 actorInstanceID Wait till job\'s status will be updated to Processed', async () => {
      // Expected: (not specified)
      // TODO: implement step
    });
    await test.step('4. Go to Administration - Search Index - Search Attorney Search for Attorney2', async () => {
      // Expected: Attorney2 is found
      // TODO: implement step
    });
    await test.step('5. Open Attorney2', async () => {
      // Expected: Attorney2 has the same information as in import file from precondition, active actor is imported with global scope
      // TODO: implement step
    });
    await test.step('6. Click Edit link within Attorney Information bundle - make some changes - Save', async () => {
      // Expected: Updates are successfully saved
      // TODO: implement step
    });
    await test.step('7. Search for Attorney1 Open it', async () => {
      // Expected: Attorney1 is not changed after perfroming import
      // TODO: implement step
    });
  });
});
