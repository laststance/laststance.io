import { expect, test, type Page } from '@playwright/test'

const widths = [320, 375, 768, 1024, 1440]
const pages = ['/', '/about']

/**
 * Lists every visible header link and button that sticks out of the viewport,
 * plus the page's horizontal overflow. Japanese labels can break between any
 * two characters and English labels can grow, so a header that fits in one
 * language at one width can overflow in another.
 */
async function headerOverflow(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth
    const problems: string[] = []
    for (const control of document.querySelectorAll(
      'header a, header button',
    )) {
      const box = control.getBoundingClientRect()
      if (box.width === 0 || box.height === 0) continue
      if (box.left < 0 || box.right > viewportWidth + 0.5) {
        const name =
          control.getAttribute('aria-label') ?? control.textContent?.trim()
        problems.push(
          `${name}: ${Math.round(box.left)}-${Math.round(box.right)} of ${viewportWidth}`,
        )
      }
    }
    if (document.documentElement.scrollWidth > viewportWidth) {
      problems.push(
        `page scrolls sideways: ${document.documentElement.scrollWidth} > ${viewportWidth}`,
      )
    }
    return problems
  })
}

for (const locale of ['ja-JP', 'en-US']) {
  test.describe(`${locale} browser`, () => {
    test.use({ locale })

    for (const width of widths) {
      test(`keeps every header control on screen at ${width}px`, async ({
        page,
      }) => {
        // Arrange
        await page.setViewportSize({ width, height: 800 })

        for (const path of pages) {
          // Act
          await page.goto(path)
          await expect(page.locator('header').first()).toBeVisible()

          // Assert
          expect(await headerOverflow(page), path).toEqual([])
        }
      })
    }
  })
}
