import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('/articles', async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000/articles')

  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/articles`,
  )
})
