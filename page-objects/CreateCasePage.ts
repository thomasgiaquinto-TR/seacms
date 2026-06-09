import { Page, Locator, expect } from '@playwright/test';
import { waitForNoBlockOverlay } from '../helpers/ui';

/**
 * Create Case screen (/case/create/new). The plain Create Case form has just a
 * Case Classification custom dropdown + Submitted/Filed dates + Save.
 * (The dedicated Traffic/Parking shortcuts render a much larger citation form.)
 */
export class CreateCasePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly classificationToggle: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly createAnother: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Create Case', level: 1 });
    // The classification dropdown's toggle link shows "Select" until chosen.
    this.classificationToggle = page.getByRole('link', { name: /Select/ }).first();
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    this.createAnother = page.getByText('Create Another Case');
  }

  async goto(): Promise<void> {
    await this.page.goto('/case/create/new');
    await expect(this.heading).toBeVisible();
  }

  async selectClassification(classification: string): Promise<void> {
    await this.classificationToggle.click();
    await this.page.getByRole('option', { name: classification, exact: true }).click();
    // Picking a classification triggers an AJAX update with a blocking overlay.
    await waitForNoBlockOverlay(this.page);
  }

  async save(): Promise<void> {
    await waitForNoBlockOverlay(this.page);
    await this.saveButton.click();
  }
}