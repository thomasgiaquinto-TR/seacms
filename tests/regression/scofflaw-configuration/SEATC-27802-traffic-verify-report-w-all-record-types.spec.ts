import { test } from '../../../fixtures';

/**
 * SEATC-27802  Traffic - verify report w/ all record types
 * Suite: REST Services > Scofflaw > Scofflaw Configuration
 * Summary:
 *   Should be verified from Case View and Session Details screens v3 is
 *
 * Preconditions:
 *   Administration -> Config Manager -> Case -> Case Summary Report Make sure the following record types
 *   are added for Traffic case class group: - Citations -Default = True; Order by =100 - Charges
 *   -Default =true , Order by =200 - Compliance Tracking -Default =True, Order by =300 - Financials
 *   -Deafult = True,Order by =400 - Bail Bonds-Default =True ,Order by =500 Traffic case is created w/ a
 *   charge, citation and several parties Hearing is scheduled for the case
 *
 * Status: SCAFFOLD (test.fixme) — steps captured verbatim from the SEATC test
 * plan. Implement the actions/assertions against the live app; remove .fixme
 * once green. Some steps need config changes, multiple users, or external
 * tools (Swagger/Postman) as noted in Preconditions.
 */
test.describe('SEATC-27802', () => {
  test.fixme('SEATC-27802 Traffic - verify report w/ all record types', async ({ loginHelper }) => {
    await loginHelper.loginAsAdmin();
    await test.step('1. From created case add the following items: Citations(traffic->citation management) Charges(traffic->charge management->action-add new charge) Compliance Tracking (Traffic -> Charge Mgmt -> Bulk plea/ disposition on a charge check charge again -> Sentencing -> add sentence w/ incarceration/ probation/ order) Financials (via Financials -> Add Fee) Bail Bonds (via Bail/ Bond Mgmt)', async () => {
      // Expected: Items are added to the case
      // TODO: implement step
    });
    await test.step('2. From \'Case View\' of created case click Case Summary Report icon On \'Case Summary Report\' pop up make sure all record types from precondition are checked Click [Generate] button', async () => {
      // Expected: Case Summary Report is generated
      // TODO: implement step
    });
    await test.step('3. Verify the tables are displayed on the report in the following order: 1. Citations 2.Charges 3.Compliance tracking 4.Financials 5.Bail bonds', async () => {
      // Expected: The tables are displayed on the report in the following order: 1.Citations 2.Charges 3.Compliance tracking 4.Financials 5.Bail bonds
      // TODO: implement step
    });
    await test.step('5. Verify columns in each bundle', async () => {
      // Expected: Citations: Record limit -No Maximum record limit Fields: Citation No. - static text - The Citation # of the Citation record in context. Statute - static text - The Statute associated with the Charge record in context in [[Statute – Name]] format Violation Date - static text - The Violation Date and Time of the Citation record in context. Citing Agency - static text - The Citing Agency associated with the Citation record in context Officer 1- static text -The Officer Type – Officer Name – and Officer Badge number of the Citing Officer of the Citation record in context. The Officer Name should display in display name format Bundle is populated w/ data from precondition
      // TODO: implement step
    });
    await test.step('6. Verify the Citations table will exclude Defendant, Filing Date, Jurisdiction.', async () => {
      // Expected: The Citations table should excluded the Defendant, Filing Date, Jurisdiction.
      // TODO: implement step
    });
    await test.step('7. Verify Charges bundle', async () => {
      // Expected: Charges: Record limit -No Maximum record limit Fields: # - static text - The Count Number of the Charge record in context. Offense Type - static text - The Offense Type of the Charge record in context. Statute - static text - The Statute associated with the Charge record in context in [[Statute – Name]] format. Offense Date -static text- The Offense Date of the Charge record in context. PC Finding - static text - The Probable Cause Finding of the Charge record in context. Plea - static text - The Plea associated with the Charge record in context, if any. Disposition - static text - The Disposition Type and Disposition Method associated with the Charge record in context, if any. The Disposition should display in [[Disposition Type – Disposition Method]] format. Bundle is populated w/ data from precondition
      // TODO: implement step
    });
    await test.step('8. Verify the Charges table will exclude Defendant, Preparatory Offense and Bound Over.', async () => {
      // Expected: The Charges table should excluded the Defendant, Preparatory Offense and Bound Over.
      // TODO: implement step
    });
    await test.step('9. Verify Compliance Tracking bundle', async () => {
      // Expected: Compliance Tracking: Record limit -No Maximum record limit Fields: Confinement: # - static text - The Count # of the Confinement record in context. Facility - static text- The Facility of the Confinement record in context. Status - static text - The current status of the Confinement record in context. Duration - static text - The Duration of the Confinement record in context Time Reduction -static text - The Time Reduction of the Confinement record in context. Report Date - static text - The Report Date of the Confinement record in context Sentence Type - static text - The Sentence Type of the Confinement record in context Sentence Date - static text -The Sentence Date of the Confinement record in context Judge - static text - The Judge of the Confinement record in context Concurrent/Consecutive - static text - The Concurrent/ Consecutive Case Numbers of the Confinement record in context. Supervision: # - static text - The Count # of the Supervision record in context Supervision Type -static text - The Supervision Type of the Supervision record in context Status -static text - The current Status of the Supervision record in context Agency - static text - The Agency associated with the Supervision record in context Duration -static text - The Duration of the Supervision record in context. Start Date - static text - The Start Date of the Supervision record in context. Sentence Type - static text - The Sentence Type of the Supervision record in context. Sentence Date -static text - The Sentence Date of the Supervision record in context. Judge -static text - The Judge of the Supervision record in context. Orders # - static text - The Count # of the Order record in context. Type -static text - The Type of the Order record in context. Status -static text - The current Status of the Order record in context. Agency - static text - The Agency associated with the Order record in context. Duration -static text - The Duration of the Order record in context. Due Date - static text - The Due Date of the Order record in context. Time Reduction - static text - The Time Reduction of the Order record in context. Sentence Type - static text - The Sentence Type of the Order record in context. Sentence Date -static text - The Sentence Date of the Order record in context. Judge -static text - The Judge of the Supervision record in context. Concurrent/Consecutive - static text - The Concurrent/ Consecutive Case Numbers of the Orders record in context Bundle is populated w/ data from step 1
      // TODO: implement step
    });
    await test.step('10. Verify excluded fields in Compliance Tracking-Confinement table', async () => {
      // Expected: The Compliance Tracking-Confinement table should excluded the Applies To.
      // TODO: implement step
    });
    await test.step('11. Verify excluded fields in Compliance tracking supervision table', async () => {
      // Expected: The Compliance Tracking-Supervision table should excluded the Applies To
      // TODO: implement step
    });
    await test.step('12. Verify excluded fields in the Compliance Tracking-Orders', async () => {
      // Expected: The Compliance Tracking-Orders table should excluded the Applies To.
      // TODO: implement step
    });
    await test.step('13. In Financials bundle verify "Financials by party" table', async () => {
      // Expected: Information for this table is picked from "Case Financial" screen, "Financials by Party" bundle Record limit -No Maximum record limit Fields: # - static text - The Party/Participant # of the Party/Participant of the Financial record in context. Role (of Due From party) -static text - The Role of the Due from Party/Participant of the Financial record in context Unapplied -static text - The assessment item amount held in a case-specific Unapplied Account Due from the Party/Participant of the Financial record in context Not Required -static text - The total assessment item currently in a Not Required status Due from the Party/Participant of the Financial record in context Assessed -static text - The total assessment item currently in Assessed status Due from the Party/Participant of the Financial record in context. Adjusted - static text - The total assessment item currently in Adjustment on Assessments Due from the Party/Participant of the Financial record in context. Transferred -static text - The total assessment item in Transfer transactions of the Party/Participant of the Financial record in context. Paid - static text - The total assessment item amount Paid on Assessments Due from the Party/Participant of the Financial record in context. Disbursed -static text - The total assessment item amount Disbursed to the Party/Participant of the Financial record in context. Balance -static text - The total assessment item outstanding Balance of Assessments Due from the Party/Participant of the Financial record in context In collections - static text - Indicates the Financial Record in Context is In Collection Bundle is populated w/ data from step 1
      // TODO: implement step
    });
    await test.step('14. In Financials bundle verify "Assessment Items" table', async () => {
      // Expected: Information for this table is picked from "Case Financial for Party" screen, "Assessments" bundle Record limit -No Maximum record limit Fields: # - static text - The Party/Participant # of the Party/Participant of the Financial record in context. Role (of Due From party) -static text - The Role of the Due from Party/Participant of the Financial record in context Cost type - static text - The individual value by assessment item Due from the Party/Participant of the assessment record in context. Assessed Date - static text - The Assessed Date by assessment item Due from the Party/Participant of the assessment record in context. Due date - static text -The Due Date in Assessed from the Party/Participant of the Financial record in context. Assessed -static text - The amount of assessment items currently in Assessed status Due from the Party/Participant of the Financial record in context. Adjusted - static text - The amount of assessment item currently in Adjustment on Assessments Due from the Party/Participant of the Financial record in context. Transferred -static text - The amount of assessment items in Transfer transactions of the Party/Participant of the Financial record in context. Paid - static text - The amount of assessment items amount Paid on Assessments Due from the Party/Participant of the Financial record in context. Disbursed -static text - The amount of assessment items amount Disbursed to the Party/Participant of the Financial record in context. Balance -static text - The amount of assessment items outstanding Balance of Assessments Due from the Party/Participant of the Financial record in context In collections - static text - Indicates the Financial Record in Context is In Collection Bundle is populated w/ data from step 1
      // TODO: implement step
    });
    await test.step('15. Verify Bail Bonds bundle', async () => {
      // Expected: Bail Bonds: Record limit -No Maximum record limit Fields: Bail/ Bond No. - static text - The Bail/Bond No. of the Bail/Bond record in context. Date Set -static text - The Date Set of the Bail/Bond record in context. Name - static text - The Name of the person in display name format to which the Bail/Bond record applies. Amount Req. -static text - The Amount Required for the Bail/Bond record in context. Bail/ Bond Status -static text - The current Status of the Bail/Bond record in context. Posting No.-static text - The Posting No. of the Bail/Bond record posting in context. If there is more than one Posting, then each Posting No. value should display in its own record row. Posting Type -static text - The Posting Type of the Bail/Bond record posting in context. If there is more than one Posting, then each Posting Type value should display in its own record row Posting Amount -static text - The Posting Amount of the Bail/Bond record posting in context. If there is more than one Posting, then each Posting Amount value should display in its own record row. Posting Status -static text - The current Posting Status of the Bail/Bond record posting in context. If there is more than one Posting, then each Posting Status value should display in its own record row Posting Status Date -static text - The Posting Status Date of the Bail/Bond record posting in context. If there is more than one Posting, then each Posting Status Date value should display in its own record row Bundle is populated w/ data from step 1
      // TODO: implement step
    });
    await test.step('16. Verify excluded fields in financial table', async () => {
      // Expected: The Financials table should excluded the name of the party/participant.
      // TODO: implement step
    });
  });
});
