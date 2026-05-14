import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('/articles', async ({ page }, testInfo) => {
  await page.goto('/articles')

  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/articles`,
  )
})
