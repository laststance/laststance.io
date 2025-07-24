import { test, expect } from '@playwright/test'

test.describe('Theme Switching', () => {
  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Check initial theme (should be light by default)
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    // Find and click the theme toggle button
    const themeToggle = page.getByLabel(/switch to dark theme/i)
    await expect(themeToggle).toBeVisible()
    await themeToggle.click()

    // Check that theme changed to dark
    await expect(html).toHaveClass(/dark/)

    // Find the updated button (should now say "switch to light theme")
    const lightThemeToggle = page.getByLabel(/switch to light theme/i)
    await expect(lightThemeToggle).toBeVisible()
    await lightThemeToggle.click()

    // Check that theme changed back to light
    await expect(html).not.toHaveClass(/dark/)
  })

  test('should persist theme across page navigation', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Switch to dark theme
    await page.getByLabel(/switch to dark theme/i).click()
    await expect(page.locator('html')).toHaveClass(/dark/)

    // Navigate to another page
    await page.getByRole('link', { name: 'About' }).click()
    await page.waitForURL('**/about')

    // Check that dark theme persists
    await expect(page.locator('html')).toHaveClass(/dark/)

    // Navigate back to home
    await page.getByRole('link', { name: 'Ryota Murakami' }).first().click()
    await page.waitForURL('**/')

    // Check that dark theme still persists
    await expect(page.locator('html')).toHaveClass(/dark/)
  })

  test('should have proper ARIA labels for accessibility', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Check ARIA label in light mode
    const lightModeButton = page.getByRole('button', { name: /switch to dark theme/i })
    await expect(lightModeButton).toBeVisible()
    await expect(lightModeButton).toHaveAttribute('aria-label', 'Switch to dark theme')

    // Switch to dark mode
    await lightModeButton.click()

    // Check ARIA label in dark mode
    const darkModeButton = page.getByRole('button', { name: /switch to light theme/i })
    await expect(darkModeButton).toBeVisible()
    await expect(darkModeButton).toHaveAttribute('aria-label', 'Switch to light theme')
  })

  test('should have correct visual indicators for theme state', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // In light mode, sun icon should be visible
    const sunIcon = page.locator('svg').filter({ has: page.locator('path[d*="M8 12.25A4.25"]') })
    const moonIcon = page.locator('svg').filter({ has: page.locator('path[d*="M17.25 16.22"]') })

    // Check initial state (light mode)
    await expect(sunIcon).toBeVisible()
    await expect(moonIcon).not.toBeVisible()

    // Switch to dark mode
    await page.getByLabel(/switch to dark theme/i).click()

    // In dark mode, moon icon should be visible
    await expect(sunIcon).not.toBeVisible()
    await expect(moonIcon).toBeVisible()
  })
})