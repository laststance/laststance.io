import { expect, test, type Page } from '@playwright/test'

const widths = [320, 375, 640, 768, 1024, 1440]
const pages = ['/', '/about']
const LOCALE_PILL_MIN_WIDTH_PX = 640

/**
 * Lists every visible header link and button that sticks out of the viewport
 * or overlaps another one, plus the page's horizontal overflow. Japanese labels
 * can break between any two characters and English labels can grow, so a header
 * that fits in one language at one width can overflow in another.
 */
async function headerOverflow(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth
    const problems: string[] = []
    const controls = [
      ...document.querySelectorAll('header a, header button'),
    ].flatMap((control) => {
      const box = control.getBoundingClientRect()
      if (box.width === 0 || box.height === 0) return []
      const name =
        control.getAttribute('aria-label') ?? control.textContent?.trim()
      return [{ name, box }]
    })
    for (const { name, box } of controls) {
      if (box.left < 0 || box.right > viewportWidth + 0.5) {
        problems.push(
          `${name}: ${Math.round(box.left)}-${Math.round(box.right)} of ${viewportWidth}`,
        )
      }
    }
    for (const [index, a] of controls.entries()) {
      for (const b of controls.slice(index + 1)) {
        const overlapX =
          Math.min(a.box.right, b.box.right) - Math.max(a.box.left, b.box.left)
        const overlapY =
          Math.min(a.box.bottom, b.box.bottom) - Math.max(a.box.top, b.box.top)
        if (overlapX > 0.5 && overlapY > 0.5) {
          problems.push(
            `${a.name} (${Math.round(a.box.left)}-${Math.round(a.box.right)}) overlaps ${b.name} (${Math.round(b.box.left)}-${Math.round(b.box.right)})`,
          )
        }
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

const browsers = [
  {
    locale: 'ja-JP',
    menuName: 'ナビゲーションメニューを開閉',
    switchName: '表示言語を切り替え: English',
  },
  {
    locale: 'en-US',
    menuName: 'Toggle mobile navigation menu',
    switchName: 'Switch language to 日本語',
  },
]

for (const { locale, menuName, switchName } of browsers) {
  test.describe(`${locale} browser`, () => {
    test.use({ locale })

    for (const width of widths) {
      test(`keeps every header control on screen and apart at ${width}px`, async ({
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

      test(`offers the language switch at ${width}px`, async ({ page }) => {
        // Arrange
        await page.setViewportSize({ width, height: 800 })
        await page.goto('/about')
        const header = page.locator('header').first()

        // Act
        if (width < LOCALE_PILL_MIN_WIDTH_PX) {
          await header.getByRole('button', { name: menuName }).click()
        }

        // Assert
        await expect(
          page
            .getByRole('link', { name: switchName })
            .filter({ visible: true }),
        ).toBeVisible()
      })
    }
  })
}
