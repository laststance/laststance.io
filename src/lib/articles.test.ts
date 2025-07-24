import { describe, it, expect, vi, beforeEach } from 'vitest'

import { getAllArticles } from './articles'

// Mock fast-glob
vi.mock('fast-glob', () => ({
  default: vi.fn(),
}))

// Mock dynamic imports
const mockArticles = {
  'article-1/page.mdx': {
    article: {
      title: 'Test Article 1',
      author: 'Test Author',
      date: '2024-01-15',
      description: 'Description for test article 1',
    },
  },
  'article-2/page.mdx': {
    article: {
      title: 'Test Article 2',
      author: 'Test Author',
      date: '2024-02-20',
      description: 'Description for test article 2',
    },
  },
  'article-3/page.mdx': {
    article: {
      title: 'Test Article 3',
      author: 'Test Author',
      date: '2024-01-10',
      description: 'Description for test article 3',
    },
  },
}

// Mock the dynamic import
vi.mock(
  '../app/articles/article-1/page.mdx',
  () => mockArticles['article-1/page.mdx'],
)
vi.mock(
  '../app/articles/article-2/page.mdx',
  () => mockArticles['article-2/page.mdx'],
)
vi.mock(
  '../app/articles/article-3/page.mdx',
  () => mockArticles['article-3/page.mdx'],
)

describe('articles', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllArticles', () => {
    it('should return all articles sorted by date (newest first)', async () => {
      const glob = await import('fast-glob')
      vi.mocked(glob.default).mockResolvedValue([
        'article-1/page.mdx',
        'article-2/page.mdx',
        'article-3/page.mdx',
      ])

      const articles = await getAllArticles()

      expect(articles).toHaveLength(3)
      expect(articles[0]).toEqual({
        slug: 'article-2',
        title: 'Test Article 2',
        author: 'Test Author',
        date: '2024-02-20',
        description: 'Description for test article 2',
      })
      expect(articles[1]).toEqual({
        slug: 'article-1',
        title: 'Test Article 1',
        author: 'Test Author',
        date: '2024-01-15',
        description: 'Description for test article 1',
      })
      expect(articles[2]).toEqual({
        slug: 'article-3',
        title: 'Test Article 3',
        author: 'Test Author',
        date: '2024-01-10',
        description: 'Description for test article 3',
      })
    })

    it('should handle empty article list', async () => {
      const glob = await import('fast-glob')
      vi.mocked(glob.default).mockResolvedValue([])

      const articles = await getAllArticles()

      expect(articles).toHaveLength(0)
      expect(articles).toEqual([])
    })

    it('should remove /page.mdx from slug', async () => {
      const glob = await import('fast-glob')
      vi.mocked(glob.default).mockResolvedValue(['article-1/page.mdx'])

      const articles = await getAllArticles()

      expect(articles[0].slug).toBe('article-1')
    })

    it('should call glob with correct parameters', async () => {
      const glob = await import('fast-glob')
      const mockGlob = vi.mocked(glob.default)
      mockGlob.mockResolvedValue([])

      await getAllArticles()

      expect(mockGlob).toHaveBeenCalledWith('*/page.mdx', {
        cwd: './src/app/articles',
      })
    })
  })
})
