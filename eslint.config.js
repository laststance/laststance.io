// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import nextNext from '@next/eslint-plugin-next'
import { defineConfig } from 'eslint/config'
import tsPreFixer from 'eslint-config-ts-prefixer'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import browserSecurity from 'eslint-plugin-browser-security'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import storybook from 'eslint-plugin-storybook'

export default defineConfig([
  ...tsPreFixer,
  {
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ alwaysTryTypes: true }),
      ],
    },
  },
  {
    ignores: [
      '**/.vscode/**',
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/.github/**',
      '**/.git/**',
      '**/.idea/**',
      '.next/**',
      'next-env.d.ts',
      '**/storybook-static/**',
      '**/mockServiceWorker.js',
      '**/tests-examples/**',
      './playwright-report/**',
      './test-results/**',
      './e2e/tablet/**',
      './e2e/tablet-landscape/**',
      '.storybook/**',
      '**/.husky/**',
    ],
  },
  {
    plugins: {
      '@next/next': nextNext,
    },
    rules: {
      '@next/next/google-font-display': 'warn',
      '@next/next/google-font-preconnect': 'warn',
      '@next/next/inline-script-id': 'error',
      '@next/next/no-assign-module-variable': 'error',
      '@next/next/no-async-client-component': 'error',
      '@next/next/no-before-interactive-script-outside-document': 'warn',
      '@next/next/no-css-tags': 'warn',
      '@next/next/no-document-import-in-page': 'error',
      '@next/next/no-duplicate-head': 'error',
      '@next/next/no-head-element': 'warn',
      '@next/next/no-head-import-in-document': 'error',
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-page-custom-font': 'warn',
      '@next/next/no-script-component-in-head': 'error',
      '@next/next/no-styled-jsx-in-document': 'warn',
      '@next/next/no-sync-scripts': 'warn',
      '@next/next/no-title-in-document-head': 'warn',
      '@next/next/no-typos': 'warn',
      '@next/next/no-unwanted-polyfillio': 'warn',
    },
  },
  // Browser security — eight runtime XSS / token-storage rules.
  // Mirrors eslint-config-ts-prefixer#636. Added directly because that PR is
  // not yet released; delete this block once eslint-config-ts-prefixer ships
  // a version that already includes these rules.
  // https://github.com/laststance/eslint-config-ts-prefixer/pull/636
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    plugins: {
      'browser-security': browserSecurity,
    },
    rules: {
      // Disallow assigning to innerHTML/outerHTML — the most common XSS sink in
      // browser code, and not something a type checker can catch.
      'browser-security/no-innerhtml': 'error',

      // Disallow eval() and its string-compiling relatives.
      'browser-security/no-eval': 'error',

      // Disallow storing a JWT in localStorage/sessionStorage: any XSS on the
      // page can read it, unlike an HttpOnly cookie.
      'browser-security/no-jwt-in-storage': 'error',

      // Same reasoning for other secrets kept in Web Storage.
      'browser-security/no-sensitive-localstorage': 'error',

      // Disallow credentials in query strings — they land in browser history,
      // Referer headers, and server access logs.
      'browser-security/no-credentials-in-query-params': 'error',

      // Require Secure and SameSite when setting cookies from JS. (HttpOnly is
      // deliberately absent — a cookie set through document.cookie cannot be
      // HttpOnly, by definition.)
      'browser-security/require-cookie-secure-attrs': 'error',

      // Disallow postMessage(..., '*') — an origin wildcard leaks the payload
      // to whatever happens to be framed.
      'browser-security/no-postmessage-wildcard-origin': 'error',

      // Disallow redirects built from unvalidated input (open redirect).
      'browser-security/no-insecure-redirects': 'error',
    },
  },
  ...storybook.configs['flat/recommended'],
  jsxA11y.flatConfigs.recommended,
])
