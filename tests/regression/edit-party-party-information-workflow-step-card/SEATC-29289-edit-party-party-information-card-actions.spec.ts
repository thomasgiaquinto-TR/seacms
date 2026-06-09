import { test } from '../../../fixtures';

/**
 * SEATC-29289  Edit Party - Party Information card - Actions
 * Suite: Public Portal New Case Filing Features - Part 2 ECORE-52716 > Frontend > Edit Party – Party Information Workflow Step Card
 * Summary:
 *   Created base on ECORE-52922
 *
 * Preconditions:
 *   User is logged in Public Portal as "Public" User type Filing1 is created (Case Type = New Case)
 *   Party is not added to Filing1 Manage Filing screen is opened
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-29289', () => {
  test.fixme('SEATC-29289 Edit Party - Party Information card - Actions', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Click Add Party button Choose any Party Involvement Type Choose any Role - do not check Add Myself checkbox - click Next button Fill in all required fields on Add Party - Name card - click Next button Fill in all required fields on Add Party - Address card - click Next button Fill in all required fields on Add Party - Contact card - click Next button Fill in all required fields on Add Party - Representation card - click Next button Click Finish button', async () => {
      // Expected: Manage Filing Screen – Parties card is opened
      // TODO: implement step
    });
    await test.step('2. Click "Edit" action option for added Party Record', async () => {
      // Expected: Edit Party - Party Information card is opened
      // TODO: implement step
    });
    await test.step('3. Click Edit Role icon', async () => {
      // Expected: When clicked, will launch the Add Party – Choose Role workflow step card described above with the following exceptions: The Role field will be populated with the current field value. The Add Myself field will not be displayed. The Next and Back buttons will not be displayed. Save and Cancel buttons will be displayed that will save or discard the change to the Role value for the Party record in context if one is made.
      // TODO: implement step
    });
    await test.step('4. Click Edit Name icon', async () => {
      // Expected: When clicked, will launch the Add Party – Name workflow step card with the following exceptions: The screen fields will be populated with the current field values. The Next and Back buttons will not be displayed. Save and Cancel buttons will be displayed that will save or discard the change to the Name values for the Party record in context if changes are made.
      // TODO: implement step
    });
    await test.step('5. Click Edit Address icon', async () => {
      // Expected: When clicked, will launch the Add Party – Address workflow step card with the following exceptions: The screen fields will be populated with the current field values. The Next and Back buttons will not be displayed. Save and Cancel buttons will be displayed that will save or discard the change to the Address values for the Party record in context if changes are made.
      // TODO: implement step
    });
    await test.step('6. Click Edit Contact icon', async () => {
      // Expected: When clicked, will launch the Add Party – Contact workflow step card with the following exceptions: The screen fields will be populated with the current field values. The Next and Back buttons will not be displayed. The 'Skip this step' link will not be displayed. Save and Cancel buttons will be displayed that will save or discard the change to the Contact values for the Party record in context if changes are made.
      // TODO: implement step
    });
    await test.step('7. Click Edit Representation icon', async () => {
      // Expected: When clicked: If the corresponding Representation record is a new Representation record that was added via the Add Party – New Representation workflow step card, will launch the Add Party – New Representation workflow step card with the following exceptions: The screen fields will be populated with the current field values. The Next and Back buttons will not be displayed. Save and Cancel buttons will be displayed that will save or discard the change to the values for the Representation record in context if changes are made. If the corresponding Representation record is an existing Representation record that was selected via the Add Party – Representation workflow step card, will launch the Edit Party – Representation workflow step card: The Search Attorney field will be populated with the current field value. A Save button will be displayed and will save any changes to the values for the Representation record in context. A Cancel buttons will be displayed that will discard the changes to the values for the Representation record in context if changes are made.
      // TODO: implement step
    });
    await test.step('8. Click Remove Representation icon', async () => {
      // Expected: When clicked for a given Representation record: A confirmation message should be generated stating: "Are you sure you want to remove this Representation? <OK> <Cancel>" Assuming <OK> is selected, the Representation record will be removed and a message should be generated stating "Representation successfully removed."
      // TODO: implement step
    });
    await test.step('9. Click Add Representation button', async () => {
      // Expected: When clicked will launch the Edit Party – Representation workflow step card: Represebtation Detaisl screen is shown with no pre-selected data Save and Cancel buttons.
      // TODO: implement step
    });
    await test.step('10. Click Back To Parties button', async () => {
      // Expected: When clicked will close the Edit Party – Party Information workflow step card and display the Manage Filing Screen – Parties workflow step card.
      // TODO: implement step
    });
  });
});
