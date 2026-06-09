import { test } from '../../../fixtures';

/**
 * SEATC-27639  Verify non conversion files in Docket Entry
 * Suite: Assessment Adjustment In Full pop up screen story
 * Summary:
 *   Ver 3 per ECORE-47437
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27639', () => {
  test.fixme('SEATC-27639 Verify non conversion files in Docket Entry', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Create a new case Add a Docket Entry Upload a mov file Save DE Click on the document icon', async () => {
      // Expected: Document should not be converted to pdf Upon clicking on document icon it should be downloaded in its original extension
      // TODO: implement step
    });
    await test.step('2. Create a new case Add a Docket Entry Upload a wmv file Save DE Click on the document icon', async () => {
      // Expected: All documents should not be converted to PDF/A
      // TODO: implement step
    });
    await test.step('3. Create a new case Add a Docket Entry Upload a wav file Save DE Click on the document icon', async () => {
      // Expected: View Document pop-up is opened Uploaded file is displayed with ability to download it
      // TODO: implement step
    });
    await test.step('4. Create a new case Add a Docket Entry Upload a bmp file Save DE Click on the document icon', async () => {
      // Expected: View Document pop-up is opened Uploaded image is displayed with ability to download it
      // TODO: implement step
    });
    await test.step('5. Create a new case Add a Docket Entry Upload a vob file Save DE Click on the document icon', async () => {
      // Expected: All documents should not be converted to PDF/A
      // TODO: implement step
    });
    await test.step('6. Create a new case Add a Docket Entry Upload a wma file Save DE Click on the document icon', async () => {
      // Expected: All documents should not be converted to PDF/A
      // TODO: implement step
    });
    await test.step('7. Create a new case Add a Docket Entry Upload a mp4 file Save DE Click on the document icon', async () => {
      // Expected: View Document pop-up is opened Uploaded file is displayed with ability to download it
      // TODO: implement step
    });
    await test.step('8. Create a new case Add a Docket Entry Upload a mp3 file Save DE Click on the document icon', async () => {
      // Expected: View Document pop-up is opened Uploaded file is displayed with ability to download it
      // TODO: implement step
    });
    await test.step('9. Create a new case Add a Docket Entry Upload a avi file Save DE Click on the document icon', async () => {
      // Expected: All documents should not be converted to PDF/A
      // TODO: implement step
    });
    await test.step('10. Create a new case Add a Docket Entry Upload a txt file Save DE Click on the document icon', async () => {
      // Expected: All documents should not be converted to PDF/A
      // TODO: implement step
    });
    await test.step('11. Create a new case Add a Docket Entry Upload a Excel file Save DE Click on the document icon', async () => {
      // Expected: All documents should not be converted to PDF/A
      // TODO: implement step
    });
    await test.step('12. Create a new case Add a Docket Entry Upload a HTML file Save DE Click on the document icon', async () => {
      // Expected: All documents should not be converted to PDF/A
      // TODO: implement step
    });
    await test.step('13. Verification of harmful .msq files is moved to meduim Test Case SEATC-28246 :: Version : 1 :: Verify non conversion .msq files in Docket Entry', async () => {
      // Expected: (not specified)
      // TODO: implement step
    });
    await test.step('14. Create a new case Add a Docket Entry Upload a PowerPoint file Save DE Click on the document icon', async () => {
      // Expected: All documents should not be converted to PDF/A
      // TODO: implement step
    });
  });
});
