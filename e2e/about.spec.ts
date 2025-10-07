import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('/about', async ({ page }, testInfo) => {
  await page.goto('/about')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/about`,
  )
})
