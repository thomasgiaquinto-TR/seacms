import { Page, Locator, expect } from '@playwright/test';

/**
 * The C-Track CMS native login form. The bare base URL auto-routes here when
 * unauthenticated (do not navigate to /login directly — let it redirect).
 */
export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByRole('textbox', { name: 'Username' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Login', level: 1 })).toBeVisible();
    await expect(this.username).toBeVisible();
  }

  async submit(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}