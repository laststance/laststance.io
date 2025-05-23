import type React from 'react'

import { cn } from '@/lib/utils'

export interface KBDProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The name of the key to display
   */
  keyName: string
  /**
   * Optional variant for styling
   */
  variant?: 'default' | 'small'
  /**
   * Optional border radius
   */
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * KBD component for displaying keyboard keys
 */
export const KBD = ({
  keyName,
  variant = 'default',
  borderRadius = 'md',
  className,
  ...props
}: KBDProps) => {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center px-2 py-1 text-base font-semibold',
        `rounded-${borderRadius} border-zinc-200`,
        'min-w-[36px] text-center',
        'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 shadow-sm',
        variant === 'small' && 'text-sm px-1.5 py-0.5 min-w-[28px]',
        className,
      )}
      aria-label={`Keyboard key: ${keyName}`}
      {...props}
    >
      {keyName}
    </kbd>
  )
}
