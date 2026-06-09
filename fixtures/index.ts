import { test as base, expect } from '@playwright/test';
import { LoginHelper } from '../helpers/LoginHelper';
import { CaseHelper } from '../helpers/CaseHelper';
import { NavBar } from '../page-objects/NavBar';

type Fixtures = {
  loginHelper: LoginHelper;
  caseHelper: CaseHelper;
  navBar: NavBar;
  /** A page already logged in as the admin/primary user. */
  authedPage: import('@playwright/test').Page;
};

export const test = base.extend<Fixtures>({
  loginHelper: async ({ page }, use) => {
    await use(new LoginHelper(page));
  },
  caseHelper: async ({ page }, use) => {
    await use(new CaseHelper(page));
  },
  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  },
  authedPage: async ({ page, context }, use) => {
    // Start from a clean session: the deploy allows one active session per user,
    // and the shared system-Chrome can carry a stale cookie from a prior test.
    await context.clearCookies();
    await new LoginHelper(page).loginAsAdmin();
    await use(page);
  },
});

export { expect };