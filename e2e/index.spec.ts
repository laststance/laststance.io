import { argosScreenshot } from '@argos-ci/playwright'
// eslint-disable-next-line import/named
import { test } from '@playwright/test'

test('Top Page', async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000/')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io`,
  )
})
