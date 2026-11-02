import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'
import type { BrowserCommand } from 'vitest/node'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

// Dedicated Vitest configuration for Storybook tests
/**
 * Moves the mouse just outside the test page, so it hovers nothing.
 *
 * Called before every story test from `.storybook/vitest.setup.ts`. The mouse
 * otherwise stays where the previous story's play function left it, so the
 * axe check would see whatever link sits under it in its hover color.
 */
const resetPointer: BrowserCommand<[]> = async ({ page }) => {
  // (0, 0) itself lands on the first link of a story without padding.
  await page.mouse.move(-1, -1)
}

export default defineConfig({
  plugins: [
    // The plugin will run tests for the stories defined in your Storybook config
    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    storybookTest({ configDir: path.join(dirname, '.storybook') }),
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      commands: { resetPointer },
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
})
