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

test('home page keeps the Now panel inside every viewport from 320px to desktop', async ({
  page,
}) => {
  // Arrange
  const viewportWidths = [
    320, 375, 390, 639, 640, 767, 768, 1023, 1024, 1279, 1280, 1440,
  ]
  await page.setViewportSize({ width: viewportWidths[0], height: 900 })
  await page.goto('/')
  const nowPanel = page.locator('[data-react-component="NowPanel"]')

  // Act
  const layouts = []
  for (const viewportWidth of viewportWidths) {
    await page.setViewportSize({ width: viewportWidth, height: 900 })
    layouts.push({
      nowPanelBounds: await nowPanel.boundingBox(),
      pageWidths: await page.evaluate(() => ({
        body: document.body.scrollWidth,
        viewport: document.documentElement.clientWidth,
      })),
      viewportWidth,
    })
  }

  // Assert
  for (const { nowPanelBounds, pageWidths, viewportWidth } of layouts) {
    expect(nowPanelBounds, `${viewportWidth}px Now panel`).not.toBeNull()
    expect(
      nowPanelBounds?.x,
      `${viewportWidth}px Now panel left`,
    ).toBeGreaterThanOrEqual(0)
    expect(
      (nowPanelBounds?.x ?? 0) + (nowPanelBounds?.width ?? 0),
      `${viewportWidth}px Now panel right`,
    ).toBeLessThanOrEqual(viewportWidth)
    expect(
      pageWidths.body,
      `${viewportWidth}px body width`,
    ).toBeLessThanOrEqual(viewportWidth)
    expect(pageWidths.viewport, `${viewportWidth}px viewport width`).toBe(
      viewportWidth,
    )
  }
})

test('home page waits until 1280px before placing Now beside articles', async ({
  page,
}) => {
  // Arrange
  await page.setViewportSize({ width: 1024, height: 900 })
  await page.goto('/')
  const articles = page.locator('main article')
  const nowPanel = page.locator('[data-react-component="NowPanel"]')

  // Act
  const mediumLastArticleBounds = await articles.last().boundingBox()
  const mediumNowPanelBounds = await nowPanel.boundingBox()
  await page.setViewportSize({ width: 1280, height: 900 })
  const wideFirstArticleBounds = await articles.first().boundingBox()
  const wideNowPanelBounds = await nowPanel.boundingBox()

  // Assert
  expect(mediumLastArticleBounds).not.toBeNull()
  expect(mediumNowPanelBounds).not.toBeNull()
  expect(mediumNowPanelBounds?.y).toBeGreaterThan(
    (mediumLastArticleBounds?.y ?? 0) + (mediumLastArticleBounds?.height ?? 0),
  )
  expect(wideFirstArticleBounds).not.toBeNull()
  expect(wideNowPanelBounds).not.toBeNull()
  expect(wideNowPanelBounds?.y).toBeCloseTo(wideFirstArticleBounds?.y ?? 0, 0)
  expect(wideNowPanelBounds?.x).toBeGreaterThan(
    (wideFirstArticleBounds?.x ?? 0) + (wideFirstArticleBounds?.width ?? 0),
  )
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
