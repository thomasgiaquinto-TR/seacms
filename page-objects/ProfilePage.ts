import { Page, Locator, expect } from '@playwright/test';

/**
 * User Profile screen (/user/profile/manage). Reached via User Actions > Profile.
 * Hosts the Authentication Token table + Add Token dialog (SEATC-27441).
 * (The test plan calls this "Settings"; in CMS v2.2.0 it is the Profile page.)
 */
export class ProfilePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly authTokenSection: Locator;
  readonly addTokenButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'User Profile', level: 1 });
    this.authTokenSection = page.getByRole('heading', { name: 'Authentication Token', level: 2 });
    this.addTokenButton = page.getByRole('button', { name: 'Add Token' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/user/profile/manage');
    await expect(this.heading).toBeVisible();
  }

  tokenDialog(): Locator {
    return this.page.getByRole('dialog', { name: 'Add Authentication Token' });
  }

  /** Row in the Authentication Token table for a given token name. */
  tokenRow(name: string): Locator {
    return this.authTokenSection
      .locator('xpath=following::table[1]')
      .getByRole('row', { name: new RegExp(name) });
  }

  /**
   * Add a token and return its one-time value. Leaves the dialog open showing
   * the value (the table row only appears once the dialog is closed).
   */
  async createTokenAndReveal(name: string): Promise<string> {
    await this.addTokenButton.click();
    const dialog = this.tokenDialog();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('textbox').fill(name);
    await dialog.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(dialog.getByText(/record this token value/i)).toBeVisible();
    // The token value is the only long whitespace-delimited chunk in the dialog
    // (tokens use a broad charset incl. / ~ + = _ -), and it can populate a tick
    // after the notice — poll until it appears. Charset-agnostic by design.
    let token = '';
    await expect
      .poll(async () => {
        const chunks = (await dialog.innerText()).split(/\s+/).filter((c) => c.length >= 30);
        token = chunks.sort((a, b) => b.length - a.length)[0] ?? '';
        return token.length;
      })
      .toBeGreaterThan(0);
    return token;
  }

  /**
   * Remove a token by name (re-loads the profile page first so it works even
   * when called after the reveal dialog was open). Confirms the "Confirm" dialog.
   */
  async removeToken(name: string): Promise<void> {
    await this.goto();
    await this.tokenRow(name).getByRole('button', { name: 'Remove' }).click();
    const confirm = this.page.getByRole('dialog', { name: 'Confirm' });
    await expect(confirm).toBeVisible();
    await confirm.getByRole('button', { name: 'OK', exact: true }).click();
    await expect(confirm).toBeHidden();
  }
}