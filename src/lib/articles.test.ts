import { describe, it, expect, vi } from 'vitest'

// Mock the build-time manifest so the test asserts behavior of `getAllArticles`
// against a known, hard-coded fixture (DAMP) rather than the real article list.
vi.mock('./articles-manifest', () => ({
  articlesManifest: [
    {
      slug: 'older-post',
      title: 'Older Post',
      author: 'Author A',
      date: '2024-01-10',
      description: 'An older entry',
    },
    {
      slug: 'newer-post',
      title: 'Newer Post',
      author: 'Author B',
      date: '2024-02-20',
      description: 'A newer entry',
    },
  ],
}))

import { getAllArticles } from './articles'

describe('getAllArticles', () => {
  it('returns every entry from the build-time manifest', async () => {
    const articles = await getAllArticles()

    expect(articles).toHaveLength(2)
    expect(articles.map((article) => article.slug)).toEqual(
      expect.arrayContaining(['older-post', 'newer-post']),
    )
  })

  it('exposes each entry as ArticleWithSlug (slug + frontmatter)', async () => {
    const articles = await getAllArticles()
    const newer = articles.find((article) => article.slug === 'newer-post')

    expect(newer).toEqual({
      slug: 'newer-post',
      title: 'Newer Post',
      author: 'Author B',
      date: '2024-02-20',
      description: 'A newer entry',
    })
  })
})
