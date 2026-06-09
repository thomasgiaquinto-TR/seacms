import { Page, Locator, expect } from '@playwright/test';

export type CaseSection =
  | 'Assignment'
  | 'Bail/Bond Management'
  | 'Compliance Tracking'
  | 'Conflict History'
  | 'Docketing'
  | 'Exhibits'
  | 'Financials'
  | 'Hearings'
  | 'Master Distribution List'
  | 'Parties / Participants'
  | 'Rules Engine Results';

/**
 * Case View screen (/case/instance/view?caseInstanceID=N) and its left-hand
 * "Case" sub-navigation. Each sub-link carries the caseInstanceID query param.
 */
export class CaseViewPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /^Case View - /, level: 1 });
  }

  async gotoById(caseInstanceID: string | number): Promise<void> {
    await this.page.goto(`/case/instance/view?caseInstanceID=${caseInstanceID}`);
    await expect(this.heading).toBeVisible();
  }

  /** Navigate to a case sub-section via the left "Case" menu. */
  async openSection(section: CaseSection): Promise<void> {
    await this.page.getByRole('link', { name: new RegExp(`^${escapeRegex(section)}`) }).first().click();
  }

  /** The displayed case number, parsed from the "Case View - <num>" heading. */
  async caseNumber(): Promise<string> {
    const text = (await this.heading.textContent()) ?? '';
    return text.replace('Case View - ', '').trim();
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}