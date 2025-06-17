import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('/keybinds', async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000/keybinds')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/keybinds`,
  )
})
