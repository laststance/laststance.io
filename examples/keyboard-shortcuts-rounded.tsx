import React from 'react'

import { KBD } from '@/components/Kbd'

export default function KeyboardShortcutsRounded() {
  const shortcuts = [
    { action: 'Copy', keys: ['Ctrl', 'C'] },
    { action: 'Paste', keys: ['Ctrl', 'V'] },
    { action: 'Cut', keys: ['Ctrl', 'X'] },
    { action: 'Save', keys: ['Ctrl', 'S'] },
    { action: 'Find', keys: ['Ctrl', 'F'] },
    { action: 'Select All', keys: ['Ctrl', 'A'] },
  ]

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Keyboard Shortcuts with Rounded Keys
      </h2>
      <ul className="space-y-2">
        {shortcuts.map((shortcut) => (
          <li
            key={shortcut.action}
            className="flex justify-between items-center"
          >
            <span>{shortcut.action}</span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, index) => (
                <React.Fragment key={key}>
                  <KBD keyName={key} borderRadius="lg" />
                  {index < shortcut.keys.length - 1 && (
                    <span className="mx-1">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">
          Different Border Radius Examples
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-24">Small:</span>
            <KBD keyName="Tab" borderRadius="sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-24">Medium:</span>
            <KBD keyName="Tab" borderRadius="md" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-24">Large:</span>
            <KBD keyName="Tab" borderRadius="lg" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-24">Extra Large:</span>
            <KBD keyName="Tab" borderRadius="xl" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-24">Full (pill):</span>
            <KBD keyName="Tab" borderRadius="full" />
          </div>
        </div>
      </div>
    </div>
  )
}
