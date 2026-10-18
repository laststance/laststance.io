import { expect, test } from '@playwright/test'

test('project descriptions stay visible and hidden Stable projects leave no section', async ({
  page,
}) => {
  // Arrange
  await page.goto('/projects')
  // Act
  const projects = page.locator(
    'section[aria-label="Featured projects"] article',
  )
  // Assert
  await expect(projects).toHaveCount(8)
  await expect(projects.first().locator('p').first()).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Stable', exact: true }),
  ).toHaveCount(0)
  await expect(page.getByText('Active', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Clean URL/ })).toHaveCount(0)
})

test('Home shows selected projects instead of Now', async ({ page }) => {
  // Arrange
  await page.goto('/')
  // Act
  const articles = page.locator('main article')
  // Assert
  await expect(articles).toHaveCount(4)
  await expect(
    page.getByRole('heading', { name: 'Now', exact: true }),
  ).toHaveCount(0)
  await expect(
    page.getByRole('heading', { name: 'Selected projects' }),
  ).toBeVisible()
  await expect(page.getByRole('complementary').locator('li')).toHaveCount(3)
})

test('Keybinds keeps one page heading, nested section anchors, and wrapping tables', async ({
  page,
}) => {
  // Arrange
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/keybinds')
  // Act
  await page.getByRole('link', { name: 'Move Cursor', exact: true }).click()
  // Assert
  await expect(page).toHaveURL(/#move-cursor$/)
  await expect(page.locator('h1')).toHaveText('Keybinds')
  await expect(
    page.getByRole('heading', { level: 2, name: 'Editor' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { level: 3, name: 'Move Cursor' }),
  ).toBeVisible()
  expect(
    await page
      .locator('table')
      .evaluateAll((tables) =>
        tables.every((table) => table.scrollWidth <= table.clientWidth),
      ),
  ).toBe(true)
})
