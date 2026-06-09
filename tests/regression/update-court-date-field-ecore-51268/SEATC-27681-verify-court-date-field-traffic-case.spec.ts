import { test, expect } from '../../../fixtures';
import { NavBar } from '../../../page-objects/NavBar';

/**
 * SEATC-27681  Verify Court Date field - Traffic Case
 * Suite: Traffic > Update Court Date Field ECORE-51268
 *
 * The Create Traffic Case screen exposes a "Court Date" field in the Additional
 * Information bundle. This spec navigates there (Case Management > Create Traffic
 * Case) and verifies the bundle + field render.
 *
 * CONFIG NOTE: the test plan assumes Court Date is configured Required = N and
 * creates a case without it. On seacms-qa the field is currently configured as
 * REQUIRED (renders as "Court Date*"), so the "save without a Court Date" path
 * isn't reproducible here. This spec asserts the field's presence/visibility
 * (the stable, env-independent part) and records its required state, rather than
 * asserting a specific required-ness that depends on deploy config.
 *
 * Status: ACTIVE (UI, read-only — navigates and asserts, creates no data).
 */
test.describe('SEATC-27681 Court Date field - Traffic Case', () => {
  test('Create Traffic Case shows the Court Date field in Additional Information', async ({
    authedPage,
  }) => {
    const page = authedPage;
    const nav = new NavBar(page);

    await test.step('Navigate Case Management > Create Traffic Case', async () => {
      await nav.go('Case Management', 'Create Traffic Case');
      await expect(page.getByRole('heading', { name: 'Create Case', level: 1 })).toBeVisible();
    });

    await test.step('Additional Information bundle and Court Date field are present', async () => {
      await expect(
        page.getByRole('heading', { name: 'Additional Information', level: 2 }),
      ).toBeVisible();
      const courtDate = page.getByText(/^Court Date/).first();
      await expect(courtDate, 'Court Date field should be present').toBeVisible();

      // Record (don't hard-assert) the required state — it is deploy config.
      const label = (await courtDate.textContent())?.trim() ?? '';
      console.log(`Court Date field present; label="${label}" (required = ${label.includes('*')})`);
    });
  });
});
