import { Page, Locator, expect } from '@playwright/test';

/**
 * Shared UI helpers for the C-Track CMS.
 *
 * The app uses a recurring custom "Select" dropdown control: a clickable link
 * showing the current value + an `expand_more` chevron, which on click reveals a
 * role=listbox of role=option items rendered elsewhere in the DOM.
 */

/** Open a custom Select dropdown (the toggle link) and pick an option by text. */
export async function selectFromCustomDropdown(
  toggle: Locator,
  optionName: string | RegExp,
): Promise<void> {
  await toggle.click();
  const page = toggle.page();
  await page.getByRole('option', { name: optionName, exact: typeof optionName === 'string' }).click();
}

/** Assert the standard green success banner ("The save was successful."). */
export async function expectSaveSuccessful(page: Page): Promise<void> {
  await expect(page.getByText('The save was successful.')).toBeVisible();
}

/**
 * Wait for the jQuery blockUI loading overlay to clear. It is shown during AJAX
 * (e.g. after picking a Case Classification) and intercepts pointer events, so
 * call this before clicking buttons that follow an async update.
 */
export async function waitForNoBlockOverlay(page: Page): Promise<void> {
  await expect(page.locator('.blockOverlay')).toHaveCount(0);
}