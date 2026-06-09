import { test, expect } from '../../../fixtures';
import { waitForNoBlockOverlay } from '../../../helpers/ui';

/**
 * SEATC-840  RE Admin Queue: verify Skip Selected for Pending RE records
 * Suite: RCJ - Notification Rules Engine Actions > Rules Engine Administrative Queue
 *
 * The Rules Engine Administrator Queue (Administration > Administrator Queues >
 * Rules Engine Queue, /admin/rulesengineresultqueue/search) is the admin-wide
 * counterpart of the personal queue (SEATC-39558): it can filter/show records
 * across ALL users (its User filter is a selectable dropdown), not just the
 * current user. This spec opens it and runs a Pending Clerk search.
 *
 * SCOPE NOTE: the plan's core action — check a Pending Clerk record, Action >
 * Skip Selected, and confirm it flips to Completed — MUTATES Rules Engine data,
 * so it's out of scope here. This spec covers the read-only path: the admin
 * screen opens, exposes an across-users User filter, and a status search renders
 * results.
 *
 * Status: ACTIVE (UI, read-only — searches, mutates nothing).
 */
test.describe('SEATC-840 Rules Engine Administrator Queue', () => {
  test('admin queue opens with an across-users filter and a status search runs', async ({
    authedPage,
  }) => {
    const page = authedPage;
    const main = page.getByRole('main');

    await test.step('Open the Rules Engine Administrator Queue', async () => {
      await page.goto('/admin/rulesengineresultqueue/search');
      await expect(
        page.getByRole('heading', { name: 'Rules Engine Administrator Queue', level: 1 }),
      ).toBeVisible();
    });

    await test.step('It is the admin queue: the User filter is selectable (across users)', async () => {
      // The personal queue (SEATC-39558) fixes User to the current user as plain
      // text; the admin queue offers a "Select" dropdown to filter by any user.
      await expect(main.getByText('User').first()).toBeVisible();
      await expect(main.getByRole('link', { name: /Select/ }).first()).toBeVisible();
    });

    await test.step('Search Status = Pending Clerk -> results render', async () => {
      const statusSelect = page
        .getByRole('combobox')
        .filter({ has: page.getByRole('option', { name: 'Pending Clerk', exact: true }) });
      await statusSelect.selectOption({ label: 'Pending Clerk' });
      await main.getByRole('button', { name: 'Search', exact: true }).click();
      await waitForNoBlockOverlay(page);
      await expect(page.getByRole('heading', { name: 'Results', level: 2 })).toBeVisible();
      await expect(main.getByRole('table')).toBeVisible();
    });
  });
});
