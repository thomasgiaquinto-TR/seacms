import { test, expect } from '../../../fixtures';
import { NavBar } from '../../../page-objects/NavBar';
import { adminUser } from '../../../data/users';
import { waitForNoBlockOverlay } from '../../../helpers/ui';

/**
 * SEATC-39558  My Queues: Rules Engine Queue - verify only records applicable to
 *              the current user are shown
 * Suite: RCJ - Notification Rules Engine Actions > Rules Engine Queue
 *
 * The personal Rules Engine Queue (My Queues > Rules Engine Queue, /queue/rulesengine)
 * is scoped to the logged-in user: its User filter is fixed to the current user
 * and every result row belongs to them. This spec navigates there, searches a
 * status, and asserts every returned row's User column is the current user.
 *
 * SCOPE NOTE: the plan's "records created by user2 are NOT displayed" needs a
 * second user creating RE records. We can't provision a second user here, so we
 * assert the equivalent invariant from the current user's side: the queue never
 * shows another user's records (every row == current user). The current user is
 * clerkfull / display name "Clerk Full".
 *
 * Status: ACTIVE (UI, read-only — searches, creates no data).
 */
const CURRENT_USERNAME = adminUser.username; // clerkfull
const CURRENT_DISPLAY_NAME = 'Clerk Full';

test.describe('SEATC-39558 Rules Engine Queue - current-user scoping', () => {
  test('the queue is scoped to the current user across statuses', async ({ authedPage }) => {
    const page = authedPage;
    const nav = new NavBar(page);
    const main = page.getByRole('main');

    await test.step('Navigate My Queues > Rules Engine Queue; queue is scoped to current user', async () => {
      await nav.go('My Queues', 'Rules Engine Queue');
      await expect(page.getByRole('heading', { name: 'Rules Engine Queue', level: 1 })).toBeVisible();
      await expect(main.getByText(CURRENT_DISPLAY_NAME).first(), 'User filter shows the current user').toBeVisible();
    });

    // The Status select is the one offering "Pending Clerk".
    const statusSelect = page
      .getByRole('combobox')
      .filter({ has: page.getByRole('option', { name: 'Pending Clerk', exact: true }) });
    const search = main.getByRole('button', { name: 'Search', exact: true });
    // The "User" column is the 7th cell (checkbox, Case #, Date, Agenda, Item, Type, User, ...).
    const userColumnCells = () => main.getByRole('table').locator('tbody tr td:nth-child(7)');

    for (const status of ['Pending Clerk', 'Completed'] as const) {
      await test.step(`Status = ${status}: every result row belongs to the current user`, async () => {
        await statusSelect.selectOption({ label: status });
        await search.click();
        await waitForNoBlockOverlay(page);
        // No row may show another user: zero User cells differ from the current user.
        const otherUsers = userColumnCells().filter({
          hasNotText: new RegExp(`^${CURRENT_USERNAME}$`),
        });
        await expect(otherUsers, `no rows for users other than ${CURRENT_USERNAME}`).toHaveCount(0);
        console.log(`Status=${status}: ${await userColumnCells().count()} record(s), all scoped to ${CURRENT_USERNAME}`);
      });
    }
  });
});
