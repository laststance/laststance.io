'use client'

import React from 'react'

/**
 * Removes browser extension attributes that cause hydration mismatches.
 * Extensions like ColorZilla add `cz-shortcut-listen` to the body before React hydrates,
 * causing a mismatch between server-rendered HTML and client DOM.
 *
 * @returns A script element that removes problematic attributes
 * @example
 * // In layout.tsx
 * <body>
 *   <HydrationFix />
 *   {children}
 * </body>
 */
export function HydrationFix(): React.JSX.Element {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Remove cz-shortcut-listen attribute added by ColorZilla extension
            if (document.body.hasAttribute('cz-shortcut-listen')) {
              document.body.removeAttribute('cz-shortcut-listen');
            }
            
            // Watch for future additions and remove them
            var observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                if (
                  mutation.type === 'attributes' &&
                  mutation.attributeName === 'cz-shortcut-listen'
                ) {
                  document.body.removeAttribute('cz-shortcut-listen');
                }
              });
            });
            
            observer.observe(document.body, {
              attributes: true,
              attributeFilter: ['cz-shortcut-listen']
            });
          })();
        `,
      }}
    />
  )
}

