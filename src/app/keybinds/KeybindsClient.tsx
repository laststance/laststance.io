import { KBD } from '@/components/KBD'
import { Text } from '@/components/ui/primitives'

import type { KeybindsList } from './page'

/**
 * Keeps section links stable for shared and saved shortcut URLs.
 * Called by the category headings when the keybind table renders.
 * @example
 * createAnchorId('Move Cursor') // 'move-cursor'
 */
const createAnchorId = (text: string): string =>
  text.toLowerCase().replace(/\s+/g, '-')

/**
 * Shows an action and its keys without forcing the page wider on small screens.
 * Called by {@link KeybindTable} for each shortcut.
 * @example
 * renderKeybindRow('Copy', 'CMD C')
 */
const renderKeybindRow = (action: string, shortcut: string) => (
  <tr key={action} className="border-b border-zinc-200 dark:border-zinc-800">
    <th
      scope="row"
      className="w-3/5 py-3 pr-4 text-left align-top text-sm leading-6 font-normal wrap-anywhere text-zinc-700 sm:text-base dark:text-zinc-300"
    >
      {action}
    </th>
    <td className="py-3 align-top">
      <div className="flex flex-wrap gap-1.5">
        {shortcut.split(' ').map((key, index) => (
          <KBD key={index} keyName={key} variant="small" />
        ))}
      </div>
    </td>
  </tr>
)

/**
 * Gives each keybind group a named table with a fixed, wrapping column layout.
 * Used for both top-level and Editor shortcut groups.
 * @example
 * <KeybindTable label="Chrome" entries={{ 'Duplicate tab': 'CMD D' }} />
 */
function KeybindTable({
  label,
  entries,
}: {
  label: string
  entries: Record<string, string>
}) {
  return (
    <table
      aria-label={`${label} shortcuts`}
      className="w-full table-fixed border-collapse"
    >
      <tbody>
        {Object.entries(entries).map(([action, shortcut]) =>
          renderKeybindRow(action, shortcut),
        )}
      </tbody>
    </table>
  )
}

export default function KeybindsClient({
  keybinds,
}: {
  keybinds: KeybindsList
}) {
  return (
    <div className="content-column section-stack">
      {Object.entries(keybinds).map(([category, entries]) => {
        const flatEntries = Object.fromEntries(
          Object.entries(entries).filter(
            (entry): entry is [string, string] => typeof entry[1] === 'string',
          ),
        )
        return (
          <section key={category} aria-labelledby={createAnchorId(category)}>
            <Text
              as="h2"
              variant="h2"
              id={createAnchorId(category)}
              className="mb-6 scroll-mt-8"
            >
              <a
                href={`#${createAnchorId(category)}`}
                className="hover:text-teal-700 dark:hover:text-teal-400"
              >
                {category}
              </a>
            </Text>
            {Object.keys(flatEntries).length > 0 && (
              <KeybindTable label={category} entries={flatEntries} />
            )}
            <div className="space-y-8">
              {Object.entries(entries).map(([subcategory, value]) => {
                // Flat entries already appear in the category table above.
                if (typeof value === 'string') return null
                return (
                  <section
                    key={subcategory}
                    aria-labelledby={createAnchorId(subcategory)}
                  >
                    <Text
                      as="h3"
                      variant="h3"
                      id={createAnchorId(subcategory)}
                      className="mb-3 scroll-mt-8"
                    >
                      <a
                        href={`#${createAnchorId(subcategory)}`}
                        className="hover:text-teal-700 dark:hover:text-teal-400"
                      >
                        {subcategory}
                      </a>
                    </Text>
                    <KeybindTable label={subcategory} entries={value} />
                  </section>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
