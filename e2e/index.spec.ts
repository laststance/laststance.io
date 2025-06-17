import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('Top Page', async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000/')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io`,
  )
})
