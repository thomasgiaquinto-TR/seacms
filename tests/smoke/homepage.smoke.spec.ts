import { test, expect } from '../../fixtures';

test.describe('homepage smoke', () => {
  test('base URL routes to the login screen', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Login\s*\|\s*CMS/);
    await expect(page.getByRole('heading', { name: 'Login', level: 1 })).toBeVisible();
  });
});