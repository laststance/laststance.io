'use client'

import { KBD } from '@/components/KBD'
import { Spacer } from '@/components/Spacer'

import type { KeybindsList } from './page'

interface KeybindsClientProps {
  keybinds: KeybindsList
}

const createAnchorId = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '-')
}

/**
 * Handles scrolling to a section by updating the URL hash and scrolling to the element.
 * @param sectionName - The name of the section to scroll to (category or subcategory name)
 * @example
 * handleScrollToSection('Editor') // Scrolls to #editor
 * handleScrollToSection('Move Cursor') // Scrolls to #move-cursor
 */
const handleScrollToSection = (sectionName: string) => {
  const id = createAnchorId(sectionName)
  window.history.pushState(null, '', `#${id}`)
  const element = document.getElementById(id)
  element?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

/**
 * Renders a keybind entry row.
 * @param action - The action name
 * @param shortcut - The keyboard shortcut string
 */
const renderKeybindRow = (action: string, shortcut: string) => (
  <tr key={action}>
    <td className="py-2 px-4 border-b border-gray-300">{action}</td>
    <td className="py-2 px-4 border-b border-gray-300">
      <div className="flex gap-2">
        {shortcut.split(' ').map((key, i) => (
          <KBD key={i} keyName={key} variant="small" />
        ))}
      </div>
    </td>
  </tr>
)

/**
 * Renders a nested keybind category (subcategory) as a section with h2 heading.
 * @param subcategoryName - The name of the subcategory
 * @param subcategoryData - The keybind entries in this subcategory
 */
const renderNestedCategorySection = (
  subcategoryName: string,
  subcategoryData: Record<string, string>,
) => (
  <div key={subcategoryName}>
    <Spacer size="h-3xs" />
    <button
      id={createAnchorId(subcategoryName)}
      className="w-full text-left font-bold text-xl pb-3 border-b border-gray-300 cursor-pointe focus:outline-none"
      aria-label={`Navigate to ${subcategoryName} section`}
      onClick={() => handleScrollToSection(subcategoryName)}
    >
      <h2 className="inline hover:text-gray-600 transition-colors">
        {subcategoryName}
      </h2>
    </button>
    <table className="min-w-full border-collapse">
      <tbody>
        {Object.entries(subcategoryData).map(([action, shortcut]) =>
          renderKeybindRow(action, shortcut),
        )}
      </tbody>
    </table>
  </div>
)

/**
 * Checks if a category has nested subcategories.
 * @param categoryData - The category data to check
 * @returns True if the category has nested subcategories, false otherwise
 */
const hasNestedSubcategories = (
  categoryData: Record<string, string | Record<string, string>>,
): boolean => {
  return Object.values(categoryData).some((value) => isNestedCategory(value))
}

/**
 * Checks if a value is a nested keybind category (object) or a leaf keybind (string).
 * @param value - The value to check
 * @returns True if the value is a nested category object, false if it's a string shortcut
 */
const isNestedCategory = (
  value: string | Record<string, string>,
): value is Record<string, string> => {
  return typeof value === 'object' && value !== null
}

export default function KeybindsClient({ keybinds }: KeybindsClientProps) {
  return (
    <div className="w-full sm:w-100 lg:w-150 mx-auto">
      {Object.keys(keybinds).map((category) => {
        const categoryData = keybinds[category]
        const hasNested = hasNestedSubcategories(categoryData)

        return (
          <div key={category}>
            <Spacer size="h-3xs" />
            <button
              id={createAnchorId(category)}
              className="w-full text-left font-bold text-2xl pb-3 border-b border-gray-300 cursor-pointe focus:outline-none"
              aria-label={`Navigate to ${category} section`}
              onClick={() => handleScrollToSection(category)}
            >
              <h1 className="inline hover:text-gray-600 transition-colors">
                {category}
              </h1>
            </button>
            {hasNested ? (
              // Category with nested subcategories: render subcategories as separate sections
              <>
                {Object.entries(categoryData).map(([subcategory, value]) => {
                  if (isNestedCategory(value)) {
                    return renderNestedCategorySection(subcategory, value)
                  }
                  return null
                })}
              </>
            ) : (
              // Category without nested subcategories: render flat structure
              <table className="min-w-full border-collapse">
                <tbody>
                  {Object.entries(categoryData).map(([action, value]) => {
                    if (isNestedCategory(value)) {
                      // This shouldn't happen for categories without nested subcategories, but handle it gracefully
                      return null
                    }
                    return renderKeybindRow(action, value)
                  })}
                </tbody>
              </table>
            )}
          </div>
        )
      })}
    </div>
  )
}
