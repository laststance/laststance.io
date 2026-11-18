import { describe, expect, test, vi } from 'vitest'

import { getAllArticles } from './articles'

vi.mock('./articles-manifest', () => ({
  articlesManifest: [
    {
      slug: 'winter-release',
      author: 'Author A',
      date: '2024-02-20',
      editions: {
        en: { title: 'Winter release', description: 'Desktop updates' },
        ja: { title: '冬のリリース', description: 'デスクトップ版の更新' },
      },
    },
  ],
}))

describe('article listings', () => {
  test('the Japanese listing links the translated summary to the original URL', async () => {
    // Arrange
    const locale = 'ja'

    // Act
    const articles = await getAllArticles(locale)

    // Assert
    expect(articles).toEqual([
      {
        slug: 'winter-release',
        author: 'Author A',
        date: '2024-02-20',
        title: '冬のリリース',
        description: 'デスクトップ版の更新',
      },
    ])
  })

  test('the default feed contains one English entry per article', async () => {
    // Arrange, Act
    const articles = await getAllArticles()

    // Assert
    expect(articles).toEqual([
      {
        slug: 'winter-release',
        author: 'Author A',
        date: '2024-02-20',
        title: 'Winter release',
        description: 'Desktop updates',
      },
    ])
  })
})
