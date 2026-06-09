import { test } from '../../../fixtures';

/**
 * SEATC-34756  Add Form Action - Bulk Mode - Submit to CMS
 * Suite: REST Services > Scofflaw > Scofflaw Configuration
 *
 * Preconditions:
 *   Form1 with Template with Filled in Docket Entry Sub Type field is created and Synced to Production
 *   (via Administration - Configuration Manager - Courtroom - Courtroom Form) Event1 is created Case1
 *   and Case2 are created Case1 and Case2 are added to Event1
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-34756', () => {
  test.fixme('SEATC-34756 Add Form Action - Bulk Mode - Submit to CMS', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Open Event1 - click Open in Courtroom Processing link Check Case1 and Case2 with checkmark Click C keyboard and enter \'form\' code into the <code search> fields Choose Form1 Click Apply icon (green checkmark)', async () => {
      // Expected: Success message appears in Code Drawer Code Drawer is not closed
      // TODO: implement step
    });
    await test.step('2. Close Code Drawer Open Case1 - go to Forms tab', async () => {
      // Expected: Form1 is added to Forms table Add Form Action is added to right Sidebar with the following text: Added form(s): [[Form1 Name]].
      // TODO: implement step
    });
    await test.step('3. Edit Form1 from Case1 (click ellipsis button next to Form1 - click Edit link) Fill in required fields Check Completed checkbox - click Save & Preview button', async () => {
      // Expected: "The form was successfully saved." message appears Completed column is checked in Forms table
      // TODO: implement step
    });
    await test.step('4. Go back to Hearing Session screen Open Case2 - go to Forms tab', async () => {
      // Expected: Form1 is added to Forms table Add Form Action is added to right Sidebar with the following text: Added form(s): [[Form1 Name]].
      // TODO: implement step
    });
    await test.step('5. Edit Form1 from Case2 (click ellipsis button next to Form1 - click Edit link) Fill in required fields Check Completed checkbox - click Save & Preview button', async () => {
      // Expected: "The form was successfully saved." message appears Completed column is checked in Forms table
      // TODO: implement step
    });
    await test.step('6. Click Back to Hearing Session link Check Case1 and Case2 with checkmark Click button with three lines at the right bottom of the screen Click Submit Enter submit Click Ok', async () => {
      // Expected: Courtroom Status for both Case1 and Case2 = Complete
      // TODO: implement step
    });
    await test.step('7. Go to CMS - Case1 - Docketing tab Verify Docket Sheet table', async () => {
      // Expected: Docket Entry from precondition is added to table with filled in Template with the same values as in chosen in step 3
      // TODO: implement step
    });
    await test.step('8. Go to CMS - Case2 - Docketing tab Verify Docket Sheet table', async () => {
      // Expected: Docket Entry from precondition is added to table with filled in Template with the same values as in chosen in step 5
      // TODO: implement step
    });
  });
});
