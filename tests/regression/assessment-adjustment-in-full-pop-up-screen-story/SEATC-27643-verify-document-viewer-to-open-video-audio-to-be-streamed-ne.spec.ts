import { test } from '../../../fixtures';

/**
 * SEATC-27643  Verify document viewer to open video/audio to be streamed (new high)
 * Suite: Assessment Adjustment In Full pop up screen story
 * Summary:
 *   Based on ECORE-47437
 *
 * Preconditions:
 *   Verify with ALL storage handlers (Azure, Local, SMB) ->
 *   Administration/Utilities/Properties:dms.documentStorageType
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27643', () => {
  test.fixme('SEATC-27643 Verify document viewer to open video/audio to be streamed (new high)', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Create a case', async () => {
      // Expected: Case is created
      // TODO: implement step
    });
    await test.step('2. Add a DE to the case and attach MP4, MP3, WAV files to it', async () => {
      // Expected: DE is created
      // TODO: implement step
    });
    await test.step('3. Click the document icon for each uploaded document', async () => {
      // Expected: "View Document" pop-up is opened with the video/audio to be streamed. It`s possible to watch/listen to video/audio files.
      // TODO: implement step
    });
    await test.step('4. Click [Download] button', async () => {
      // Expected: The video/audio is downloaded
      // TODO: implement step
    });
    await test.step('5. Click [Close] button', async () => {
      // Expected: "View Document" pop-up is closed.
      // TODO: implement step
    });
    await test.step('6. Click Full Screen icon', async () => {
      // Expected: "View Document" pop-up is opened in Full Screen mode.
      // TODO: implement step
    });
    await test.step('7. Click Close (X) icon', async () => {
      // Expected: "View Document" pop-up is closed
      // TODO: implement step
    });
  });
});
