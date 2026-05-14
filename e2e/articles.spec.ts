import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('/articles', async ({ page }, testInfo) => {
  await page.goto('/articles')

  // iPhone 14 stacks all 55+ articles vertically; a full-page screenshot
  // exceeds Playwright's 32767px dimension limit, so capture the viewport only.
  // Chrome / iPad Pro use the md grid layout and stay well under the limit.
  const isNarrowMobile = testInfo.project.name === 'iPhone 14'

  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/articles`,
    { fullPage: !isNarrowMobile },
  )
})
