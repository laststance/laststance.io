import { expect, test } from '@playwright/test'

// Hard-coded fixtures per DAMP — chosen because the article exists in the
// statically generated route table (src/app/articles/Laststance-Recap-November-2025)
// and its content is stable enough to assert against.
const FIXTURE_SLUG = 'Laststance-Recap-November-2025'
const FIXTURE_TITLE = 'Laststance Recap: November 2025'
const FIXTURE_BODY_SNIPPET =
  'November was an exceptionally productive month for Laststance!'

test.describe('/articles/[slug] detail page', () => {
  test('direct visit renders the article title as <h1> and the MDX body', async ({
    page,
  }) => {
    // ▶️ Arrange + Act: hit the canonical detail URL straight from the address bar.
    await page.goto(`/articles/${FIXTURE_SLUG}`)

    // ✅ Assert: the article's frontmatter title becomes the page <h1>.
    await expect(
      page.getByRole('heading', { name: FIXTURE_TITLE, level: 1 }),
    ).toBeVisible()

    // ✅ Assert: MDX prose body content is rendered, not just the layout chrome.
    await expect(page.getByText(FIXTURE_BODY_SNIPPET)).toBeVisible()
  })

  test('navigating from /articles to a detail page lands on the matching slug', async ({
    page,
  }) => {
    await page.goto('/articles')

    // 📌 Capture the first article card's link before we click — we'll prove the
    //    destination page matches both the href and the link text.
    const firstArticleLink = page
      .locator('article h2 a[href^="/articles/"]')
      .first()
    const firstArticleHref = await firstArticleLink.getAttribute('href')
    const firstArticleTitle = (await firstArticleLink.textContent())?.trim()

    expect(firstArticleHref).toMatch(/^\/articles\/[^/]+$/)
    expect(firstArticleTitle).toBeTruthy()

    await firstArticleLink.click()

    // ✅ The URL reflects the slug we clicked, and the same title shows as <h1>.
    if (!firstArticleHref || !firstArticleTitle) {
      throw new Error('Expected the first article link to expose href and text')
    }
    await expect(page).toHaveURL(new RegExp(`${firstArticleHref}$`))
    await expect(
      page.getByRole('heading', { name: firstArticleTitle, level: 1 }),
    ).toBeVisible()
  })

  test('unknown slug returns 404 instead of crashing the client', async ({
    page,
  }) => {
    // 🪤 Regression guard: the previous runtime-glob failure mode masked missing
    //    routes by surfacing "Application error" instead of Next.js's not-found.
    const pageErrors: Error[] = []
    page.on('pageerror', (error) => pageErrors.push(error))

    const response = await page.goto('/articles/this-article-does-not-exist', {
      waitUntil: 'domcontentloaded',
    })

    expect(response?.status()).toBe(404)
    expect(pageErrors).toEqual([])
  })
})
