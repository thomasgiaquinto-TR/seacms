import { test } from '../../../fixtures';

/**
 * SEATC-27927  Document Distribution - MDL Members with different languages
 * Suite: Document Center > ECORE-14019 Document Template Enhancements > 3 Document Template Mapping Management Screen Story
 * Summary:
 *   Created based on ECORE-14019 p. 12
 *
 * Preconditions:
 *   A Document Template Sub Type has been configured with Default Resource Tokens and Non-Default
 *   Resource Tokens The Resource Token Language Tokens contained within the document have values for the
 *   Default Language but only some for the 'Spanish' Language Type. A Document Template Sub Type has
 *   been configured with applied Document Resource Tokens which have Default Language Type Text field
 *   values and some of the Resource Token Language Type Text fields for the Language Type defined as
 *   Spanish have values while others are empty The same Document Template Sub Type has a Document
 *   Template Type that maps to the Document Queue (e.g. Notice) Case is created with several Master
 *   Distribution List Members Some of the Actors records associated with the Master Distribution List
 *   Members do not have any associated Written Language field value and others have an associated
 *   Written Language field value of 'Spanish'
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27927', () => {
  test.fixme('SEATC-27927 Document Distribution - MDL Members with different languages', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Go to Document Queue - Click Add Document link Choose Document Type and Sub Type from precondition, select any DE Click Save button', async () => {
      // Expected: Message "The save was successful." appears Document Distribution screen is displayed
      // TODO: implement step
    });
    await test.step('2. Add all Master Distribution List Members in the Members table', async () => {
      // Expected: All Master Distribution List Members are added in the Members table
      // TODO: implement step
    });
    await test.step('3. Click [Action] -> Distribute Verify generated files', async () => {
      // Expected: Two (2) Document file versions should be generated representing the corresponding Document Template Sub Type File - one with the applied Document Resource Tokens getting replaced by the corresponding Default Language Type Text field values and Non-Default Language field values being removed for the first instance and the other with the applied Document Resource Tokens getting replaced by either the 'Spanish' Resource Token Language Type Text values (where present) or the Default Language Type Text field values where a 'Spanish' value does not exist for the second instance.
      // TODO: implement step
    });
    await test.step('4. Verify Members table of the Document Distribution screen for the sam record', async () => {
      // Expected: The Default Language version of the Document file should be associated with each individual record on the Members table of the Document Distribution screen for the same record where the corresponding Actor records do not have any associated Written Language field value. The Spanish Language version of the Document file should be associated with each individual record on the Members table of the Document Distribution screen for the same record where the corresponding Actor records have an associated Written Language field value of 'Spanish'. Both versions of the Document file should be associated with the corresponding Docket Entry record with Document Name field values in the format: '[[Docket Entry Sub Type]] – [[Language Type Name]]'.
      // TODO: implement step
    });
  });
});
