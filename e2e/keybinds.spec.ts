import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('/keybinds', async ({ page }, testInfo) => {
  await page.goto('/keybinds')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/keybinds`,
  )
})
