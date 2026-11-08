import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { describe, expect, test } from 'vitest'

import { catalogs } from '@/i18n/catalogs'
import en from '@/i18n/messages/en'

import { KEYBIND_GROUPS } from './keybinds'
import KeybindsClient from './KeybindsClient'

function renderSheet(locale: 'en' | 'ja'): HTMLElement {
  return render(
    <NextIntlClientProvider locale={locale} messages={catalogs[locale]}>
      <KeybindsClient groups={KEYBIND_GROUPS} />
    </NextIntlClientProvider>,
  ).container
}

describe('keybinds cheat sheet', () => {
  test('keeps the pre-localization #anchors in Japanese, so shared links still scroll to the right section', () => {
    // Arrange
    const container = renderSheet('ja')

    // Act
    const anchors = [...container.querySelectorAll('h2[id], h3[id]')].map(
      (heading) => heading.id,
    )
    const hrefs = [...container.querySelectorAll('h2 a, h3 a')].map((link) =>
      link.getAttribute('href'),
    )

    // Assert
    expect(anchors).toEqual([
      'raycast',
      'chrome',
      'editor',
      'move-cursor',
      'selection',
      'scroll',
      'code-edit',
      'find',
      'split-editor-window',
      'code-jump',
      'intellisense',
      'file-explorer',
      'ide-feature',
      'ai',
      'multiple-cursor',
    ])
    expect(hrefs).toEqual(anchors.map((id) => `#${id}`))
    expect(screen.getByRole('link', { name: 'カーソル移動' })).toHaveAttribute(
      'href',
      '#move-cursor',
    )
  })

  test('shows every action label in the catalog, so no translated shortcut is left off the page', () => {
    // Arrange
    const container = renderSheet('en')

    // Act
    const rendered = [...container.querySelectorAll('th[scope="row"]')]
      .map((cell) => cell.textContent)
      .sort()

    // Assert
    expect(rendered).toEqual(Object.values(en.pages.keybinds.actions).sort())
  })
})
