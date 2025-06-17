import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('/projects', async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000/projects')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/projects`,
  )
})
