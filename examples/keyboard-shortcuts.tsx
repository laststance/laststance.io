import React from 'react'

import { KBD } from '@/components/Kbd'

export default function KeyboardShortcuts() {
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
      <h2 className="text-xl font-bold mb-4">Common Keyboard Shortcuts</h2>
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
                  <KBD keyName={key} />
                  {index < shortcut.keys.length - 1 && (
                    <span className="mx-1">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
