import { test } from '../../../fixtures';

/**
 * SEATC-27967  Auto Maybe Adjust in Full: execute rule > 1 Parties added
 * Suite: Assessment Adjustment In Full pop up screen story
 *
 * Preconditions:
 *   Case is created Party 1; Party 2 are added to the case w/ Role = Defendant Fee record with several
 *   Assessments for Party 1 is created (current total balance = 40) Fee record with 1 Assessment for
 *   Party 2 is created (current total balance = 75)
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27967', () => {
  test.fixme('SEATC-27967 Auto Maybe Adjust in Full: execute rule > 1 Parties added', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. Administration -> Config Manager -> Rules Engine -> Rule -> Docket Entry agenda Confgure rule: DE type = Brief DE Subtype = Brief Filed Event = On Create Priority = any Click to Configure', async () => {
      // Expected: 'Add Action' pop up is displayed
      // TODO: implement step
    });
    await test.step('2. Action = Auto Maybe Adjust in Full Case ID = Case ID Party Sub Type = \'Defendant\' Adjustment Type = \'Waiver\' Adjustment Reason = \'Fee Waiver\' Click [Apply] button Save, Sync to Prod', async () => {
      // Expected: Sync is successful
      // TODO: implement step
    });
    await test.step('3. From precondition case click on \'Docketing\' case menu Add DE from rule (Brief - Brief Filed)', async () => {
      // Expected: Docket Entry is added
      // TODO: implement step
    });
    await test.step('4. Verify Outstanding Rules Notification (Rules Engine icon in the upper right corner)', async () => {
      // Expected: Oustanding Rules Notification is created w/ Status = Pending
      // TODO: implement step
    });
    await test.step('5. Verify Rules Engine Results', async () => {
      // Expected: Record with 'Docket Entry' agenda and 'Pending' Status is created
      // TODO: implement step
    });
    await test.step('6. Click on the record w/ Status = \'Pending\' Click on \'Adjust in Full\' tab', async () => {
      // Expected: Adjustable parties required dropdown is displayed. Populated with Party 1; Party 2 values [Save], [Skip]; [Close] button are displayed
      // TODO: implement step
    });
    await test.step('7. Select Party 1 from the dropdown click [Save] button', async () => {
      // Expected: RER record is created w/ message "All assessment balances due from <Defendant A> have been reduced to $0.00."
      // TODO: implement step
    });
    await test.step('8. Go to Financials menu item Click on Fee record from Precondition for Party 1 Verify Assessment records', async () => {
      // Expected: The balance for all Assessment records is reduced to 0
      // TODO: implement step
    });
    await test.step('9. From Financials menu item click on Fee record from Precondition for Party 2 Verify Assessment records', async () => {
      // Expected: The balance is not updated for Assessment records
      // TODO: implement step
    });
  });
});
