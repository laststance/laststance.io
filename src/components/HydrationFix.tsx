'use client'

import React from 'react'

/**
 * Removes browser extension artifacts that cause hydration mismatches.
 * Extensions inject DOM elements/attributes before React hydrates,
 * causing a mismatch between server-rendered HTML and client DOM.
 *
 * Handled extensions:
 * - ColorZilla: `cz-shortcut-listen` attribute on body
 * - Grammarly: `<grammarly-desktop-integration>` and `data-gr-*` attributes
 * - Dark Reader: `<style class="darkreader">` and `<meta name="darkreader">`
 * - Google Translate: `<font>` wrappers and `translated-*` classes on html
 * - LastPass/1Password: `data-lastpass-*`, `data-1p-*` attributes
 * - Bitdefender: `data-bf-*` attributes
 *
 * @returns A script element that removes problematic artifacts before hydration
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
            var body = document.body;
            var html = document.documentElement;

            // --- Attribute cleanup ---
            var attrsToRemove = [
              'cz-shortcut-listen',
              'data-new-gr-c-s-check-loaded',
              'data-gr-ext-installed',
              'data-gr-ext-disabled',
              'data-lastpass-icon-root',
              'data-lt-installed'
            ];
            attrsToRemove.forEach(function(attr) {
              body.removeAttribute(attr);
            });

            // Remove data-prefix attributes from extensions (data-1p-*, data-bf-*, etc.)
            var prefixes = ['data-1p-', 'data-bf-', 'data-gr-', 'data-lastpass-'];
            Array.from(body.attributes).forEach(function(attr) {
              for (var i = 0; i < prefixes.length; i++) {
                if (attr.name.indexOf(prefixes[i]) === 0) {
                  body.removeAttribute(attr.name);
                  break;
                }
              }
            });

            // Remove Google Translate classes from html element
            ['translated-ltr', 'translated-rtl'].forEach(function(cls) {
              html.classList.remove(cls);
            });

            // --- Element cleanup ---
            var selectorsToRemove = [
              'grammarly-desktop-integration',
              'grammarly-mirror',
              'style.darkreader',
              'meta[name="darkreader"]',
              'script[id^="elements-"]'
            ];
            selectorsToRemove.forEach(function(sel) {
              document.querySelectorAll(sel).forEach(function(el) {
                el.remove();
              });
            });

            // --- MutationObserver for future injections ---
            var observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(m) {
                if (m.type === 'attributes') {
                  attrsToRemove.forEach(function(attr) {
                    if (m.attributeName === attr) body.removeAttribute(attr);
                  });
                  for (var i = 0; i < prefixes.length; i++) {
                    if (m.attributeName && m.attributeName.indexOf(prefixes[i]) === 0) {
                      body.removeAttribute(m.attributeName);
                      break;
                    }
                  }
                }
                if (m.type === 'childList') {
                  m.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                      var tag = node.tagName && node.tagName.toLowerCase();
                      if (tag === 'grammarly-desktop-integration' || tag === 'grammarly-mirror') {
                        node.remove();
                      }
                    }
                  });
                }
              });
            });

            observer.observe(body, {
              attributes: true,
              childList: true,
              subtree: false
            });

            observer.observe(html, {
              attributes: true,
              attributeFilter: ['class']
            });
          })();
        `,
      }}
    />
  )
}
