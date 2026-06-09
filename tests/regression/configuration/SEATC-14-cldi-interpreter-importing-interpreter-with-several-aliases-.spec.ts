import { test } from '../../../fixtures';

/**
 * SEATC-14  CLDI - Interpreter - Importing Interpreter with several Aliases,Classif,Locations,Contacts,Addresses
 * Suite: Configuration
 *
 * Preconditions:
 *   User has permissions to navigate to the Transactional Data Import screen Create Interpreter1 in CMS
 *   and save the actorInstanceID from the URL (i.e. actorInstanceID=2275) Interpreter2 is present in
 *   file for Import with filled in: Row 2 - all fields with correct information Row 3 - all fields are
 *   empty except of Alias Type, Alias Last Name, First Name, Prefix, Suffix, Locations Served,
 *   Interpreter Classification, Interpreter Language, Certification Number, Contact Type, Contact
 *   Number, Tags, Adress Type, Line1, City and State - these fields are filled in with valid data;
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-14', () => {
  test.fixme('SEATC-14 CLDI - Interpreter - Importing Interpreter with several Aliases,Classif,Locations,Contacts,Addresses', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Go to Administration > Transactional Data Importer Upload Import File', async () => {
      // Expected: File is uploaded Interpreter2 is imported
      // TODO: implement step
    });
    await test.step('2. Go to Administration - Utilities - Crawler Run Crawler for Actor Instance with Starting ID set to equal Interpreter1 actorInstanceID Wait till job\'s status = Completed', async () => {
      // Expected: (not specified)
      // TODO: implement step
    });
    await test.step('3. Go to Administration - Search Index - Search Interpreter Search Interpreter2 from precondition', async () => {
      // Expected: Interpreter2 is found
      // TODO: implement step
    });
    await test.step('4. Open Interpreter2', async () => {
      // Expected: Interpreter2 has the same data as in precondition: Two Aliases Two Locations Two Interpreter Classifications Two Contacts Two Addresses
      // TODO: implement step
    });
    await test.step('5. Search for Interpreter1 Open it', async () => {
      // Expected: Interpreter1 is not changed after performing import
      // TODO: implement step
    });
  });
});
