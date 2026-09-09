import { describe, test, expect } from 'vitest'

import { stripTrailingSlash } from './stripTrailingSlash'

describe('stripTrailingSlash', () => {
  test('keeps sitemap and feed URLs free of a doubled separator', () => {
    // Arrange
    const configuredSiteUrl = 'https://laststance.io/'

    // Act
    const articleUrl = `${stripTrailingSlash(configuredSiteUrl)}/articles/my-post`

    // Assert
    expect(articleUrl).toBe('https://laststance.io/articles/my-post')
  })

  test('leaves a URL without a trailing slash untouched', () => {
    // Arrange
    const configuredSiteUrl = 'https://laststance.io'

    // Act
    const normalized = stripTrailingSlash(configuredSiteUrl)

    // Assert
    expect(normalized).toBe('https://laststance.io')
  })

  test('collapses repeated trailing slashes from a mistyped setting', () => {
    // Arrange
    const configuredSiteUrl = 'https://laststance.io///'

    // Act
    const normalized = stripTrailingSlash(configuredSiteUrl)

    // Assert
    expect(normalized).toBe('https://laststance.io')
  })

  test('preserves slashes inside the path', () => {
    // Arrange
    const configuredSiteUrl = 'https://laststance.io/blog/'

    // Act
    const normalized = stripTrailingSlash(configuredSiteUrl)

    // Assert
    expect(normalized).toBe('https://laststance.io/blog')
  })
})
