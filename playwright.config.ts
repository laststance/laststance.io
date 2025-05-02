// eslint-disable-next-line import/named
import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import 'dotenv/config'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  failOnFlakyTests: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 6,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html'],
    // Add Argos reporter.
    [
      '@argos-ci/playwright/reporter',
      {
        // Upload to Argos on CI only.
        uploadToArgos:
          !!process.env.CI &&
          !!process.env.BUILD_NAME &&
          process.env.UPLOAD_TO_ARGOS !== 'false',
        buildName: process.env.BUILD_NAME || 'BUILD_NAME is empty',
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    launchOptions: {
      slowMo: isHeadedOrUIMode() ? 500 : 0,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'iPad Pro 11',
      use: { ...devices['iPad Pro 11'] },
    },
    {
      name: 'iPad Pro 11 landscape',
      use: { ...devices['iPad Pro 11 landscape'] },
    },
    {
      name: 'iPhone 14',
      use: { ...devices['iPhone 14'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})

function isHeadedOrUIMode() {
  // important to use env var - for workers
  if (process.argv.includes('--headed') || process.argv.includes('--ui'))
    process.env.HEADED_MODE = '1'
  return Boolean(process.env.HEADED_MODE)
}
