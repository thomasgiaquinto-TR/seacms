import { Page, expect } from '@playwright/test';
import { CreateCasePage } from '../page-objects/CreateCasePage';
import { Classification } from '../data/classifications';

export interface CreatedCase {
  caseInstanceID: string;
  caseNumber: string;
}

/**
 * Domain helper for case-level fixtures created via the UI. Use to stand up the
 * minimal data a test needs (fixture-via-UI), then assert via UI or API.
 */
export class CaseHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Create a basic case of the given classification and return its identifiers.
   * After Save the app redirects to /case/instance/view?caseInstanceID=N and
   * shows "Case View - <caseNumber>".
   */
  async createCase(classification: string = Classification.Civil): Promise<CreatedCase> {
    const create = new CreateCasePage(this.page);
    await create.goto();
    await create.selectClassification(classification);
    await create.save();

    await this.page.waitForURL(/\/case\/instance\/view\?caseInstanceID=\d+/);
    await expect(
      this.page.getByRole('heading', { name: /^Case View - /, level: 1 }),
    ).toBeVisible();

    const url = new URL(this.page.url());
    const caseInstanceID = url.searchParams.get('caseInstanceID') ?? '';
    const headingText =
      (await this.page.getByRole('heading', { name: /^Case View - /, level: 1 }).textContent()) ?? '';
    const caseNumber = headingText.replace('Case View - ', '').trim();

    return { caseInstanceID, caseNumber };
  }
}