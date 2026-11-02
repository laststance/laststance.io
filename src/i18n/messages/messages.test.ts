import { createTranslator, type IntlError } from 'next-intl'
import { describe, expect, test } from 'vitest'

import en from './en'
import ja from './ja'

// Missing or extra keys are already a tsc error (`ja.ts` satisfies CatalogShape).
// These tests check what tsc cannot see inside the strings.

const catalogs = { en, ja }

/** Flattens a catalog into `['Nav.about', 'About']` pairs. */
function leaves(node: object, prefix = ''): Array<[string, string]> {
  return Object.entries(node).flatMap(([key, value]) =>
    typeof value === 'string'
      ? [[`${prefix}${key}`, value] as [string, string]]
      : leaves(value as object, `${prefix}${key}.`),
  )
}

/** Sorted `{name}` placeholders and `<tag>` names; ICU-quoted `'{…}'` is literal text. */
function icuSlots(message: string): { args: string[]; tags: string[] } {
  const unquoted = message.replace(/'[{}<][^']*'/g, '')
  const args = [...unquoted.matchAll(/\{\s*(\w+)\s*\}/g)].map((m) => m[1])
  const tags = [...unquoted.matchAll(/<(\w+)>/g)].map((m) => m[1])
  return { args: [...new Set(args)].sort(), tags: [...new Set(tags)].sort() }
}

describe('message catalogs', () => {
  test('Japanese keeps every placeholder and rich tag from English, so links, line breaks and numbers still render', () => {
    // Arrange
    const japanese = new Map(leaves(ja))

    // Act
    const drifted = leaves(en)
      .map(([key, english]) => ({
        key,
        en: icuSlots(english),
        ja: icuSlots(japanese.get(key) ?? ''),
      }))
      .filter((slots) => JSON.stringify(slots.en) !== JSON.stringify(slots.ja))

    // Assert
    expect(drifted).toEqual([])
  })

  test.each(['en', 'ja'] as const)(
    'every %s message formats without ICU errors, so no page falls back to a raw key',
    (locale) => {
      // Arrange
      const errors: string[] = []
      const t = createTranslator({
        locale,
        messages: catalogs[locale],
        onError: (error: IntlError) => errors.push(error.message),
      })

      // Act
      for (const [key, english] of leaves(en)) {
        const { args, tags } = icuSlots(english)
        const values = Object.fromEntries([
          ...args.map((name) => [name, 'x']),
          ...tags.map((name) => [name, (chunks: string) => chunks]),
        ])
        // Keys come from the flattened catalog, so the static key type cannot apply.
        t.markup(key as never, values as never)
      }

      // Assert
      expect(errors).toEqual([])
    },
  )

  test('no message uses a self-closing tag, which ICU would print as literal "<br/>" text', () => {
    // Arrange
    const messages = [...leaves(en), ...leaves(ja)]

    // Act
    const selfClosing = messages.filter(([, message]) =>
      /<\w+\s*\/>/.test(message),
    )

    // Assert
    expect(selfClosing).toEqual([])
  })
})
