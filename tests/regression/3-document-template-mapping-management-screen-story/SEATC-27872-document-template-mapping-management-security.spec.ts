import { test, expect } from '../../../fixtures';

/**
 * SEATC-27872  Document Template Mapping Management - Security
 * Suite: Document Center > Document Template Mapping Management (ECORE-14019 p.3)
 *
 * The Document Template Mapping Management screen lives under Administration >
 * Configuration Manager > Document > Document Template Mapping
 * (/configuration/template/documenttemplatesubtypemap/view). For a user WITH the
 * Distribution Config permission it opens with records editable (a Save control
 * is present); a user without it cannot see the item at all.
 *
 * SCOPE NOTE: the plan walks the full Distribution Config permission matrix
 * (none / Read / Read+Create / Read+Create+Edit / All) across re-logins. We can't
 * provision those permission levels here, so this spec asserts the row for the
 * current user (clerkfull, full config access): the screen opens and is editable.
 * The other permission levels are out of scope.
 *
 * Status: ACTIVE (UI, read-only — opens the screen, edits/saves nothing).
 */
test.describe('SEATC-27872 Document Template Mapping Management - Security', () => {
  test('opens and is editable for a user with Distribution Config permission', async ({
    authedPage,
  }) => {
    const page = authedPage;

    await test.step('Open Document Template Mapping Management', async () => {
      await page.goto('/configuration/template/documenttemplatesubtypemap/view');
      await expect(
        page.getByRole('heading', { name: 'Document Template Mapping Management', level: 1 }),
      ).toBeVisible();
    });

    await test.step('Records are present and editable (config permission)', async () => {
      await expect(
        page.getByRole('heading', { name: 'Document Template Mapping Records', level: 2 }),
      ).toBeVisible();
      await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeVisible();
    });
  });
});
