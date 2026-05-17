import { expect, test } from '@playwright/test'

// Hard-coded per DAMP — matches `ARTICLES_PER_PAGE` in src/lib/constants.ts.
// Tests should break loudly if the page size diverges from the contract.
const ARTICLES_PER_PAGE = 10

test.describe('/articles pagination', () => {
  test('first page renders the index header and a full page of articles', async ({
    page,
  }) => {
    // ▶️ Arrange: visit the canonical (page=1) URL with no query string.
    await page.goto('/articles')

    // ✅ Assert: page chrome and exactly ARTICLES_PER_PAGE article cards.
    await expect(
      page.getByRole('heading', {
        name: /Writing about new release/i,
        level: 1,
      }),
    ).toBeVisible()

    const articleHeadings = page.locator('article h2 a[href^="/articles/"]')
    await expect(articleHeadings).toHaveCount(ARTICLES_PER_PAGE)
  })

  test('exposes a Next link pointing to page=2 from the first page', async ({
    page,
  }) => {
    await page.goto('/articles')

    const pagination = page.getByRole('navigation', { name: 'Pagination' })
    await expect(pagination).toBeVisible()

    const next = pagination.getByRole('link', { name: 'Go to next page' })
    await expect(next).toHaveAttribute('href', '/articles?page=2')
  })

  test('Next link navigates to page 2 and shows a different lead article', async ({
    page,
  }) => {
    await page.goto('/articles')

    // 📌 Snapshot the page=1 lead article title so we can prove page=2 differs.
    const firstTitleOnPage1 = (
      await page.locator('article h2 a').first().textContent()
    )?.trim()
    expect(firstTitleOnPage1).toBeTruthy()

    await page.getByRole('link', { name: 'Go to next page' }).click()
    await expect(page).toHaveURL(/[?&]page=2(?:$|&|#)/)

    const firstTitleOnPage2 = (
      await page.locator('article h2 a').first().textContent()
    )?.trim()
    expect(firstTitleOnPage2).toBeTruthy()
    expect(firstTitleOnPage2).not.toBe(firstTitleOnPage1)
  })

  test('out-of-range page=999 clamps to the last page without a client-side crash', async ({
    page,
  }) => {
    // 🪤 Regression guard for the Sentry incident where /articles threw
    //    "Application error: a client-side exception has occurred"
    //    because runtime fast-glob returned [] inside Vercel's serverless bundle.
    const pageErrors: Error[] = []
    page.on('pageerror', (error) => pageErrors.push(error))

    await page.goto('/articles?page=999')

    // Last page should render between 1 and ARTICLES_PER_PAGE articles — never zero.
    const articleHeadings = page.locator('article h2 a[href^="/articles/"]')
    const count = await articleHeadings.count()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThanOrEqual(ARTICLES_PER_PAGE)

    // No uncaught client-side exceptions surfaced during render.
    expect(pageErrors).toEqual([])
  })
})
