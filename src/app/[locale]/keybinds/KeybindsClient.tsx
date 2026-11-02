import { useTranslations } from 'next-intl'

import { KBD } from '@/components/KBD'
import { Text } from '@/components/ui/primitives'

import type { KeybindGroup, KeybindRow } from './keybinds'

/**
 * Shows an action and its keys without forcing the page wider on small screens.
 * Called by {@link KeybindTable} for each shortcut.
 * @example
 * renderKeybindRow({ action: 'copy', keys: 'CMD C' }, 'Copy')
 */
const renderKeybindRow = (row: KeybindRow, label: string) => (
  <tr
    key={row.action}
    className="border-b border-zinc-200 dark:border-zinc-800"
  >
    <th
      scope="row"
      className="w-3/5 py-3 pr-4 text-left align-top text-sm leading-6 font-normal wrap-anywhere text-zinc-700 sm:text-base dark:text-zinc-300"
    >
      {label}
    </th>
    <td className="py-3 align-top">
      <div className="flex flex-wrap gap-1.5">
        {row.keys.split(' ').map((key, index) => (
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
 * <KeybindTable label="Chrome" rows={[{ action: 'duplicateTab', keys: 'CMD D' }]} />
 */
function KeybindTable({
  label,
  rows,
}: {
  label: string
  rows: readonly KeybindRow[]
}) {
  const t = useTranslations('pages.keybinds')
  return (
    <table
      aria-label={t('tableLabel', { label })}
      className="w-full table-fixed border-collapse"
    >
      <tbody>
        {rows.map((row) => renderKeybindRow(row, t(`actions.${row.action}`)))}
      </tbody>
    </table>
  )
}

/**
 * Renders the keybind cheat sheet: an `<h2>` per group and an `<h3>` per
 * subgroup, each heading a self-link to `#${id}`.
 *
 * A Server Component despite its name. The keybinds page renders it with
 * {@link KEYBIND_GROUPS}; headings and action labels come from the catalog while
 * the anchor ids stay the same in every language.
 *
 * @example
 * ```tsx
 * <KeybindsClient groups={KEYBIND_GROUPS} />
 * ```
 */
export default function KeybindsClient({
  groups,
}: {
  groups: readonly KeybindGroup[]
}) {
  const t = useTranslations('pages.keybinds')
  return (
    <div className="content-column section-stack">
      {groups.map((group) => {
        const label = t(`groups.${group.id}`)
        return (
          <section key={group.id} aria-labelledby={group.id}>
            <Text
              as="h2"
              variant="h2"
              id={group.id}
              className="mb-6 scroll-mt-8"
            >
              <a
                href={`#${group.id}`}
                className="hover:text-teal-700 dark:hover:text-teal-400"
              >
                {label}
              </a>
            </Text>
            {group.rows.length > 0 && (
              <KeybindTable label={label} rows={group.rows} />
            )}
            <div className="space-y-8">
              {group.subgroups.map((subgroup) => {
                const subgroupLabel = t(`groups.${subgroup.id}`)
                return (
                  <section key={subgroup.id} aria-labelledby={subgroup.id}>
                    <Text
                      as="h3"
                      variant="h3"
                      id={subgroup.id}
                      className="mb-3 scroll-mt-8"
                    >
                      <a
                        href={`#${subgroup.id}`}
                        className="hover:text-teal-700 dark:hover:text-teal-400"
                      >
                        {subgroupLabel}
                      </a>
                    </Text>
                    <KeybindTable label={subgroupLabel} rows={subgroup.rows} />
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
