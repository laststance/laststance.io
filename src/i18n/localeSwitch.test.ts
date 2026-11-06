import { describe, expect, test } from 'vitest'

import { buildLocaleSwitchHref, readChosenLocale } from './localeSwitch'

describe('buildLocaleSwitchHref', () => {
  test('switching on /about asks the server for /ja/about', () => {
    // Act
    const href = buildLocaleSwitchHref('ja', {
      pathname: '/about',
      search: '',
      hash: '',
    })

    // Assert
    expect(href).toBe('/ja/about')
  })

  test('switching on the home page asks for /en without a trailing slash, so it lands on /', () => {
    // Act
    const href = buildLocaleSwitchHref('en', {
      pathname: '/',
      search: '',
      hash: '',
    })

    // Assert
    expect(href).toBe('/en')
  })

  test('switching keeps the page number and the anchor the visitor was on', () => {
    // Act
    const href = buildLocaleSwitchHref('ja', {
      pathname: '/articles',
      search: '?page=2',
      hash: '#latest',
    })

    // Assert
    expect(href).toBe('/ja/articles?page=2#latest')
  })
})

describe('readChosenLocale', () => {
  test('finds the language picked in the header among other cookies', () => {
    // Act
    const chosen = readChosenLocale('theme=dark; NEXT_LOCALE=ja; other=1')

    // Assert
    expect(chosen).toBe('ja')
  })

  test('reports no choice for a visitor who never used the switch', () => {
    // Act
    const chosen = readChosenLocale('theme=dark')

    // Assert
    expect(chosen).toBeUndefined()
  })

  test('ignores an unsupported language in the cookie, so the page is never reloaded for it', () => {
    // Act
    const chosen = readChosenLocale('NEXT_LOCALE=fr')

    // Assert
    expect(chosen).toBeUndefined()
  })

  test('does not mistake a cookie whose name only ends in NEXT_LOCALE for the choice', () => {
    // Act
    const chosen = readChosenLocale('OLD_NEXT_LOCALE=ja')

    // Assert
    expect(chosen).toBeUndefined()
  })
})
