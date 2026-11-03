import { expect, test, type Page } from '@playwright/test'

const DESKTOP = { width: 1280, height: 800 }
const PHONE = { width: 375, height: 667 }
const SECONDS_PER_DAY = 60 * 60 * 24

const ABOUT_HEADING_JA =
  'Laststance.io は、こういうものをなくすための私の実験室です。➡️'
const TO_JAPANESE = 'Switch language to 日本語'
const TO_ENGLISH = '表示言語を切り替え: English'

/**
 * Opens `path` once React has hydrated the header, so a click runs the switch's
 * handler rather than the no-JavaScript fallback link. ThemeToggle names the
 * theme it switches to only after it mounts.
 */
async function openHydrated(page: Page, path: string): Promise<void> {
  await page.goto(path)
  await expect(
    page.getByRole('button', { name: /^Switch to (dark|light) theme$/ }),
  ).toBeVisible()
}

async function switchToJapanese(page: Page): Promise<void> {
  await page.locator('header').getByRole('link', { name: TO_JAPANESE }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
}

test.describe('English browser', () => {
  test.use({ locale: 'en-US' })

  test('switches /about to Japanese from the header and keeps the unprefixed URL', async ({
    page,
  }) => {
    // Arrange
    await page.setViewportSize(DESKTOP)
    await openHydrated(page, '/about')

    // Act
    await page
      .locator('header')
      .getByRole('link', { name: TO_JAPANESE })
      .click()

    // Assert
    await expect(page).toHaveURL('/about')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
    await expect(
      page.getByRole('heading', { level: 1, name: ABOUT_HEADING_JA }),
    ).toBeVisible()
    await expect(page.getByRole('link', { name: TO_ENGLISH })).toBeVisible()
  })

  test('remembers Japanese for a year so the next visit opens in Japanese', async ({
    page,
    context,
    browser,
  }) => {
    // Arrange
    await page.setViewportSize(DESKTOP)
    await openHydrated(page, '/about')

    // Act
    await switchToJapanese(page)
    const state = await context.storageState()
    const nextVisit = await browser.newContext({
      locale: 'en-US',
      storageState: state,
    })
    const nextPage = await nextVisit.newPage()
    await nextPage.goto('/')

    // Assert
    const cookie = state.cookies.find(({ name }) => name === 'NEXT_LOCALE')
    expect(cookie?.value).toBe('ja')
    expect(cookie?.expires).toBeGreaterThan(
      Date.now() / 1000 + 364 * SECONDS_PER_DAY,
    )
    await expect(nextPage.locator('html')).toHaveAttribute('lang', 'ja')
    await nextVisit.close()
  })

  test('keeps ?page=2 when switching on the articles list', async ({
    page,
  }) => {
    // Arrange
    await page.setViewportSize(DESKTOP)
    await openHydrated(page, '/articles?page=2')

    // Act
    await switchToJapanese(page)

    // Assert
    await expect(page).toHaveURL('/articles?page=2')
    await expect(
      page.getByRole('heading', { level: 1, name: '記事' }),
    ).toBeVisible()
  })

  test('keeps #move-cursor when switching on keybinds', async ({ page }) => {
    // Arrange
    await page.setViewportSize(DESKTOP)
    await openHydrated(page, '/keybinds#move-cursor')

    // Act
    await switchToJapanese(page)

    // Assert
    await expect(page).toHaveURL('/keybinds#move-cursor')
    await expect(
      page.getByRole('heading', { level: 3, name: 'カーソル移動' }),
    ).toBeVisible()
  })

  test('switches on a dotted article slug without leaving /ja in the address bar', async ({
    page,
  }) => {
    // Arrange
    const slug = '/articles/update-eslint-config-ts-prefixer@v0.23.3'
    await page.setViewportSize(DESKTOP)
    await openHydrated(page, slug)

    // Act
    await switchToJapanese(page)

    // Assert
    await expect(page).toHaveURL(slug)
    await expect(page.locator('article time')).toHaveText(
      /^\d{4}年\d{1,2}月\d{1,2}日$/,
    )
  })

  test('shows the chosen language on links prefetched before the switch', async ({
    page,
  }) => {
    // Arrange
    await page.setViewportSize(DESKTOP)
    await openHydrated(page, '/about')
    const nav = page.locator('header nav')
    await nav.getByRole('link', { name: 'Projects' }).hover()
    await page.waitForLoadState('networkidle')

    // Act
    await switchToJapanese(page)
    await nav.getByRole('link', { name: 'プロジェクト' }).click()

    // Assert
    await expect(page).toHaveURL('/projects')
    await expect(
      page.getByRole('heading', { level: 1, name: 'プロジェクト' }),
    ).toBeVisible()
  })

  test('Back after switching shows the chosen language', async ({ page }) => {
    // Arrange
    await page.setViewportSize(DESKTOP)
    await openHydrated(page, '/projects')
    await page
      .locator('header nav')
      .getByRole('link', { name: 'About' })
      .click()
    await expect(page).toHaveURL('/about')

    // Act
    await switchToJapanese(page)
    await page.goBack()

    // Assert
    await expect(page).toHaveURL('/projects')
    await expect(
      page.getByRole('heading', { level: 1, name: 'プロジェクト' }),
    ).toBeVisible()
  })

  test('leaves visitors who never choose without a language cookie', async ({
    page,
    context,
  }) => {
    // Arrange
    await page.setViewportSize(DESKTOP)
    await openHydrated(page, '/')

    // Act
    await page
      .locator('header nav')
      .getByRole('link', { name: 'About' })
      .click()
    await expect(page).toHaveURL('/about')
    await openHydrated(page, '/projects')

    // Assert
    const cookies = await context.cookies()
    expect(cookies.map(({ name }) => name)).not.toContain('NEXT_LOCALE')
  })

  test('switches with the keyboard alone', async ({ page, browserName }) => {
    // Arrange
    await page.setViewportSize(DESKTOP)
    await openHydrated(page, '/about')
    const toJapanese = page
      .locator('header')
      .getByRole('link', { name: TO_JAPANESE })
    await expect(toJapanese).toBeVisible()

    // Act
    // Safari reaches links with Option+Tab; plain Tab skips them.
    const nextFocus = browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
    for (let presses = 0; presses < 20; presses++) {
      await page.keyboard.press(nextFocus)
      if (await toJapanese.evaluate((link) => link === document.activeElement))
        break
    }
    await expect(toJapanese).toBeFocused()
    await page.keyboard.press('Enter')

    // Assert
    await expect(page).toHaveURL('/about')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
  })

  test('offers the switch in the Menu panel on a 375px phone', async ({
    page,
  }) => {
    // Arrange
    await page.setViewportSize(PHONE)
    await openHydrated(page, '/about')
    await page
      .getByRole('button', { name: 'Toggle mobile navigation menu' })
      .click()
    const menu = page.getByRole('menu', { name: 'Mobile navigation menu' })
    await expect(menu.getByRole('heading', { name: 'Language' })).toBeVisible()

    // Act
    await menu.getByRole('link', { name: TO_JAPANESE }).click()

    // Assert
    await expect(page).toHaveURL('/about')
    await expect(
      page.getByRole('heading', { level: 1, name: ABOUT_HEADING_JA }),
    ).toBeVisible()
  })

  test.describe('page served in the language the visitor switched away from', () => {
    /**
     * Answers document requests for /about with the English page, the way a
     * back-forward cache or HTTP cache restore can, for the first `times` requests.
     * Returns a counter of every /about document request.
     */
    async function serveEnglishAbout(
      page: Page,
      baseURL: string | undefined,
      times: number,
    ): Promise<{ count: number }> {
      const englishHtml = await (
        await fetch(`${baseURL}/about`, {
          headers: { 'accept-language': 'en-US' },
        })
      ).text()
      const requests = { count: 0 }
      await page.route('**/about', async (route) => {
        if (route.request().resourceType() !== 'document') {
          return route.fallback()
        }
        requests.count++
        if (requests.count > times) return route.fallback()
        await route.fulfill({ body: englishHtml, contentType: 'text/html' })
      })
      return requests
    }

    test('reloads into the chosen language', async ({
      page,
      context,
      baseURL,
    }) => {
      // Arrange
      await page.setViewportSize(DESKTOP)
      await context.addCookies([
        { name: 'NEXT_LOCALE', value: 'ja', domain: 'localhost', path: '/' },
      ])
      const requests = await serveEnglishAbout(page, baseURL, 1)

      // Act
      await page.goto('/about')

      // Assert
      await expect(
        page.getByRole('heading', { level: 1, name: ABOUT_HEADING_JA }),
      ).toBeVisible()
      expect(requests.count).toBe(2)
    })

    test('reloads only once when the old language keeps coming back', async ({
      page,
      context,
      baseURL,
    }) => {
      // Arrange
      await page.setViewportSize(DESKTOP)
      await context.addCookies([
        { name: 'NEXT_LOCALE', value: 'ja', domain: 'localhost', path: '/' },
      ])
      const requests = await serveEnglishAbout(page, baseURL, Infinity)

      // Act
      await page.goto('/about')
      await expect.poll(() => requests.count).toBe(2)
      await expect(
        page.getByRole('button', { name: /^Switch to (dark|light) theme$/ }),
      ).toBeVisible()
      await page.waitForLoadState('networkidle')

      // Assert
      expect(requests.count).toBe(2)
      await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    })
  })
})

test.describe('English browser without JavaScript', () => {
  test.use({ locale: 'en-US', javaScriptEnabled: false })

  test('switches /about to Japanese with JavaScript disabled', async ({
    page,
  }) => {
    // Arrange
    await page.setViewportSize(DESKTOP)
    await page.goto('/about')

    // Act
    await page
      .locator('header')
      .getByRole('link', { name: TO_JAPANESE })
      .click()

    // Assert
    await expect(page).toHaveURL('/about')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja')
    await expect(
      page.getByRole('heading', { level: 1, name: ABOUT_HEADING_JA }),
    ).toBeVisible()
  })
})
