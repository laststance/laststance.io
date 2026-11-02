import { type StaticImageData } from 'next/image'
import type { Messages } from 'next-intl'

import chromeLogo from '@/images/logos/icons8-chrome-48.png'
import electronLogo from '@/images/logos/icons8-electron-48.png'
import git from '@/images/logos/icons8-git-48.png'
import macosLogo from '@/images/logos/icons8-macos-48.png'
import nextLogo from '@/images/logos/icons8-nextjs-48.png'
import npmLogo from '@/images/logos/icons8-npm-48.png'
import reactLogo from '@/images/logos/icons8-react-a-javascript-library-for-building-user-interfaces-32.png'
import reduxLogo from '@/images/logos/icons8-redux-48.png'
import shellLogo from '@/images/logos/icons8-shell-40.png'
import tailwindLogo from '@/images/logos/icons8-tailwindcss-48.png'
import viteLogo from '@/images/logos/icons8-vite-48.png'
import vscodeLogo from '@/images/logos/icons8-vscode-48.png'

/**
 * Author-decided status metadata for featured projects.
 * Fixed 5 values — see DESIGN.md §7 (Status Label Vocabulary).
 *
 * - `Active`     — pixel 単位で改善中 (the one project receiving daily polish)
 * - `Daily tool` — 今も毎日触ってる (battle-tested, used in author's own workflow)
 * - `Experiment` — 証明系の思想実験 (proving an idea, may pivot or stop)
 * - `Maintained` — bugfix のみ受ける (stable, no new features planned)
 * - `Paused`     — 一時停止 (deliberately on hold, not deprecated)
 */
export type ProjectStatus =
  'Active' | 'Daily tool' | 'Experiment' | 'Maintained' | 'Paused'

type ProjectMessages = Messages['pages']['projects']

/** Catalog key of a project's description (`pages.projects.items.skillsDesktop`). */
export type ProjectId = keyof ProjectMessages['items']

/** Catalog key of a category label (`pages.projects.categories.desktopApp`). */
export type ProjectCategory = keyof ProjectMessages['categories']

/**
 * Project metadata shared by the full list and Home selections.
 * No status label (Archive projects are intentionally label-less per design).
 *
 * The description and category label are translated, so they live in the catalog
 * under `id` and `category`. `name` is shown verbatim in every language and also
 * identifies the project (React key, {@link PROJECT_DISPLAY} hidden names, tests).
 */
export type ArchiveProject = {
  id: ProjectId
  name: string
  category: ProjectCategory
  href: string
  logo: StaticImageData
}

/**
 * Featured project with retained status metadata.
 * The site shows the project purpose instead of a status label.
 */
export type FeaturedProject = ArchiveProject & {
  status: ProjectStatus
}

/**
 * Featured projects in the author-selected display order.
 * Order is intentional (author-curated importance), NOT alphabetical.
 *
 * Updated 2026-05-17 (Phase 3 Step 0 worksheet — Preset A: recent-skewed).
 */
export const FEATURED_PROJECTS: readonly FeaturedProject[] = [
  {
    id: 'skillsDesktop',
    name: 'Skills Desktop',
    category: 'desktopApp',
    href: 'https://skills-desktop.vercel.app/',
    logo: electronLogo,
    status: 'Active',
  },
  {
    id: 'goToDefinitionForJsdoc',
    name: 'Go To Definition for JSDoc',
    category: 'vscodeExtension',
    href: 'https://github.com/laststance/go-to-definition-for-jsdoc',
    logo: vscodeLogo,
    status: 'Active',
  },
  {
    id: 'tailwindcssCanonicalClasses',
    name: 'Tailwind CSS Canonical Classes',
    category: 'npmPackage',
    href: 'https://github.com/laststance/tailwindcss-canonical-classes-monrepo',
    logo: tailwindLogo,
    status: 'Active',
  },
  {
    id: 'reduxStorageMiddleware',
    name: '@laststance/redux-storage-middleware',
    category: 'npmPackage',
    href: 'https://github.com/laststance/redux-strorage-middeware',
    logo: reduxLogo,
    status: 'Maintained',
  },
  {
    id: 'gitbox',
    name: 'GitBox',
    category: 'webApp',
    href: 'https://gitbox-laststance.vercel.app/',
    logo: git,
    status: 'Daily tool',
  },
  {
    id: 'reactLightbox',
    name: 'react-lightbox',
    category: 'reactLibrary',
    href: 'https://github.com/laststance/react-lightbox',
    logo: reactLogo,
    status: 'Maintained',
  },
  {
    id: 'reactFlowScrollbar',
    name: 'react-flow-scrollbar',
    category: 'reactLibrary',
    href: 'https://github.com/laststance/react-flow-scrollbar',
    logo: reactLogo,
    status: 'Active',
  },
  {
    id: 'eslintConfigTsPrefixer',
    name: 'eslint-config-ts-prefixer',
    category: 'npmPackage',
    href: 'https://github.com/laststance/eslint-config-ts-prefixer',
    logo: npmLogo,
    status: 'Active',
  },
]

/**
 * Archive — alphabetical (case-insensitive) for predictable scanning.
 * No author-curated order, no status labels — pure reference list.
 */
export const ARCHIVE_PROJECTS: readonly ArchiveProject[] = [
  {
    id: 'reactNextEslintPlugin',
    name: '@laststance/react-next-eslint-plugin',
    category: 'npmPackage',
    href: 'https://github.com/laststance/react-next-eslint-plugin',
    logo: npmLogo,
  },
  {
    id: 'cleanUrl',
    name: 'Clean URL',
    category: 'chromeExtension',
    href: 'https://chromewebstore.google.com/detail/clean-url/konddpmmdjghlicegcfdjehalocbkmpl',
    logo: chromeLogo,
  },
  {
    id: 'coffeeTimer',
    name: 'Coffee Timer',
    category: 'webApp',
    href: 'https://github.com/laststance/coffee-timer',
    logo: nextLogo,
  },
  {
    id: 'createReactAppVite',
    name: 'Create React App Vite',
    category: 'template',
    href: 'https://github.com/laststance/create-react-app-vite',
    logo: viteLogo,
  },
  {
    id: 'doINeedUmbrella',
    name: 'do-i-need-umbrella',
    category: 'webApp',
    href: 'https://github.com/laststance/do-i-need-an-umbrella',
    logo: reactLogo,
  },
  {
    id: 'dotfiles',
    name: 'dotfiles',
    category: 'developerTool',
    href: 'https://github.com/ryota-murakami/dotfiles',
    logo: shellLogo,
  },
  {
    id: 'gitCommitGpt',
    name: 'git-commit-gpt',
    category: 'npmPackage',
    href: 'https://github.com/laststance/git-commit-gpt',
    logo: npmLogo,
  },
  {
    id: 'nextMswIntegration',
    name: 'next-msw-integration',
    category: 'template',
    href: 'https://github.com/laststance/next-msw-integration',
    logo: nextLogo,
  },
  {
    id: 'npmPublishTool',
    name: 'npm-publish-tool',
    category: 'npmPackage',
    href: 'https://github.com/laststance/npm-publish-tool',
    logo: npmLogo,
  },
  {
    id: 'nsx',
    name: 'nsx',
    category: 'webApp',
    href: 'https://github.com/laststance/nsx',
    logo: reactLogo,
  },
  {
    id: 'prettierHuskyLintStagedInstaller',
    name: 'prettier-husky-lint-staged-installer',
    category: 'npmPackage',
    href: 'https://github.com/laststance/prettier-husky-lint-staged-installer',
    logo: npmLogo,
  },
  {
    id: 'reactTypescriptTodomvc2022',
    name: 'React TypeScript TodoMVC 2022',
    category: 'template',
    href: 'https://github.com/laststance/react-typescript-todomvc-2022',
    logo: reactLogo,
  },
  {
    id: 'signage',
    name: 'signage',
    category: 'macosApp',
    href: 'https://github.com/laststance/signage',
    logo: macosLogo,
  },
  {
    id: 'viteRtkQuery',
    name: 'vite-rtk-query',
    category: 'template',
    href: 'https://github.com/laststance/vite-rtk-query',
    logo: reduxLogo,
  },
]

/** Site display choices. Hidden names stay in the source data for later reuse. */
export const PROJECT_DISPLAY = {
  hiddenNames: [
    '@laststance/react-next-eslint-plugin',
    'Clean URL',
    'Coffee Timer',
    'Create React App Vite',
    'do-i-need-umbrella',
    'dotfiles',
    'git-commit-gpt',
    'next-msw-integration',
    'npm-publish-tool',
    'nsx',
    'prettier-husky-lint-staged-installer',
    'React TypeScript TodoMVC 2022',
    'signage',
    'vite-rtk-query',
  ] as readonly string[],
}

/**
 * Selects visible projects from the shared publication setting.
 * Called when the Projects page renders; source records and status values stay intact.
 * @example
 * const { featured, stable } = getPublishedProjects()
 */
export function getPublishedProjects(display = PROJECT_DISPLAY) {
  const featured = FEATURED_PROJECTS.filter(
    (project) => !display.hiddenNames.includes(project.name),
  )
  const stable = ARCHIVE_PROJECTS.filter(
    (project) => !display.hiddenNames.includes(project.name),
  )
  return { featured, stable }
}
