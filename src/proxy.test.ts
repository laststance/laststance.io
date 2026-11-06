import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server'
import { describe, expect, test, vi } from 'vitest'

import { routing } from './i18n/routing'
import { config } from './proxy'

// next-intl's middleware imports `next/server` without an extension, which Node ESM cannot resolve; only the matcher is under test.
vi.mock('next-intl/middleware', () => ({ default: () => () => undefined }))

describe('proxy matcher', () => {
  for (const locale of routing.locales) {
    test(`switching to ${locale} on an article whose slug has a dot reaches the proxy, so the address bar drops /${locale}`, () => {
      // Arrange
      const url = `/${locale}/articles/a@v1.2.3`

      // Act
      const matches = unstable_doesMiddlewareMatch({ config, url })

      // Assert
      expect(matches).toBe(true)
    })
  }

  for (const url of ['/about', '/ja/about', '/articles/a@v1.2.3']) {
    test(`runs the proxy for the page ${url}, so it gets a language`, () => {
      // Act
      const matches = unstable_doesMiddlewareMatch({ config, url })

      // Assert
      expect(matches).toBe(true)
    })
  }

  for (const url of ['/_next/static/x.js', '/api/x', '/favicon.ico']) {
    test(`leaves ${url} alone, so assets and API routes are never rewritten into a locale`, () => {
      // Act
      const matches = unstable_doesMiddlewareMatch({ config, url })

      // Assert
      expect(matches).toBe(false)
    })
  }
})
