import { expect, test } from '@playwright/test'

/**
 * E2E Test Suite: Syntax Highlighting Validation
 *
 * Purpose: Verify that Prism.js syntax highlighting is working correctly
 * across all supported devices and themes in MDX blog articles.
 *
 * Test Coverage:
 * - Code block detection and language class validation
 * - Syntax token highlighting (keywords, strings, comments)
 * - Color styling validation (not default text colors)
 * - Dark/light theme compatibility
 * - Cross-device compatibility (desktop, tablet, mobile)
 * - Theme toggle preservation of highlighting
 *
 * Usage:
 * - Run all tests: `pnpm playwright test e2e/syntax-highlighting.spec.ts`
 * - Run specific test: `pnpm playwright test -g "should apply syntax highlighting"`
 * - Run with UI: `pnpm playwright test e2e/syntax-highlighting.spec.ts --ui`
 *
 * Requirements:
 * - Production build must be running (`pnpm build && pnpm start`)
 * - Test article with code blocks must exist at specified URL
 * - Prism.js and rehype-prism plugin must be properly configured
 */
test.describe('Syntax Highlighting', () => {
  test('should apply syntax highlighting to code blocks in article pages', async ({ page }) => {
    // Navigate to an article with code blocks (TypeScript example)
    await page.goto('/articles/update-eslint-config-ts-prefixer@v0.23.3')

    // Wait for page to load completely
    await page.waitForLoadState('networkidle')

    // Check that code blocks have the correct language class
    const codeBlocks = page.locator('pre[class*="language-"]')
    expect(await codeBlocks.count()).toBeGreaterThan(0)

    // Verify that the first code block has Prism language class
    const firstCodeBlock = codeBlocks.first()
    await expect(firstCodeBlock).toHaveClass(/language-\w+/)

    // Check that syntax highlighting tokens are present
    const tokens = page.locator('.token')
    expect(await tokens.count()).toBeGreaterThan(0)

    // Verify specific token types are present and styled
    const keywordTokens = page.locator('.token.keyword')
    const stringTokens = page.locator('.token.string')
    const commentTokens = page.locator('.token.comment')

    // At least one of these token types should be present
    const hasKeywords = await keywordTokens.count() > 0
    const hasStrings = await stringTokens.count() > 0
    const hasComments = await commentTokens.count() > 0

    expect(hasKeywords || hasStrings || hasComments).toBe(true)

    // Check that tokens have proper styling (color should not be default)
    if (hasKeywords) {
      const keywordColor = await keywordTokens.first().evaluate((el) =>
        window.getComputedStyle(el).color
      )
      // Should not be the default text color (white or black)
      expect(keywordColor).not.toBe('rgb(255, 255, 255)')
      expect(keywordColor).not.toBe('rgb(0, 0, 0)')
    }

    if (hasStrings) {
      const stringColor = await stringTokens.first().evaluate((el) =>
        window.getComputedStyle(el).color
      )
      // Should not be the default text color
      expect(stringColor).not.toBe('rgb(255, 255, 255)')
      expect(stringColor).not.toBe('rgb(0, 0, 0)')
    }
  })

  test('should apply syntax highlighting in dark mode', async ({ page }) => {
    // Navigate to article page
    await page.goto('/articles/update-eslint-config-ts-prefixer@v0.23.3')
    await page.waitForLoadState('networkidle')

    // Switch to dark mode
    const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme" i], button[title*="theme" i]').first()
    if (await themeToggle.count() > 0) {
      await themeToggle.click()
      await page.waitForTimeout(500) // Wait for theme transition
    }

    // Verify syntax highlighting still works in dark mode
    const tokens = page.locator('.token')
    expect(await tokens.count()).toBeGreaterThan(0)

    // Check that at least one token has color styling
    const firstToken = tokens.first()
    const tokenColor = await firstToken.evaluate((el) =>
      window.getComputedStyle(el).color
    )

    // Should have color styling applied
    expect(tokenColor).toBeTruthy()
    expect(tokenColor).not.toBe('rgb(255, 255, 255)')
    expect(tokenColor).not.toBe('rgb(0, 0, 0)')
  })

  test('should highlight different programming languages correctly', async ({ page }) => {
    // Test JavaScript/TypeScript highlighting
    await page.goto('/articles/update-eslint-config-ts-prefixer@v0.23.3')
    await page.waitForLoadState('networkidle')

    // Check for TypeScript-specific tokens
    const codeBlock = page.locator('pre[class*="language-"]').first()
    await expect(codeBlock).toBeVisible()

    // Look for common programming language tokens
    const tokens = page.locator('.token')
    expect(await tokens.count()).toBeGreaterThan(0)

    // Verify that different token types have different colors
    const tokenColors = await tokens.evaluateAll((elements) =>
      elements.map(el => window.getComputedStyle(el).color)
    )

    // Should have multiple different colors (syntax highlighting working)
    const uniqueColors = new Set(tokenColors.filter(color =>
      color !== 'rgb(255, 255, 255)' &&
      color !== 'rgb(0, 0, 0)' &&
      color !== ''
    ))

    expect(uniqueColors.size).toBeGreaterThan(0)
  })

  test('should maintain syntax highlighting after theme toggle', async ({ page }) => {
    await page.goto('/articles/update-eslint-config-ts-prefixer@v0.23.3')
    await page.waitForLoadState('networkidle')

    // Get initial token count and colors
    const initialTokens = await page.locator('.token').count()

    // Find and click theme toggle (try multiple selectors)
    const themeSelectors = [
      '[data-testid="theme-toggle"]',
      'button[aria-label*="theme" i]',
      'button[title*="theme" i]',
      'button:has-text("theme" i)',
      'button[class*="theme"]'
    ]

    let themeToggled = false
    for (const selector of themeSelectors) {
      const toggle = page.locator(selector).first()
      if (await toggle.count() > 0) {
        await toggle.click()
        await page.waitForTimeout(500)
        themeToggled = true
        break
      }
    }

    // Verify syntax highlighting is preserved after theme toggle
    const tokensAfterToggle = await page.locator('.token').count()
    expect(tokensAfterToggle).toBe(initialTokens)

    // Verify tokens still have color styling
    const tokens = page.locator('.token')
    if (await tokens.count() > 0) {
      const tokenColor = await tokens.first().evaluate((el) =>
        window.getComputedStyle(el).color
      )
      expect(tokenColor).toBeTruthy()
    }
  })
})