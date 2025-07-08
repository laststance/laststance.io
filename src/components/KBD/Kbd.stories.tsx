import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Fragment } from 'react'

import { KBD } from './Kbd'

const meta: Meta<typeof KBD> = {
  title: 'components/KBD',
  component: KBD,
  parameters: {
    docs: {
      description: {
        component:
          'KBD component for displaying keyboard keys with various styling options.',
      },
    },
  },
  argTypes: {
    keyName: {
      control: 'text',
      description: 'The name of the key to display',
    },
    variant: {
      control: 'radio',
      options: ['default', 'small'],
      description: 'Optional variant for styling',
    },
    borderRadius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Optional border radius',
    },
  },
}

export default meta

type Story = StoryObj<typeof KBD>

export const Default: Story = {
  args: {
    keyName: 'Tab',
  },
}

export const Small: Story = {
  args: {
    keyName: 'Tab',
    variant: 'small',
  },
}

// Border Radius Variants
export const BorderRadiusSmall: Story = {
  args: {
    keyName: 'Tab',
    borderRadius: 'sm',
  },
}

export const BorderRadiusMedium: Story = {
  args: {
    keyName: 'Tab',
    borderRadius: 'md',
  },
}

export const BorderRadiusLarge: Story = {
  args: {
    keyName: 'Tab',
    borderRadius: 'lg',
  },
}

export const BorderRadiusXLarge: Story = {
  args: {
    keyName: 'Tab',
    borderRadius: 'xl',
  },
}

export const BorderRadiusFull: Story = {
  args: {
    keyName: 'Tab',
    borderRadius: 'full',
  },
}

// Common Keys
export const SingleKeys: Story = {
  decorators: [
    () => (
      <div className="flex flex-wrap gap-2">
        <KBD keyName="A" />
        <KBD keyName="1" />
        <KBD keyName="!" />
        <KBD keyName="→" />
        <KBD keyName="Space" />
        <KBD keyName="Enter" />
        <KBD keyName="Esc" />
        <KBD keyName="Tab" />
      </div>
    ),
  ],
}

export const ModifierKeys: Story = {
  decorators: [
    () => (
      <div className="flex flex-wrap gap-2">
        <KBD keyName="Ctrl" />
        <KBD keyName="Alt" />
        <KBD keyName="Shift" />
        <KBD keyName="Cmd" />
        <KBD keyName="Win" />
        <KBD keyName="Fn" />
      </div>
    ),
  ],
}

// Keyboard Shortcuts Example (based on examples/keyboard-shortcuts.tsx)
export const KeyboardShortcuts: Story = {
  decorators: [
    () => {
      const shortcuts = [
        { action: 'Copy', keys: ['Ctrl', 'C'] },
        { action: 'Paste', keys: ['Ctrl', 'V'] },
        { action: 'Cut', keys: ['Ctrl', 'X'] },
        { action: 'Save', keys: ['Ctrl', 'S'] },
        { action: 'Find', keys: ['Ctrl', 'F'] },
        { action: 'Select All', keys: ['Ctrl', 'A'] },
      ]

      return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            Common Keyboard Shortcuts
          </h2>
          <ul className="space-y-2">
            {shortcuts.map((shortcut) => (
              <li
                key={shortcut.action}
                className="flex justify-between items-center"
              >
                <span className="dark:text-gray-200">{shortcut.action}</span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, index) => (
                    <Fragment key={key}>
                      <KBD keyName={key} />
                      {index < shortcut.keys.length - 1 && (
                        <span className="mx-1 dark:text-gray-200">+</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    },
  ],
}

// Border Radius Showcase (based on examples/keyboard-shortcuts-rounded.tsx)
export const BorderRadiusShowcase: Story = {
  decorators: [
    () => (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Keyboard Shortcuts with Rounded Keys
        </h2>
        <ul className="space-y-2 mb-8">
          {[
            { action: 'Copy', keys: ['Ctrl', 'C'] },
            { action: 'Paste', keys: ['Ctrl', 'V'] },
            { action: 'Cut', keys: ['Ctrl', 'X'] },
          ].map((shortcut) => (
            <li
              key={shortcut.action}
              className="flex justify-between items-center"
            >
              <span className="dark:text-gray-200">{shortcut.action}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, index) => (
                  <Fragment key={key}>
                    <KBD keyName={key} borderRadius="lg" />
                    {index < shortcut.keys.length - 1 && (
                      <span className="mx-1 dark:text-gray-200">+</span>
                    )}
                  </Fragment>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <div className="p-4 bg-gray-100 dark:bg-zinc-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 dark:text-white">
            Different Border Radius Examples
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-24 dark:text-gray-200">Small:</span>
              <KBD keyName="Tab" borderRadius="sm" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 dark:text-gray-200">Medium:</span>
              <KBD keyName="Tab" borderRadius="md" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 dark:text-gray-200">Large:</span>
              <KBD keyName="Tab" borderRadius="lg" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 dark:text-gray-200">Extra Large:</span>
              <KBD keyName="Tab" borderRadius="xl" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 dark:text-gray-200">Full (pill):</span>
              <KBD keyName="Tab" borderRadius="full" />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
}

// Variant Comparison
export const VariantComparison: Story = {
  decorators: [
    () => (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            Default Variant
          </h3>
          <div className="flex gap-2">
            <KBD keyName="Ctrl" />
            <span className="self-center dark:text-gray-200">+</span>
            <KBD keyName="C" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            Small Variant
          </h3>
          <div className="flex gap-2">
            <KBD keyName="Ctrl" variant="small" />
            <span className="self-center dark:text-gray-200">+</span>
            <KBD keyName="C" variant="small" />
          </div>
        </div>
      </div>
    ),
  ],
}

// Comprehensive Showcase
export const Showcase: Story = {
  decorators: [
    () => (
      <div className="space-y-8 max-w-2xl mx-auto p-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 dark:text-white">
            KBD Component Showcase
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            A comprehensive display of the KBD component's capabilities
            including variants, border radius options, and practical usage
            examples.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 dark:text-white">
            Border Radius Options
          </h3>
          <div className="flex flex-wrap gap-2">
            <KBD keyName="sm" borderRadius="sm" />
            <KBD keyName="md" borderRadius="md" />
            <KBD keyName="lg" borderRadius="lg" />
            <KBD keyName="xl" borderRadius="xl" />
            <KBD keyName="full" borderRadius="full" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 dark:text-white">
            Size Variants
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="dark:text-gray-200">Default:</span>
              <KBD keyName="Enter" />
            </div>
            <div className="flex items-center gap-2">
              <span className="dark:text-gray-200">Small:</span>
              <KBD keyName="Enter" variant="small" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 dark:text-white">
            Common Usage Patterns
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-32 dark:text-gray-200">Navigation:</span>
              <KBD keyName="←" />
              <KBD keyName="↑" />
              <KBD keyName="↓" />
              <KBD keyName="→" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-32 dark:text-gray-200">Function keys:</span>
              <KBD keyName="F1" variant="small" />
              <KBD keyName="F2" variant="small" />
              <KBD keyName="F12" variant="small" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-32 dark:text-gray-200">Special keys:</span>
              <KBD keyName="Space" />
              <KBD keyName="Tab" />
              <KBD keyName="Esc" />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
}
