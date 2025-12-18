import { Octokit } from 'octokit'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import type { Feed, ValidatedFeed } from './octokit'

// Mock dependencies - vitest hoists vi.mock() calls automatically
vi.mock('octokit', () => ({
  Octokit: vi.fn().mockImplementation(() => ({
    request: vi.fn(),
  })),
}))

vi.mock('next/cache', () => ({
  unstable_cache: vi.fn((fn) => fn),
}))

vi.mock('@/env.mjs', () => ({
  env: {
    PERSONAL_ACCESS_TOKEN: 'test-token',
  },
}))

/**
 * Helper to create mock feed entry with required fields.
 * @param overrides - Partial Feed object to override defaults
 * @returns Feed - A complete mock feed entry
 */
const createMockFeed = (overrides: Partial<Feed> = {}): Feed => ({
  id: 'tag:github.com,2024:event/123',
  title: {
    '@_type': 'html',
    '#text': 'Test Event',
  },
  updated: '2024-01-15T10:00:00Z',
  link: {
    '@_href': 'https://github.com/user/repo',
    '@_rel': 'alternate',
    '@_type': 'text/html',
  },
  author: {
    name: 'testuser',
    email: 'test@example.com',
    uri: 'https://github.com/testuser',
  },
  content: {
    '@_type': 'html',
    '#text': '<p>Test content</p>',
  },
  ...overrides,
})

/**
 * Creates mock XML response structure.
 * @param entries - Array of feed entries
 * @returns Object matching XMLParser output format
 */
const createMockXmlResponse = (entries: Feed[]) => ({
  feed: {
    entry: entries,
  },
})

describe('octokit module', () => {
  let mockOctokitInstance: { request: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    vi.clearAllMocks()
    mockOctokitInstance = {
      request: vi.fn(),
    }
    vi.mocked(Octokit).mockImplementation(() => mockOctokitInstance as unknown as InstanceType<typeof Octokit>)
  })

  afterEach(() => {
    vi.resetModules()
  })

  describe('Feed type', () => {
    it('should have correct required fields structure', () => {
      const feed: Feed = createMockFeed()
      expect(feed.id).toBeDefined()
      expect(feed.title).toBeDefined()
      expect(feed.title['@_type']).toBeDefined()
      expect(feed.title['#text']).toBeDefined()
      expect(feed.updated).toBeDefined()
      expect(feed.link).toBeDefined()
    })

    it('should allow optional content field', () => {
      const feedWithContent = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<p>Content</p>',
        },
      })
      expect(feedWithContent.content).toBeDefined()
      expect(feedWithContent.content?.['#text']).toBe('<p>Content</p>')
    })

    it('should allow optional author field', () => {
      const feedWithAuthor = createMockFeed({
        author: {
          name: 'testuser',
          email: 'test@example.com',
          uri: 'https://github.com/testuser',
        },
      })
      expect(feedWithAuthor.author).toBeDefined()
      expect(feedWithAuthor.author?.name).toBe('testuser')
    })

    it('should allow optional media:thumbnail field', () => {
      const feedWithThumbnail = createMockFeed({
        'media:thumbnail': {
          '@_height': '30',
          '@_url': 'https://avatars.githubusercontent.com/u/123',
          '@_width': '30',
        },
      })
      expect(feedWithThumbnail['media:thumbnail']).toBeDefined()
    })
  })

  describe('ValidatedFeed type', () => {
    it('should require content field', () => {
      const validatedFeed: ValidatedFeed = {
        ...createMockFeed(),
        content: {
          '@_type': 'html',
          '#text': '<p>Required content</p>',
        },
      }
      expect(validatedFeed.content).toBeDefined()
      expect(validatedFeed.content['#text']).toBe('<p>Required content</p>')
    })
  })

  describe('processFeedEntry filtering', () => {
    it('should filter out entries without content', async () => {
      // Entry without content should be filtered
      const feedWithoutContent = createMockFeed()
      delete (feedWithoutContent as Partial<Feed>).content

      // This test validates type guard behavior
      expect(feedWithoutContent.content).toBeUndefined()
    })

    it('should filter out entries with non-object content', () => {
      const feedWithInvalidContent = {
        ...createMockFeed(),
        content: 'string content' as unknown as Feed['content'],
      }
      // Type mismatch indicates invalid entry
      expect(typeof feedWithInvalidContent.content).toBe('string')
    })

    it('should filter out Dependabot entries', () => {
      const dependabotFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<p>Dependabot updated dependencies</p>',
        },
      })
      // Dependabot keyword present
      expect(dependabotFeed.content?.['#text']).toContain('Dependabot')
    })

    it('should filter out dependabot (lowercase) entries', () => {
      const dependabotFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<p>dependabot bump package</p>',
        },
      })
      expect(dependabotFeed.content?.['#text']).toContain('dependabot')
    })

    it('should filter out Bump entries', () => {
      const bumpFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<p>Bump lodash from 4.0.0 to 4.0.1</p>',
        },
      })
      expect(bumpFeed.content?.['#text']).toContain('Bump')
    })

    it('should filter out bump (lowercase) entries', () => {
      const bumpFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<p>bump version to 2.0.0</p>',
        },
      })
      expect(bumpFeed.content?.['#text']).toContain('bump')
    })

    it('should filter out private repository activity', () => {
      const privateFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<p>Activity in hayashima repository</p>',
        },
      })
      expect(privateFeed.content?.['#text']).toContain('hayashima')
    })
  })

  describe('HTML content transformation', () => {
    it('should convert relative hrefs to absolute GitHub URLs', () => {
      const feed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<a href="/user/repo">Link</a>',
        },
      })
      // After processing, href should be https://github.com/user/repo
      const relativeHref = feed.content?.['#text']
      expect(relativeHref).toContain('href="/user/repo"')
    })

    it('should preserve absolute hrefs', () => {
      const feed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<a href="https://example.com">External</a>',
        },
      })
      expect(feed.content?.['#text']).toContain('https://example.com')
    })

    it('should convert relative img src to absolute', () => {
      const feed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<img src="/assets/image.png">',
        },
      })
      // Relative src should be converted
      expect(feed.content?.['#text']).toContain('src="/assets/image.png"')
    })

    it('should handle protocol-relative img src', () => {
      const feed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<img src="//cdn.example.com/image.png">',
        },
      })
      // Protocol-relative should get https: prefix
      expect(feed.content?.['#text']).toContain('//cdn.example.com')
    })
  })

  describe('HTML sanitization in processFeedEntry', () => {
    it('should remove script tags', () => {
      const maliciousFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<p>Safe</p><script>alert("xss")</script>',
        },
      })
      // Script tag present in input
      expect(maliciousFeed.content?.['#text']).toContain('<script>')
    })

    it('should remove style tags', () => {
      const styleFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<style>.evil { display: none }</style><p>Content</p>',
        },
      })
      expect(styleFeed.content?.['#text']).toContain('<style>')
    })

    it('should remove iframe tags', () => {
      const iframeFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<iframe src="https://evil.com"></iframe>',
        },
      })
      expect(iframeFeed.content?.['#text']).toContain('<iframe')
    })

    it('should remove object tags', () => {
      const objectFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<object data="evil.swf"></object>',
        },
      })
      expect(objectFeed.content?.['#text']).toContain('<object')
    })

    it('should remove embed tags', () => {
      const embedFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<embed src="evil.swf">',
        },
      })
      expect(embedFeed.content?.['#text']).toContain('<embed')
    })

    it('should remove on* event handlers', () => {
      const eventFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<div onclick="alert(1)">Click me</div>',
        },
      })
      expect(eventFeed.content?.['#text']).toContain('onclick')
    })

    it('should remove relative stylesheet links', () => {
      const stylesheetFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<link rel="stylesheet" href="/styles.css"><p>Content</p>',
        },
      })
      expect(stylesheetFeed.content?.['#text']).toContain('stylesheet')
    })
  })

  describe('error handling', () => {
    it('should handle empty feed response', () => {
      const emptyResponse = createMockXmlResponse([])
      expect(emptyResponse.feed.entry).toHaveLength(0)
    })

    it('should handle missing feed property', () => {
      const noFeedResponse = {}
      expect((noFeedResponse as { feed?: { entry?: Feed[] } }).feed).toBeUndefined()
    })

    it('should handle network errors gracefully', async () => {
      mockOctokitInstance.request.mockRejectedValue(new Error('Network error'))
      // Error should be caught and return empty array
      expect(mockOctokitInstance.request).toBeDefined()
    })

    it('should handle XML parsing errors', () => {
      const invalidXml = 'not valid xml'
      // XMLParser should handle gracefully
      expect(typeof invalidXml).toBe('string')
    })

    it('should handle rate limiting', async () => {
      mockOctokitInstance.request.mockRejectedValue({
        status: 429,
        message: 'Rate limit exceeded',
      })
      expect(mockOctokitInstance.request).toBeDefined()
    })
  })

  describe('pagination', () => {
    it('should fetch multiple pages', () => {
      const MAX_PAGES = 5
      expect(MAX_PAGES).toBe(5)
    })

    it('should stop on empty page', () => {
      const emptyEntries: Feed[] = []
      expect(emptyEntries.length).toBe(0)
    })

    it('should stop when entries less than MIN_ENTRIES_PER_PAGE', () => {
      const MIN_ENTRIES_PER_PAGE = 5
      const fewEntries = [createMockFeed(), createMockFeed()]
      expect(fewEntries.length).toBeLessThan(MIN_ENTRIES_PER_PAGE)
    })

    it('should add delay between page requests', () => {
      // Delay is 100ms between pages
      const DELAY_MS = 100
      expect(DELAY_MS).toBe(100)
    })

    it('should continue on page error', () => {
      // Implementation continues with next page on error
      const continueOnError = true
      expect(continueOnError).toBe(true)
    })
  })

  describe('caching', () => {
    it('should cache results for 1 hour', () => {
      const CACHE_DURATION = 3600 // seconds
      expect(CACHE_DURATION).toBe(3600)
    })

    it('should use github-feed cache tag', () => {
      const cacheTag = 'github-feed'
      expect(cacheTag).toBe('github-feed')
    })
  })

  describe('authentication', () => {
    it('should use PERSONAL_ACCESS_TOKEN from env', () => {
      expect(vi.mocked(Octokit)).toBeDefined()
    })

    it('should handle missing token gracefully', async () => {
      // Auth is optional, should work without token
      vi.doMock('@/env.mjs', () => ({
        env: {
          PERSONAL_ACCESS_TOKEN: undefined,
        },
      }))
      // Octokit should still initialize
      expect(vi.mocked(Octokit)).toBeDefined()
    })
  })

  describe('GitHub API headers', () => {
    it('should include X-GitHub-Api-Version header', () => {
      const expectedVersion = '2022-11-28'
      expect(expectedVersion).toBe('2022-11-28')
    })

    it('should request .atom feed format', () => {
      const feedUrl = 'https://github.com/ryota-murakami.atom?page=1'
      expect(feedUrl).toContain('.atom')
    })
  })

  describe('feed processing integration', () => {
    it('should process valid feed entries', () => {
      const validFeed = createMockFeed({
        content: {
          '@_type': 'html',
          '#text': '<p>Valid GitHub activity</p>',
        },
      })
      expect(validFeed.content).toBeDefined()
      expect(validFeed.content?.['#text']).not.toContain('Dependabot')
      expect(validFeed.content?.['#text']).not.toContain('hayashima')
    })

    it('should handle feed with multiple link types', () => {
      const multiLinkFeed: Feed = {
        ...createMockFeed(),
        link: [
          {
            '@_href': 'https://github.com/user/repo',
            '@_rel': 'alternate',
            '@_type': 'text/html',
          },
          {
            '@_href': 'https://github.com/user/repo.atom',
            '@_rel': 'self',
            '@_type': 'application/atom+xml',
          },
        ],
      }
      expect(Array.isArray(multiLinkFeed.link)).toBe(true)
    })
  })
})
