import { defineConfig, devices } from '@playwright/test';
import { config } from 'dotenv';

config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Serial: the deploy enforces a single active session per user, so multiple
  // tests logging in as the same shared user in parallel invalidate each other's
  // sessions. (Almost all specs are instant test.fixme skips, so the cost is
  // negligible.) Use distinct users per worker to re-enable parallelism.
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['list'],
  ],
  outputDir: 'reports/artifacts',
  use: {
    baseURL: process.env.BASE_URL ?? 'https://seacms-qa.ctrack.thomsonreuters.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    // System Chrome — corporate EDR blocks Playwright's bundled browsers.
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    ...(process.env.ALL_BROWSERS
      ? [
          { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
          { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        ]
      : []),
  ],
});