import { argosScreenshot } from '@argos-ci/playwright'
import { expect, test } from '@playwright/test'

test('Top Page', async ({ page }, testInfo) => {
  await page.goto('/')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io`,
  )
})

test('home articles stay left aligned without a sidebar at every viewport', async ({
  page,
}) => {
  // Arrange
  await page.goto('/')
  for (const width of [320, 390, 768, 1024, 1440]) {
    // Act
    await page.setViewportSize({ width, height: 900 })
    const hero = await page.locator('h1').boundingBox()
    const article = await page.locator('main article').first().boundingBox()
    // Assert
    expect(article?.x).toBe(hero?.x)
    expect(article?.width).toBeLessThanOrEqual(768)
    await expect(page.getByRole('complementary')).toHaveCount(0)
    // Linux reserves scrollbar space; overflow is relative to the content viewport.
    const horizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    )
    expect(horizontalOverflow).toBeLessThanOrEqual(0)
  }
})

test('home page provides 44px touch targets for compact navigation controls', async ({
  page,
}) => {
  // Arrange
  await page.setViewportSize({ width: 320, height: 900 })
  await page.goto('/')
  const touchTargets = [
    page.getByRole('button', { name: 'Toggle mobile navigation menu' }),
    page.getByRole('button', { name: "Open What's New dialog" }),
    page.getByRole('button', { name: /Switch to .* theme|Toggle theme/ }),
    page.getByRole('link', { name: 'Follow on Twitter' }),
    page.getByRole('link', { name: 'Follow on Instagram' }),
    page.getByRole('link', { name: 'Follow on GitHub' }),
    page.getByRole('link', { name: 'Follow on LinkedIn' }),
    page.locator('footer').getByRole('link', { name: 'About' }),
    page.locator('footer').getByRole('link', { name: 'Projects' }),
    page.locator('footer').getByRole('link', { name: 'Uses' }),
    page.locator('footer').getByRole('link', { name: 'Keybinds' }),
  ]

  // Act
  const touchTargetBounds = await Promise.all(
    touchTargets.map(async (touchTarget) => touchTarget.boundingBox()),
  )

  // Assert
  for (const touchTargetBoundsItem of touchTargetBounds) {
    expect(touchTargetBoundsItem).not.toBeNull()
    expect(touchTargetBoundsItem?.width).toBeGreaterThanOrEqual(44)
    expect(touchTargetBoundsItem?.height).toBeGreaterThanOrEqual(44)
  }
})
