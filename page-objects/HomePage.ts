import { Page, Locator, expect } from '@playwright/test';

/**
 * The C-Track CMS home / dashboard shown after a successful login.
 */
export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly userActions: Locator;
  readonly caseManagementNav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Home', level: 1 });
    this.userActions = page.getByRole('button', { name: 'User Actions' });
    this.caseManagementNav = page.getByRole('button', { name: 'Case Management' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Home \| CMS/);
    await expect(this.heading).toBeVisible();
    await expect(this.userActions).toBeVisible();
  }
}
