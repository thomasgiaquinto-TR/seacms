import { Page, Locator } from '@playwright/test';

export type TopMenu =
  | 'Accounting'
  | 'Administration'
  | 'Calendar'
  | 'Case Management'
  | 'Efile'
  | 'My Queues'
  | 'Reporting';

/**
 * The persistent top navigation bar. Each top menu is a role=button that
 * expands a role=region containing role=link sub-items (each with a stable URL).
 */
export class NavBar {
  readonly page: Page;
  readonly userActions: Locator;
  readonly homePage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userActions = page.getByRole('button', { name: 'User Actions' });
    this.homePage = page.getByRole('button', { name: 'Home Page' });
  }

  topMenu(menu: TopMenu): Locator {
    return this.page.getByRole('button', { name: menu, exact: true });
  }

  /** Expand a top menu and click one of its sub-links by name. */
  async go(menu: TopMenu, link: string | RegExp): Promise<void> {
    await this.topMenu(menu).click();
    await this.page.getByRole('link', { name: link }).first().click();
  }

  /** Open the User Actions dropdown and click an item (e.g. Profile, Logout). */
  async userAction(name: string): Promise<void> {
    await this.userActions.click();
    await this.page.getByRole('listitem').getByText(name, { exact: true }).first().click();
  }
}