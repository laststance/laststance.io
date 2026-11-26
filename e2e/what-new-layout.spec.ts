import { expect, test } from '@playwright/test'

// Show classic scrollbars in headless Chromium to exercise the desktop layout.
test.use({ launchOptions: { ignoreDefaultArgs: ['--hide-scrollbars'] } })

test("opening and closing What's New keeps the page content in place", async ({
  page,
}) => {
  // Arrange
  await page.goto('/')
  const main = page.locator('main')
  const contentWidth = async () =>
    main.evaluate((element) => element.clientWidth)
  const initialWidth = await contentWidth()
  const dialog = page.getByRole('dialog')

  // Act
  await page.getByRole('button', { name: "Open What's New dialog" }).click()
  await expect(dialog).toBeVisible()
  await expect(page.locator('body')).toHaveAttribute('data-scroll-locked', '1')

  // Assert
  expect((await contentWidth()) - initialWidth).toBe(0)
  await dialog.getByRole('button', { name: 'Close' }).click()
  await expect(dialog).toBeHidden()
  await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked')
  expect((await contentWidth()) - initialWidth).toBe(0)
})
