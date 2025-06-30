'use client'

import { KBD } from '@/components/KBD'
import { Spacer } from '@/components/Spacer'

interface KeybindsList {
  [category: string]: Record<string, string>
}

interface KeybindsClientProps {
  keybinds: KeybindsList
}

const createAnchorId = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, '-')
}

export default function KeybindsClient({ keybinds }: KeybindsClientProps) {
  return (
    <div className="w-full sm:w-[400px] lg:w-[600px] mx-auto">
      {Object.keys(keybinds).map((category) => (
        <div key={category}>
          <Spacer size="h-3xs" />
          <button
            id={createAnchorId(category)}
            className="w-full text-left font-bold text-xl pb-3 border-b border-gray-300 cursor-pointe focus:outline-none"
            aria-label={`Navigate to ${category} section`}
            onClick={() => {
              const id = createAnchorId(category)
              window.history.pushState(null, '', `#${id}`)
              const element = document.getElementById(id)
              element?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
          >
            <h2 className="inline hover:text-gray-600 transition-colors">
              {category}
            </h2>
          </button>
          <table className="min-w-full border-collapse">
            <tbody>
              {Object.entries(keybinds[category]).map(([action, shortcut]) => (
                <tr key={action}>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {action}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <div className="flex gap-2">
                      {shortcut.split(' ').map((key, i) => {
                        return <KBD key={i} keyName={key} variant="small" />
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
