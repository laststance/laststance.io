import { expect, test } from '@playwright/test'

test.use({ video: { mode: 'on', size: { width: 390, height: 844 } } })

test('mobile menu supports keyboard navigation and theme switching', async ({
  page,
}) => {
  // Arrange
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menuButton = page.getByRole('button', {
    name: 'Toggle mobile navigation menu',
  })
  // Act
  await menuButton.focus()
  await page.keyboard.press('Enter')
  const menu = page.getByRole('menu', { name: 'Mobile navigation menu' })
  // Assert
  await expect(menu).toBeVisible()
  // Capture the full 150 ms menu transition in the review video.
  await page.waitForTimeout(300)
  await page.keyboard.press('Escape')
  await expect(menu).toBeHidden()
  await page.waitForTimeout(300)
  await expect(menuButton).toBeFocused()
  expect(
    await menuButton.evaluate(
      (element) => getComputedStyle(element).outlineStyle,
    ),
  ).toBe('solid')

  // Act
  await menuButton.press('Enter')
  await menu.getByRole('link', { name: 'Projects', exact: true }).click()
  // Assert
  await expect(page).toHaveURL('/projects')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Projects' }),
  ).toBeVisible()
  await expect(menu).toBeHidden()

  // Act
  const html = page.locator('html')
  const wasDark = await html.evaluate((element) =>
    element.classList.contains('dark'),
  )
  await page.getByRole('button', { name: /Switch to .* theme/ }).press('Enter')
  // Assert
  if (wasDark) await expect(html).not.toHaveClass(/dark/)
  else await expect(html).toHaveClass(/dark/)
  await page.waitForTimeout(300)
})

for (const width of [390, 768, 1440]) {
  test(`page headings and key tables fit at ${width}px`, async ({ page }) => {
    // Arrange
    await page.setViewportSize({ width, height: 1000 })
    for (const route of [
      '/',
      '/about',
      '/projects',
      '/articles',
      '/uses',
      '/keybinds',
      '/articles/What-does-T-keyof-T-mean',
    ]) {
      // Act
      await page.goto(route)
      // Assert
      await expect(page.locator('h1')).toHaveCount(1)
      const overflow = await page
        .locator('h1, main table')
        .evaluateAll((elements) =>
          elements
            .filter((element) => {
              const bounds = element.getBoundingClientRect()
              return (
                bounds.left < 0 ||
                bounds.right > innerWidth ||
                element.scrollWidth > element.clientWidth + 1
              )
            })
            .map((element) => element.tagName),
        )
      expect(overflow, route).toEqual([])
    }
  })
}
