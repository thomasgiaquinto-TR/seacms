# SEATC / C-Track CMS — Playwright E2E Tests

[![CI](https://github.com/thomasgiaquinto-TR/seacms/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/thomasgiaquinto-TR/seacms/actions/workflows/ci.yml)

Browser + API test automation for the C-Track CMS deploy at
**https://seacms-qa.ctrack.thomsonreuters.com** (C-Track CMS v2.2.0).

Built with Playwright + TypeScript. The suite covers the 56 SEATC scenarios
documented in `SEATC_final_testplan.docx` (the plan's intro says "57"; the
document body contains 56 distinct `SEATC-####` cases).

## Quick start

```bash
npm install
# credentials live in .env (gitignored) — see .env.example
npm run test:smoke      # homepage + login smoke (live)
npm test                # full suite (active specs run; scaffolds are skipped)
npm run test:headed     # watch it run in system Chrome
npm run report          # open the last HTML report
npm run lint            # eslint
```

All scripts target the system Chrome (`--project=chrome`) because corporate EDR
blocks Playwright's bundled browsers. Do not drop the `--project=chrome` flag.

## Configuration

Real values go in `.env` (gitignored); `.env.example` documents the keys.

| Key | Purpose |
|-----|---------|
| `BASE_URL` | App root (auto-routes to `/login`) |
| `ADMIN_USER` / `ADMIN_PASS` | Primary user (`clerkfull`) |
| `STD_USER` / `STD_PASS` | Optional standard user |
| `API_BASE_URL` / `API_TOKEN` | Optional REST/Swagger client (see "API cases") |
| `ALL_BROWSERS` | Set to also run chromium/firefox/webkit |

## CI

`.github/workflows/ci.yml` runs on push/PR with four jobs:

1. **lint** (always) — `npm ci` + `tsc --noEmit` + `eslint`; statically covers every spec.
2. **no-network** (always) — runs the `--grep "no network"` contract test (ApiClient
   config guard); no browser, no credentials.
3. **api-read-live** (auto-activating) — runs `tests/api/` read-only GETs. Self-skips
   (green) until `API_BASE_URL` + `API_TOKEN` secrets are added; then it lights up.
   A stale token (env restarts invalidate tokens) will 401 → red; rotate the secret.
4. **full-live** (commented) — the browser/mutating suite (login + create/modify).
   Enable only against a **disposable env**: add the full secret set (`BASE_URL`,
   `ADMIN_USER`, `ADMIN_PASS`) and uncomment. Runs serially (`workers: 1`).

Add secrets via `gh secret set NAME` or GitHub UI (Settings → Secrets → Actions);
read values from your gitignored `.env`. Never commit secrets.

## Layout

```
fixtures/            test/expect + loginHelper, caseHelper, navBar, authedPage
helpers/             LoginHelper, CaseHelper, ui (custom-dropdown, success banner)
page-objects/        LoginPage, HomePage, NavBar, CreateCasePage, CaseViewPage, ProfilePage
data/                users, classifications (Create Case dropdown values)
tests/smoke/         homepage + login smoke (ACTIVE)
tests/regression/    one spec per SEATC case, grouped by the plan's suite headings
testplan/            SEATC_testplan.txt (source) + testcases.json (parsed)
scripts/             generate-specs.js (regenerates the scaffolds)
```

## Active specs vs. scaffolds

This deploy is a **live, shared, stateful** environment with no seeded database,
and most SEATC cases depend on preconditions that cannot be created reliably from
a test run — config changes + "Sync to Prod", multiple users with specific
permission sets, external tools (Swagger/Postman), uploaded media files, etc.
Running those blind would produce false failures. So specs come in two forms:

- **Active** (run live, verified green):
  - `tests/smoke/*` — base URL routing + admin login.
  - `tests/regression/api-token-support/SEATC-27441-*` — create an Authentication
    Token end-to-end (User Actions → Profile → Add Token → Save → token shown).
- **Scaffold** (`test.fixme`, skipped at runtime): every other SEATC case. Each
  file embeds the case's **Summary**, **Preconditions**, and every documented
  **Action / Expected Result** as `test.step()`s with `// TODO: implement`. They
  are skipped (never false-fail) and are ready to flesh out.

### Fleshing out a scaffold

1. Remove `test.fixme(...)` → `test(...)`.
2. Implement each `test.step` using the shared helpers/page-objects
   (`navBar.go(...)`, `caseHelper.createCase(...)`, `CaseViewPage`, the custom
   `selectFromCustomDropdown`, `expectSaveSuccessful`, etc.).
3. Stand up preconditions as fixtures-via-UI where feasible; self-skip when a
   required config/user/tool is unavailable so the suite stays green.
4. Run `npm run test:headed -- <path>` and iterate.

### API cases

`helpers/ApiClient.ts` is a typed REST client over Playwright's `request` context.

- **Auth (verified live):** an Authentication Token passed as the **`auth_token`
  query parameter**. Bearer / Basic / `X-Auth-Token` headers are all rejected
  with 401. Endpoints are under `{API_BASE_URL}/v1/...`
  (e.g. `/v1/cases/classifications`). The OpenAPI spec is at `/api/v3/api-docs`
  (also requires `auth_token`).
- **Minting a token:** `ProfilePage.createTokenAndReveal(name)` adds a token and
  returns its one-time value; `ProfilePage.removeToken(name)` cleans it up.
- **`SEATC-27441-api-token-authentication.spec.ts`** (ACTIVE) ties it together:
  mint a token in the UI → authenticate `GET /v1/cases/classifications` (200,
  non-empty) → confirm a bogus token gets 401 → remove the token. It derives the
  API base from `BASE_URL`, so it needs no extra config.
- **`SEATC-755-get-case-summary-no-citations.spec.ts`** (ACTIVE, API-driven):
  resolves a citation-less case at runtime via `GET /v1/cases` + `caseSummary`,
  then asserts `GET /v1/custom/caseSummary/{caseID}` returns 200 with an **empty
  `citation`** and the documented blocks. The top-level case block is
  `caseInstance` (the plan's pseudo-schema calls it `case`). It prefers
  `API_TOKEN` and falls back to minting via the UI.
- **`SEATC-28234-...spec.ts`** (ACTIVE, API-driven): resolves a case with
  hearings at runtime, then asserts `GET /v1/custom/ivrgeneralinformation/?caseNumber=...`
  returns `caseInstance` + a `caseHearings` array matching the case, and that
  `fields="*,caseHearings(*)"` expands the hearing entries.
- **`SEATC-33993-...spec.ts`** (ACTIVE, API-driven, write path): resolves a
  person actor (`actorCategoryID=1`) + an alias type at runtime, then
  `POST /v1/actors/{id}/aliases` → 201 and confirms the alias is returned by GET
  (and as a single resource). The aliases API has no DELETE, so it uses a fixed
  marker alias + skip-if-exists (pollution bounded to one alias, created once).
  The full Global/Court/Case scope-propagation matrix is documented but out of
  scope (not reproducible on a shared deploy).
- **`SEATC-34072-...spec.ts`** (ACTIVE, API-driven, fully reversible write):
  creates a throwaway actor address (POST), `PUT /v1/actors/{id}/addresses/{addressID}`
  → **204**, verifies the change via GET, then DELETEs it — self-cleaning. Uses
  the deploy's known-good lookup ids (addressType=21, country=561/US,
  region=1000011) with `applyToOpenCases=false`; the Global/Court/Case
  propagation matrix is out of scope (not reproducible on a shared deploy).
- **`SEATC-34027-...spec.ts`** (ACTIVE, API-driven, self-cleaning): `POST
  /v1/actors/{id}/contacts` (email type 23) → **201**, verifies via GET, then
  DELETEs the contact. `applyToOpenCaseDistributionLists=false`; scope matrix out
  of scope as above.
- **`SEATC-28156-...spec.ts`** (ACTIVE, self-cleaning): create an ACCESS Request,
  **PUT** a request detail → 204, GET verifies, **DELETE** the request (cascades).
- **`SEATC-28161-...spec.ts`** (ACTIVE, self-cleaning): create an ACCESS Request +
  linked Response, **POST** a Response Detail → 201, GET the response to confirm
  the detail, then **DELETE the response *before* the request**. Two deploy
  quirks: the detail path uses a capital `R` (`.../accessResponse/{id}/...`), and
  an ACCESS Response is only addressable by id while still linked to a request
  (deleting the request first orphans it → then it 404s), hence the cleanup order.
- Shared token helpers live in `helpers/tokens.ts` (`acquireApiToken` /
  `removeMintedToken`), used by the API-driven specs.
- **Token strategy:** `API_TOKEN` is empty by default, so each API spec mints a
  fresh token via the UI per run and removes it (self-contained). Set `API_TOKEN`
  to a real token to skip per-run minting and enable the `tests/api/*` read tests
  — but note env restarts invalidate tokens (a stale token surfaces as 401), so
  empty is the more resilient default.
- **`tests/api/`** holds env-configured live read tests that self-skip unless
  `API_BASE_URL` + `API_TOKEN` are set.
- **Known endpoints:** `/v1/cases/classifications`, `/v1/cases?page&size&fields`,
  `/v1/cases/{id}`, `/v1/custom/caseSummary/{id}`,
  `/v1/custom/ivrgeneralinformation/?caseNumber=…|citationNumber=…`,
  `/v1/actors?actorCategoryID=1` (1=person, 2=organization), `/v1/aliastypes`,
  `GET|POST /v1/actors/{id}/aliases`, `GET /v1/actors/{id}/aliases/{aliasID}`,
  `GET|POST /v1/actors/{id}/addresses`, `GET|PUT|DELETE /v1/actors/{id}/addresses/{addressID}`,
  `GET|POST /v1/actors/{id}/contacts`, `GET|PUT|DELETE /v1/actors/{id}/contacts/{contactID}`.
  The OpenAPI JSON is at `/api-docs/v3/api-docs/SwaggerUI` (the Swagger UI at
  `/api-docs/index.html` redirects to `/api-docs/swagger-ui/index.html`). Token
  values use a broad charset incl. `~ / + = _ -`.

Remaining REST/Swagger/Postman scaffolds (e.g. SEATC-755, 28234, 33993, 34027,
34072, ACCESS `28145/272/28156/28161`) can be implemented with `ApiClient` plus
fixture-via-UI for any case/data setup. See the `cms-rest-api-client` patterns.

## Regenerating the scaffolds

The scaffolds are generated from the test plan text:

```bash
node scripts/generate-specs.js
```

This re-parses `testplan/SEATC_testplan.txt` → `testplan/testcases.json` and
rewrites one spec per case under `tests/regression/`. Cases listed in the
generator's `HAND_WRITTEN` set (currently `27441`) are left untouched so they
keep their verified implementation. Edit the `.txt` (or `HAND_WRITTEN`) and
re-run to refresh.

## Notes / gotchas

- The bare base URL redirects to `/login`; don't hardcode `/login` in navigation.
- The login page title is `" Login | CMS"` (leading/nbsp) — match titles with a
  whitespace-tolerant regex.
- Navigation is link-based with stable URLs (`/case/create/new`,
  `/case/instance/view?caseInstanceID=N`, `/user/profile/manage`, …).
- Case Classifications, item lists, and field required/hidden flags are
  **config-specific** to this deploy (e.g. on seacms-qa the Traffic "Court Date"
  field is *required*, unlike the plan's assumed config). Treat such assertions
  as environment-dependent.
- Creating a token and closing the dialog reloads the profile page and drops the
  automated session on this deploy — see the SEATC-27441 spec comment.
- **Single active session per user → serial execution.** The deploy invalidates a
  user's older session when a newer login for that user occurs, and the
  EDR-mandated system Chrome is effectively one shared instance. So tests that log
  in as the same shared user cannot run in parallel — `playwright.config.ts` sets
  `workers: 1`. The `authedPage` fixture clears cookies before logging in so each
  test starts from a clean session. To re-enable parallelism, give each worker its
  own user. (API-token calls are session-independent and unaffected.)
```
