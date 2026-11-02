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

  pages: {
    home: {
      tagline: 'Go Straightforward Web Application Development.',
      bio: "I'm <link>Ryota Murakami</link> who lives in Tokyo. Currently working as a freelance React/Node/TypeScript developer. Here is my independent OSS organization.",
      followOn: {
        twitter: 'Follow on Twitter',
        instagram: 'Follow on Instagram',
        github: 'Follow on GitHub',
        linkedin: 'Follow on LinkedIn',
      },
      photos: {
        photo1: 'Personal photo showcasing development work',
        photo2: 'Creative coding project snapshot',
        photo3: 'Technology workspace environment',
        photo4: 'Software engineering collaboration',
        photo5: 'Programming achievement highlight',
      },
    },
    about: {
      meta: {
        title: 'About',
        description: 'An independent organization for OSS activity.',
      },
      heading:
        'Laststance.io is my experimental laboratory for eliminate like this. ➡️',
      portraitAlt: 'Ryota Murakami portrait photo',
      intro:
        'I\'m <link>Ryota Murakami live in Tokyo,</link>here is website of my personal Github organization.<br></br><br></br>Initially, Laststance.io was just a Github organization created for use to name a NPM scoped name, such as "@foo/mylib", prevent new package name already used others.',
      hub: 'But now it has become an important hub for me to co-locate all OSS activities.',
      focus:
        'Laststance.io is currently focusing on React and other web development issues, as well as developing and researching toolchains to improve the quality of software development and the developer experience.',
      finalGig:
        'Laststance.io final gig is making the best web application framework. <br></br>You have no time to do it within 8h 5days per week and your exhausted by daily job"? Then work 3 days a week, inventing all webdev/OSS things.',
      followOn: {
        twitter: 'Follow on Twitter',
        instagram: 'Follow on Instagram',
        github: 'Follow on GitHub',
        linkedin: 'Follow on LinkedIn',
      },
    },
    articles: {
      meta: {
        title: 'Articles',
        description:
          'All of my long-form thoughts on JavaScript OSS, new product, and more, collected in chronological order.',
      },
      intro:
        'Releases, updates, and thoughts on web application development, with a focus on React, CSS, JavaScript, TypeScript, and Node.js. In chronological order.',
    },
    projects: {
      meta: {
        title: 'Projects',
        description:
          'Laststance.io Projects - Eliminating complexity from web development.',
      },
      intro:
        'Eliminating unnecessary complexity from web development. Tools, libraries, and applications that solve real problems.',
      featuredLabel: 'Featured projects',
      stableLabel: 'Stable projects',
      stableHeading: 'Stable',
      iconsBy: 'Icons by <link>Icons8</link>',
      categories: {
        desktopApp: 'Desktop App',
        vscodeExtension: 'VS Code Extension',
        npmPackage: 'NPM Package',
        webApp: 'Web App',
        reactLibrary: 'React Library',
        chromeExtension: 'Chrome Extension',
        template: 'Template',
        developerTool: 'Developer Tool',
        macosApp: 'macOS App',
      },
      items: {
        skillsDesktop:
          'Visualize installed Skills and symlink status across AI agents. GUI for managing skills with 21 AI agents support and 26 themes.',
        // ICU reads `{…}` as an argument, so the apostrophes keep `{@link SymbolName}` literal.
        goToDefinitionForJsdoc:
          "Jump from JSDoc '{@link SymbolName}' references to TypeScript workspace symbols without adding throwaway imports for navigation.",
        tailwindcssCanonicalClasses:
          'Automatically convert non-canonical Tailwind CSS v4 classes to their canonical equivalents. Prettier plugin, CLI, and core library.',
        reduxStorageMiddleware:
          'SSR-safe Redux Toolkit middleware for localStorage persistence with selective slice hydration and performance optimization.',
        gitbox:
          'A web application for managing GitHub repositories in Kanban board format. Organize your repos visually and boost productivity.',
        reactLightbox:
          'A flexible and accessible React lightbox component for displaying images with keyboard navigation and touch support.',
        reactFlowScrollbar:
          'Viewport-synced custom scrollbars and zoom-aware bounded panning for React Flow / @xyflow/react v12.',
        eslintConfigTsPrefixer:
          'Opinionated ESLint config with meaningful runtime rules and beautiful formatters.',
        reactNextEslintPlugin:
          'A collection of ESLint plugins for React and Next.js. Enforce best practices automatically.',
        cleanUrl:
          'Remove tracking parameters from URLs automatically, protecting your privacy while browsing.',
        coffeeTimer:
          'Simple timer PWA for coffee breaks with push notifications and customizable sounds.',
        createReactAppVite:
          'Simple CRA-style Vite template. Familiar structure, modern tooling.',
        doINeedUmbrella:
          'Weather-based decision helper. Simple answer to a daily question.',
        dotfiles:
          'Personal Mac OS X setup manual. Reproducible development environment.',
        gitCommitGpt:
          "AI-powered Git extension that generates commit messages using OpenAI's GPT models.",
        nextMswIntegration:
          'Next.js 16 + MSW integration demo. Mock Service Worker setup for browser and server environments.',
        npmPublishTool:
          'Streamlined tool for publishing npm packages with version management.',
        nsx: 'Personal tech resource logger. Curate and revisit valuable reads.',
        prettierHuskyLintStagedInstaller:
          'One command to set up Prettier formatting on staged files at pre-commit.',
        reactTypescriptTodomvc2022:
          'Modern TodoMVC implementation. Clean code, modern patterns.',
        signage:
          'Dark self screen saver app for cooldown brain. Minimal distraction, maximum focus.',
        viteRtkQuery:
          'Vite template for React + TypeScript + Redux Toolkit with RTK Query.',
      },
    },
    uses: {
      meta: {
        title: 'Uses',
        description: 'Software I use, my preference, things my favorite.',
      },
      intro:
        'Hardware, software, and other things I love. Here’s a list of my favorite tools for a comfortable setup.',
      sections: {
        hardware: 'Hardware',
        development: 'Development tools',
        utility: 'Utility',
      },
      tools: {
        macbookPro: {
          title:
            '16" MacBook Pro M4 Max (16-core CPU, 40-core GPU, 64GB RAM) (2024)',
          body: "Finally upgraded to the latest Apple Silicon M4 Max with 16-core CPU and 40-core GPU. The leap from Intel i7 to M4 Max is absolutely night and day—compilation times are ~10x faster, and Cursor AI assistant now runs smoothly without any performance concerns. The Liquid Retina XDR display with ProMotion (up to 120Hz) makes scrolling incredibly smooth. <br></br> The 64GB unified memory is substantial enough for heavy workloads like Next.js builds, Docker containers, and multiple editor instances simultaneously. Thunderbolt 5 connectivity future-proofs the machine. <br></br> I continue using clamshell mode with an external 1440p monitor, Magic Keyboard, and Magic Trackpad to maintain ergonomics—the M4 Max's thermal efficiency keeps the machine silent even under load.",
        },
        magicKeyboard: {
          title: 'Apple Magic Keyboard - US English',
          body: 'I am not particularly particular about keyboards, so I use the Apple original one. It is an ordinary keyboard with no special features, and I think the price is high compared to the performance.',
        },
        magicTrackpad: {
          title: 'Apple Magic Trackpad - Black Multi-Touch Surface',
          body: 'I use a black color one. It feels exactly like the one on my Macbook Pro and is the most complete pointing device compared to other laptop products. I think the performance of the product is balanced against the price, which is rare for Apple.',
        },
        expressKeyboardPlatform: {
          title: 'eXpress Keyboard Platform',
          body: 'This is a gadget for placing an external Apple Magic Keyboard and Apple Magic Trackpad in a layout similar to that of a Macbook Pro. If you simply place the Trackpad under the keyboard without using this product, the height difference is too great and it is difficult to operate the keyboard properly. Thanks to this gadget, you can smoothly switch between the clamshell mode of the Macbook Pro and the normal laptop mode.',
        },
        lgUltragear: {
          title: 'LG 24 UltraGear FHD IPS 1ms 144Hz HDR Monitor',
          body: "My memory is a little fuzzy but I bought this external monitor because it was on sale at Amazon at a discount, It is connected in Clamshell mode. <br></br>The good thing about this monitor is that I don't feel any display delay at all (who can detect a 1ms delay?). <br></br> The good thing about this monitor is that you don't feel any delay at all, The monitor can be set to a refresh rate of up to 144Hz, which makes scrolling on the web site very smooth. (On my Macbook Pro, I set the refresh rate to 120Hz because the screen turns green when set to 144Hz.) <br></br> The difference in smoothness between 60Hz and 120Hz is clearly visible even to the average non-gadget geek, <br></br> so I honestly think the 120Hz support on the iPhone 15 Pro was a more important update than USB-C.",
        },
        cursor: {
          title: 'Cursor',
          body: "Forked from VScode, it is the the best AI IDE as far as i know. It can import and learn library documents and answer questions based on its knowledge of the entire codebase, making it a powerful tool for real-world products. Since it is a Fork of VScode, it references VScode's keybinding.json and settings.json, so it can easily be used with VSCode.",
        },
        webstorm: {
          title: 'WebStorm(JetBrains IDE)',
          body: 'First of all, I am a big fan of JetBrains. Since my first use of PHPStorm for a project in the PHP Symfony framework, I have been impressed by its powerful refactoring features that understand the type and context of the code and automatically rewirte all affected parts to make sure that the code is properly Code Complete. I think this is similar to the feeling that JavaScirpt developers had when they switched from SublimeText to VSCode back in the day when there was no culture of using IDEs. I use WebStorm, VScode, and Cursor as my three IDEs. The best features of WebStorm are Auto Import, IntelliSense, refactoring accuracy, ESLint autofix execution speed, and I think the Project Tree is the easiest to use. There are almost no situations where I have to manually write import statements, so I would choose WebStorm first when writing a normal program.',
        },
        terminal: {
          title: 'Terminal(Mac OSX Default)',
          body: "Maybe I just don't know the advanced features of other terminal apps, but I like the default terminal because it is stable enough to do what I want to do. I don't use the split screen at all, so maybe I don't feel inconvenienced by the default Terminal. When I launch multiple processes, I use tabs to manage them.",
        },
        fishShell: {
          title: 'Fish Shell',
          body: "When I was a programming novice, I switched from bash to fish when I saw a blog about a customized zsh-like useful feature with almost zero configuration. But at first, fish was not compatible with bash/zsh and it was inconvenient that I could not execute ShellScript I found on Stackoverflow and so on as is. Now that fish has become a major shell, it supports installation scripts for various CLI tools, and also supports adding paths to `config.fish`, so it is easier to use than before. However, I don't know how to use the `abbr` command, which is one of the features of fish, and I use alias all the time...",
        },
        volta: {
          title: 'Volta',
          body: 'Volta is a Node.js version control tool, it would be an alternative to nvm. It has a simple API and a `volta pin` command that records the Node.js version of the project in package.json and automatically switches the Node.js version when you move to a directory.',
        },
        pnpm: {
          title: 'pnpm',
          body: "I use pnpm as package manager for all my JS/TS projects. It saves a lot of storage space, and it has very straight forward module resolution that <br></br> imported package from the end application must be written the top level package.json's dependency/devDependency. <br></br> I think it is a great package manager with a very straight forward and trouble free module resolution rule. <br></br> I also use Bun from time to time, which can run TS directly and ise often a faster runtime than Node.js.",
        },
        figma: {
          title: 'Figma',
          body: "Bridging the gap between design data and implementation code in component-oriented front-end development, <br></br> the designer skills and design tool skills needed when developing GUI applications on a solo basis, and the emergence of VSCode and Storybook's Figma Extension, developers also I have seen an increasing number of situations in recent years where I feel that it is better to be equipped with design tool skills. <br></br>I think that the designer's ability is also included in the interest of full-stack developers.",
        },
        raycast: {
          title: 'Raycast',
          body: "I am not good at remembering the spelling of English words, so what I use Raycast for the most is the dictionary function. <br></br> I also use Github repository search, kill process, bing search, and floating note. I would like to try various extensions when I have time, as I am sure there are many useful ways to use them that I am not aware of yet. <br></br> I am using the free plan because I couldn't find any situation where I want to ask AI questions in the context of Raycast.",
        },
        istatMenus: {
          title: 'iStat Menu',
          body: 'It is an application that displays every stat of the machine in the menu bar like Activitiy Monitor. <br></br>It is fun to see the CPU temperature and fan speed in the Censer tab and to change the fan speed to 100% and try to see how far you can cool the CPU.',
        },
      },
    },
    privacy: {
      meta: {
        title: 'Privacy Policy',
        description:
          'What laststance.io and the personal tools published under Laststance.io collect, and what they do with it.',
      },
      // Empty in English; the page renders the notice only when a translation sets it.
      translationNotice: '',
      // {date} is formatDate(PRIVACY_UPDATED_AT, locale).
      intro:
        'Laststance.io is run by one person, Ryota Murakami. This page says what this website and my personal tools collect. Last updated: {date}.',
      website: {
        title: 'This website',
        analytics:
          'laststance.io has no accounts, no sign-in, and no forms. It uses Vercel Analytics to count page views without cookies, and Sentry to report errors so I can fix them. An error report can include your browser version, the page URL, and your IP address.',
        noSale: 'I do not sell this data, and I do not use it for advertising.',
      },
      google: {
        title: 'Google account access',
        tool: 'I run a command-line tool (“gog cli”) that connects to Google APIs with OAuth. It is for my own use: I am the only person who signs in to it, and it reads and writes Gmail and Google Calendar data in my own Google account.',
        tokens:
          'The tool runs on my own computer, and the access tokens stay on that computer. I sometimes have an AI assistant read my own mail or calendar through this tool, which sends that content to the assistant’s model provider (Anthropic) to answer my request. Beyond that, nothing is sent to a Laststance server, sold, or used for advertising.',
        limitedUse:
          'Its use of information received from Google APIs follows the Google API Services User Data Policy, including the Limited Use requirements. Access can be revoked at any time from the Google Account permissions page.',
      },
      contact: {
        title: 'Contact',
        body: 'Questions about this policy can go to <link>dojce1048@gmail.com</link>.',
      },
    },
    keybinds: {
      meta: {
        title: 'Keybinds',
        description: 'My Editor Keybinds.',
      },
      intro:
        'My Raycast, Cursor, WebStorm, and Chrome shortcuts. I keep this page open as a cheat sheet. (macOS US keyboard layout)',
      tableLabel: '{label} shortcuts',
      // Keys are the URL anchors (#move-cursor) from before localization, so they never translate.
      groups: {
        raycast: 'Raycast',
        chrome: 'Chrome',
        editor: 'Editor',
        'move-cursor': 'Move Cursor',
        selection: 'Selection',
        scroll: 'Scroll',
        'code-edit': 'Code Edit',
        find: 'Find',
        'split-editor-window': 'Split Editor Window',
        'code-jump': 'Code Jump',
        intellisense: 'IntelliSense',
        'file-explorer': 'File Explorer',
        'ide-feature': 'IDE Feature',
        ai: 'AI',
        git: 'Git',
        'multiple-cursor': 'Multiple Cursor',
      },
      // Labels that are editor command ids (cursorEndSelect) stay verbatim in every locale.
      actions: {
        toggleRaycast: 'Toggle Raycast',
        clipboardHistory: 'Clipboard History',
        searchSnippets: 'Search Snippets',
        searchQuicklinks: 'Search Quicklinks',
        searchEmojiAndSymbols: 'Search Emoji & Symbols',
        enToJp: 'EN to JP',
        confettiWithSound: 'Confetti with sound',
        toggleDevtools: 'Toggle Devtools',
        openChromeExtensions: 'Open chrome://extensions/',
        openChromeBookmarks: 'Open chrome://bookmarks/',
        duplicateTab: 'Duplicate tab',
        devtoolsPauseScript: 'DevTools: Pause script execution',
        cursorRight: 'Cursor Right',
        cursorLeft: 'Cursor Left',
        cursorUp: 'Cursor Up',
        cursorDown: 'Cursor Down',
        cursorRightWord: 'Cursor Right Word',
        cursorLeftWord: 'Cursor Left Word',
        cursorUpBlock: 'Cursor Up Block',
        cursorDownBlock: 'Cursor Down Block',
        moveCursorToLineStart: 'Move Cursor to Line Start',
        moveCursorToLineEnd: 'Move Cursor to Line End',
        rightWithSelection: 'Right with Selection',
        leftWithSelection: 'Left with Slection',
        upWithSelection: 'Up with Section',
        downWithSelection: 'Down with Section',
        cursorEndSelect: 'cursorEndSelect',
        cursorStartSelect: 'cursorStartSelect',
        cursorRightWordSelect: 'cursorRightWordSelect',
        cursorLeftWordSelect: 'cursorLeftWordSelect',
        cursorTopBlockSelect: 'cursorTopBlockSelect',
        cursorBottomBlockSelect: 'cursorBottomBlockSelect',
        rectangularSelectionOnMouseDrag: 'Rectangular Selection on Mouse Drag',
        selectInnerBracket: 'Select Inner Bracket(Cursor/Zed)',
        toggleStickySelection: 'Toggle Sticky Selection(WebStorm)',
        selectBracket: 'Select bracket(Cursor/Zed)',
        cursorPageDown: 'cursorPageDown',
        cursorPageUp: 'cursorPageUp',
        cursorTop: 'cursorTop',
        cursorBottm: 'cursorBottm',
        scrollToCenter: 'Scroll to Center',
        deleteCharacter: 'delete single charchtar',
        copy: 'Copy',
        paste: 'Paste',
        undo: 'Undo',
        redo: 'Redo',
        duplicateLine: 'Duplicate Line',
        insertLineAbove: 'Insert line Above(Cursor/Zed)',
        insertLineBelow: 'Insert line Below(Cursor/Zed)',
        deleteMatchedBracketOrTag: 'Delete matched bracket or tag',
        cutAllRight: 'Cut All Right',
        renameSelectedSymbol: 'Rename selected symbol',
        surroundWith: 'Surround With',
        surroundWithSnippet: 'Surround With Snippet',
        wrapWithHtmlTag:
          'Wrapping selected HTML Tag: select children elements ->',
        deleteParentHtmlTag:
          'Delete Pararent HTML Tag(preserve children)(WebStorm)',
        findTextInCurrentSingleFile: 'Find text in current single file',
        findInProjectOrAnyFolder: 'Find in Project or any Folder',
        replaceTextInCurrentSingleFile: 'Replace text in current single file',
        replaceTextInFolder: 'Replace text in Folder',
        splitRight: 'Split Right',
        splitDown: 'Split Down',
        splitUp: 'Split Up',
        moveFocusWindowRight: 'Move Focus Window Right',
        moveFocusWindowLeft: 'Move Focus Window Left',
        goToImplementation: 'Go to Implementation',
        goToDefinition: 'Go to Definition',
        goToTypeDeclaration: 'Go to Type declaration',
        goToMatchingPairBraceBracket: 'Go to Matching Pair Brace/Bracket',
        goToMatchingHtmlJsxTag: 'Go to Matching HTML/JSX Tag(Cursor)',
        prevCodeJumpHistory: 'prev code jump history',
        nextCodeJumpHistory: 'next code jump history',
        nextHighlightSymbol: 'Next HighLight Symbol',
        prevHighlightSymbol: 'Prev HighLight Symbol',
        nextProblem: 'Next Problem',
        showTypeBasedCompletion: 'Show type based completion',
        toggleExplorer: 'Toggle Explorer',
        focusEditor: 'Focus Editor',
        newFile: 'New File',
        newFolder: 'New Folder',
        rename: 'Rename',
        delete: 'Delete',
        copyRelativeFilePath: 'Copy Relative File Path',
        commandPalette: 'Command Palette',
        openFilenameSearch: 'Open filename Search',
        openGoToSymbolSearch: 'Open Go to Symbol Search',
        openRefactorMenuSelectedCode: 'Open refactor menu selected code',
        showReferenceUsage: 'Show Reference/Usage',
        showContextMenu: 'Show Context Menu',
        toggleTerminal: 'Toggle Terminal',
        togglePanelRightBottom: 'Toggle Panel Right/Bottom',
        reloadWindow: 'Reload Window',
        openSettings: 'Open Settings',
        keybindSettings: 'Keybind Settings',
        openCursorSettings: 'Open Cursor Settings',
        eslintFix: 'ESLint  —fix',
        formatWithPrettier: 'Format with Prettier',
        showMarkdownPreview: 'Show Markdown Preview',
        switchProject: 'Switch Project',
        togglePrimarySideBar: 'Toggle Primary Side Bar',
        toggleChatTab: 'Toggle Chat Tab',
        newAiChat: 'New AI Chat',
        toggleCursorZedAgentTab: 'Toggle Cursor/Zed Agent Tab',
        toggleCursorZedAgentsWindow: 'Toggle Cursor/Zed Agents Window',
        gitBlame: 'Git Blame(WebStorm)',
        multiCursorModifier:
          'editor.multiCursorModifier (VS Code/Cursor settings.json — use ctrlCmd on macOS so CMD+click is multi-cursor and Option+drag is column select)',
        rectangularMultiCursorSelectWebStorm:
          'Rectangular Multiple Cursor Select(WebStorm)',
        rectangularMultiCursorSelectCursor:
          'Rectangular Multiple Cursor Select(Cursor)',
        addOrRemoveCaret:
          'Add or Remove caret (with multiCursorModifier ctrlCmd on macOS)',
        cloneCursorAbove: 'Clone Cursor Above',
        cloneCursorBelow: 'Clone Cursor Bellow',
        verticalCursorFill: 'Vertical cursor fillin(Cursor)',
      },
    },
  },
} as const

export default en

/**
 * Same keys as English with any string values: what every other locale provides.
 * `ja.ts` uses `satisfies CatalogShape`, so a missing or extra key fails `tsc`.
 */
export type CatalogShape<T = typeof en> = {
  -readonly [K in keyof T]: T[K] extends string ? string : CatalogShape<T[K]>
}
