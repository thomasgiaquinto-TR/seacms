import { test, expect } from '../../fixtures';
import { adminUser } from '../../data/users';

test.describe('login smoke', () => {
  test.skip(!adminUser.password, 'ADMIN_PASS not set in .env');

  test('admin can log in and reach the home dashboard', async ({ loginHelper, page }) => {
    await loginHelper.loginAsAdmin();
    await expect(page).toHaveTitle(/Home \| CMS/);
    await expect(page.getByRole('heading', { name: 'Home', level: 1 })).toBeVisible();
  });
});