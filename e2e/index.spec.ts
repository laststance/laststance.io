import { argosScreenshot } from '@argos-ci/playwright'
import { expect, test } from '@playwright/test'

test('Top Page', async ({ page }, testInfo) => {
  await page.goto('/')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io`,
  )
})

test('home page shows the Now panel with author-written focus items', async ({
  page,
}) => {
  // Arrange
  await page.goto('/')

  // Act / Assert: the Now heading and both current focus titles render.
  // Hard-coded so future renames to NOW_ITEMS trip this test on purpose.
  await expect(
    page.getByRole('heading', { level: 2, name: 'Now' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 3, name: 'laststance.io rebuild' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 3, name: 'OSS at @laststance' }),
  ).toBeVisible()
})
