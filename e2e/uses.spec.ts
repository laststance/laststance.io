import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('/uses', async ({ page }, testInfo) => {
  await page.goto('/uses')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/uses`,
  )
})
