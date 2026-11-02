/**
 * English message catalog: the source of every localized string and the type
 * every other locale must match (see {@link CatalogShape}).
 *
 * Top-level `pages` holds server-only page prose that the `[locale]` layout
 * drops before `NextIntlClientProvider`. Every other namespace also reaches
 * Client Components. English values are byte-identical to the pre-i18n JSX.
 */
const en = {
  Metadata: {
    description: 'An independent OSS organization for coding projects.',
  },

  Nav: {
    about: 'About',
    articles: 'Articles',
    projects: 'Projects',
    uses: 'Uses',
    keybinds: 'Keybinds',
    nsx: 'NSX',
    menu: 'Menu',
    navigation: 'Navigation',
    toggleMenu: 'Toggle mobile navigation menu',
    menuLabel: 'Mobile navigation menu',
    closeMenu: 'Close menu',
  },

  Header: {
    homeLabel: 'Home',
    avatarAlt: "Ryota Murakami's profile avatar",
  },

  Common: {
    opensInNewTab: '{label} (opens in new tab)',
    sendEmailTo: 'Send email to {email}',
    readArticle: 'Read article',
    personalSiteLabel: "Ryota Murakami's personal website (opens in new tab)",
  },

  ThemeToggle: {
    switchTo: 'Switch to {theme} theme',
    toggle: 'Toggle theme',
    themes: {
      dark: 'dark',
      light: 'light',
    },
  },

  WhatsNew: {
    trigger: "What's New?",
    openLabel: "Open What's New dialog",
    title: "What's New?",
    description: 'Latest updates and changes to the website',
    listLabel: "What's new updates list",
    // Site notes only. Entries that are an article title stay English in WhatNew.tsx.
    items: {
      addNewProjects: 'Add new projects to the Projects page',
      projectsRedesign:
        '🎨 Projects page redesign: Category-based layout with 9 categories',
      updatedMacBookPro:
        '📱 Updated MacBook Pro: Upgraded to M4 Max (16-core CPU, 40-core GPU, 64GB RAM)',
      updateProjectsPage: 'Update Projects Page',
      keybindsChromeRaindropIde:
        'Update Keybinds: Add Chrome, Raindrop and IDE shortcuts',
      updateKeybindsStyle: 'Update Keybinds Style',
      updateUsesPage: 'Update Uses page',
      updateKeybinds: 'Update Keybinds',
      increaseGithubFeedRecord: 'Increase Github Feed record',
      keybindOpenKeybindingJson: 'Keybind: VSCode Open Keybinding.json',
      keybindsUpdateSelection: 'Keybinds: update selection commands',
      addArticle: 'add article: <link>{title}</link>',
      fixInstallerLink:
        'projects: fix prettier-husky-lint-staged-installer broken link',
      addPost: 'add post <link>{title}</link>',
      updateGoToSymbolKeybind:
        'Update "Go to symbol" keybind to "CMD + Shift + O"',
      removeIncorrectKeybinds: 'Remove incorrect keybinds',
      fixBlogPostBodyStyle: 'Fix broken blog post body style.',
      addOgImage: 'Add og image',
      addLaststanceAndDotfiles: 'Add Laststance.io and Dotfiles in Projects.',
      fixKeybindsTypography: 'Fix Keybinds page typography.',
      addWhatsNew: "Add What's New?",
      changeShadcnBaseColor: 'Change shacdn "baseColor": "zinc"',
      fixGithubFeedStyle: 'Fix GithubFeed Style',
      addIcons8Credit: 'Add 8icon Credit at Projects page',
    },
  },

  Dialog: {
    close: 'Close',
  },

  Mermaid: {
    loading: 'Loading diagram…',
    openFullscreen: 'Open diagram in fullscreen viewer',
    lightboxTitle: 'Mermaid diagram (zoomable)',
    lightboxDescription:
      'Use the toolbar buttons, mouse wheel, drag, pinch, or the keyboard shortcuts plus, minus, and zero to zoom and pan the diagram. Press Escape to close.',
    zoomOut: 'Zoom out (-)',
    resetZoom: 'Reset zoom (0)',
    zoomIn: 'Zoom in (+)',
  },

  Kbd: {
    keyLabel: 'Keyboard key: {keyName}',
  },

  Footer: {
    copyright: '© {year} Laststance.io. All rights reserved.',
  },

  Pagination: {
    label: 'Pagination',
    previousLabel: 'Go to previous page',
    previous: 'Previous',
    pageOf: 'Page {current} of {total}',
    goToPage: 'Go to page {page}',
    nextLabel: 'Go to next page',
    next: 'Next',
  },

  NotFound: {
    code: '404',
    title: 'Page not found',
    description: "Sorry, we couldn't find the page you're looking for.",
    backHome: 'Go back home',
  },

  pages: {},
} as const

export default en

/**
 * Same keys as English with any string values: what every other locale provides.
 * `ja.ts` uses `satisfies CatalogShape`, so a missing or extra key fails `tsc`.
 */
export type CatalogShape<T = typeof en> = {
  -readonly [K in keyof T]: T[K] extends string ? string : CatalogShape<T[K]>
}
