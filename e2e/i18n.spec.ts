import { expect, test, type Page } from '@playwright/test'

/**
 * Collects console errors and uncaught exceptions, the way a broken i18n setup
 * surfaces in the browser: next-intl logs MISSING_MESSAGE when a Client Component
 * reads a key it was not given, and React logs a hydration error when the server
 * and browser render different text.
 *
 * Ignores the Vercel Analytics script, which only exists on Vercel and 404s under
 * `pnpm start`, and the 404 of `expectedNotFound` when a test requests a missing page.
 */
function watchConsoleErrors(page: Page, expectedNotFound?: string): string[] {
  const problems: string[] = []
  page.on('console', (message) => {
    if (message.type() !== 'error') return
    const source = message.location().url
    const expected404 =
      message.text().startsWith('Failed to load resource') &&
      (source.includes('/_vercel/insights/') ||
        (expectedNotFound !== undefined && source.endsWith(expectedNotFound)))
    if (!expected404) problems.push(message.text())
  })
  page.on('pageerror', (error) => problems.push(error.message))
  return problems
}

test.describe('Japanese browser', () => {
  test.use({ locale: 'ja-JP' })

  test('serves the home page in Japanese at the unchanged URL', async ({
    page,
  }) => {
    // Arrange
    const problems = watchConsoleErrors(page)

    // Act
    await page.goto('/')

    // Assert
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Web アプリケーション開発を、もっとまっすぐに。',
    )
    expect(problems).toEqual([])
  })

  const japanesePages = [
    {
      path: '/about',
      heading: 'Laststance.io は、こういうものをなくすための私の実験室です。➡️',
    },
    { path: '/projects', heading: 'プロジェクト' },
    { path: '/uses', heading: '愛用品' },
    { path: '/keybinds', heading: 'キーバインド' },
    { path: '/privacy', heading: 'プライバシーポリシー' },
  ]
  for (const { path, heading } of japanesePages) {
    test(`shows the ${path} page heading in Japanese`, async ({ page }) => {
      // Arrange
      const problems = watchConsoleErrors(page)

      // Act
      await page.goto(path)

      // Assert
      await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
      await expect(
        page.getByRole('heading', { level: 1, name: heading }),
      ).toBeVisible()
      expect(problems).toEqual([])
    })
  }

  test('keeps the English keybind anchors, so the カーソル移動 link lands on #move-cursor', async ({
    page,
  }) => {
    // Arrange
    const problems = watchConsoleErrors(page)
    await page.goto('/keybinds')

    // Act
    await page.getByRole('link', { name: 'カーソル移動', exact: true }).click()

    // Assert
    await expect(page).toHaveURL(/\/keybinds#move-cursor$/)
    await expect(
      page.getByRole('heading', { level: 3, name: 'カーソル移動' }),
    ).toBeVisible()
    expect(problems).toEqual([])
  })

  test('shows the article date in Japanese while the article stays English', async ({
    page,
  }) => {
    // Arrange
    const problems = watchConsoleErrors(page)

    // Act
    await page.goto('/articles/Laststance-Recap-November-2025')

    // Assert
    const article = page.locator('article[lang="en"]')
    await expect(
      article.getByRole('heading', {
        level: 1,
        name: 'Laststance Recap: November 2025',
      }),
    ).toBeVisible()
    await expect(article.locator('time')).toHaveText('2025年12月5日')
    expect(problems).toEqual([])
  })

  test('serves an article whose slug contains a dot in Japanese', async ({
    page,
  }) => {
    // Arrange
    const problems = watchConsoleErrors(page)

    // Act
    const response = await page.goto(
      '/articles/update-eslint-config-ts-prefixer@v0.23.3',
    )

    // Assert
    expect(response?.status()).toBe(200)
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
    await expect(page.locator('article time')).toHaveText(
      /^\d{4}年\d{1,2}月\d{1,2}日$/,
    )
    expect(problems).toEqual([])
  })

  test('stays Japanese after client-side navigation from the footer', async ({
    page,
  }) => {
    // Arrange
    const problems = watchConsoleErrors(page)
    await page.goto('/')
    await page.evaluate(() => {
      ;(window as Window & { noReload?: boolean }).noReload = true
    })

    // Act
    await page
      .locator('footer')
      .getByRole('link', { name: 'キーバインド' })
      .click()

    // Assert
    await expect(page).toHaveURL(/\/keybinds$/)
    await expect(
      page.getByRole('heading', { level: 1, name: 'キーバインド' }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { level: 2, name: 'エディター' }),
    ).toBeVisible()
    expect(
      await page.evaluate(
        () => (window as Window & { noReload?: boolean }).noReload,
      ),
    ).toBe(true)
    expect(problems).toEqual([])
  })

  test('returns a 404 for an unknown article and shows the Japanese not-found page', async ({
    page,
  }) => {
    // Arrange
    const missing = '/articles/this-article-does-not-exist'
    const problems = watchConsoleErrors(page, missing)

    // Act
    const response = await page.goto(missing)

    // Assert
    expect(response?.status()).toBe(404)
    await expect(
      page.getByRole('heading', { level: 1, name: 'ページが見つかりません' }),
    ).toBeVisible()
    expect(problems).toEqual([])
  })

  test('breaks the Japanese menu and 更新履歴 header labels only between words on 320px and 375px phones', async ({
    page,
  }) => {
    // Arrange
    // Japanese can break between any two characters, so the visible lines are compared as text.
    const visibleLines = (element: Element): string[] => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
      const lines = new Map<number, string>()
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.textContent ?? ''
        for (let index = 0; index < text.length; index++) {
          if (!text[index].trim() || text[index] === '\u200b') continue
          const range = document.createRange()
          range.setStart(node, index)
          range.setEnd(node, index + 1)
          const top = Math.round(range.getBoundingClientRect().top)
          lines.set(top, (lines.get(top) ?? '') + text[index])
        }
      }
      return [...lines.entries()]
        .sort(([a], [b]) => a - b)
        .map(([, line]) => line)
    }

    for (const width of [320, 375]) {
      // Act
      await page.setViewportSize({ width, height: 667 })
      await page.goto('/about')
      const menuButton = page.getByRole('button', {
        name: 'ナビゲーションメニューを開閉',
      })
      const whatsNewButton = page.getByRole('button', {
        name: '更新履歴ダイアログを開く',
      })
      await expect(menuButton).toBeVisible()
      await expect(whatsNewButton).toBeVisible()

      // Assert
      expect(await menuButton.evaluate(visibleLines)).toEqual(['メニュー'])
      expect([['更新履歴'], ['更新', '履歴']]).toContainEqual(
        await whatsNewButton.evaluate(visibleLines),
      )
    }
  })
  test('switches to English from the header and stays English after reload', async ({
    page,
  }) => {
    // Arrange
    const problems = watchConsoleErrors(page)
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/about')
    // ThemeToggle names the theme it switches to only after hydration, when the switch's click handler is live.
    await expect(
      page.getByRole('button', { name: /^(ダーク|ライト)テーマに切り替え$/ }),
    ).toBeVisible()
    // WebKit logs prefetches cut off by a page load as console errors.
    await page.waitForLoadState('networkidle')

    // Act
    await page
      .locator('header')
      .getByRole('link', { name: '表示言語を切り替え: English' })
      .click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await page.waitForLoadState('networkidle')
    await page.reload()

    // Assert
    await expect(page).toHaveURL('/about')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Laststance.io is my experimental laboratory for eliminate like this. ➡️',
      }),
    ).toBeVisible()
    expect(problems).toEqual([])
  })
})

test.describe('Browser in a language other than Japanese', () => {
  test.use({ locale: 'fr-FR' })

  test('falls back to English', async ({ page }) => {
    // Arrange
    const problems = watchConsoleErrors(page)

    // Act
    await page.goto('/uses')

    // Assert
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(
      page.getByRole('heading', { level: 1, name: 'Uses' }),
    ).toBeVisible()
    expect(problems).toEqual([])
  })
})
