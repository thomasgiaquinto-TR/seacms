import { Page } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { HomePage } from '../page-objects/HomePage';
import { adminUser, standardUser, TestUser } from '../data/users';

/**
 * Drives the C-Track CMS native login flow:
 *   open base URL -> auto-routes to /login -> fill credentials -> land on Home.
 */
export class LoginHelper {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly homePage: HomePage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }

  async login(user: TestUser): Promise<void> {
    // Navigate the base URL and let the app redirect to the login screen.
    await this.page.goto('/');
    // The system Chrome instance can carry an existing session, in which case
    // the app shows Home directly instead of the login form. Only submit
    // credentials when the form is actually present.
    const needsLogin = await this.loginPage.username.isVisible().catch(() => false);
    if (needsLogin) {
      await this.loginPage.submit(user.username, user.password);
    }
    await this.homePage.expectLoaded();
  }

  async loginAsAdmin(): Promise<void> {
    await this.login(adminUser);
  }

  async loginAsStandardUser(): Promise<void> {
    await this.login(standardUser);
  }
}
