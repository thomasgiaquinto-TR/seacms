import { test, expect } from '../../../fixtures';

/**
 * SEATC-31901  Payment Alert Message Management screen - permissions
 * Suite: Public Portal Case Summary Report - ECORE-54414
 *
 * The Payment Alert Message Management screen lives under Administration >
 * Configuration Manager > Accounting > Payment Alert Message
 * (/configuration/accounting/paymentalertmessage/view). For a user WITH manage
 * (Accounting Config) permission it opens with the records editable (a Save
 * control is present); a read-only user sees it read-only and a user without the
 * permission cannot reach it at all.
 *
 * SCOPE NOTE: the plan walks the full permission matrix across five users
 * (full / read+create+edit / read+create / read / none). We can't provision
 * those users here, so this spec asserts the row for the current user (clerkfull,
 * which has full Accounting Config): the screen opens and is editable. The other
 * permission levels are out of scope.
 *
 * Status: ACTIVE (UI, read-only — opens the screen, edits/saves nothing).
 */
test.describe('SEATC-31901 Payment Alert Message Management - permissions', () => {
  test('opens and is editable for a user with manage permission', async ({ authedPage }) => {
    const page = authedPage;

    await test.step('Open Payment Alert Message Management', async () => {
      // Reached via Configuration Manager > Accounting > Payment Alert Message;
      // navigate directly to the stable URL for reliability.
      await page.goto('/configuration/accounting/paymentalertmessage/view');
      await expect(
        page.getByRole('heading', { name: 'Payment Alert Message Management', level: 1 }),
      ).toBeVisible();
    });

    await test.step('Records are present and editable (manage permission)', async () => {
      await expect(
        page.getByRole('heading', { name: 'Payment Alert Message Records', level: 2 }),
      ).toBeVisible();
      // A Save control means the current user can manage records (a read-only
      // user would see the records without it).
      await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();
    });
  });
});
