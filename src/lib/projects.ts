import { type StaticImageData } from 'next/image'

import chromeLogo from '@/images/logos/icons8-chrome-48.png'
import electronLogo from '@/images/logos/icons8-electron-48.png'
import git from '@/images/logos/icons8-git-48.png'
import macosLogo from '@/images/logos/icons8-macos-48.png'
import nextLogo from '@/images/logos/icons8-nextjs-48.png'
import npmLogo from '@/images/logos/icons8-npm-48.png'
import reactLogo from '@/images/logos/icons8-react-a-javascript-library-for-building-user-interfaces-32.png'
import reduxLogo from '@/images/logos/icons8-redux-48.png'
import shellLogo from '@/images/logos/icons8-shell-40.png'
import storybookLogo from '@/images/logos/icons8-storybook-48.png'
import tailwindLogo from '@/images/logos/icons8-tailwindcss-48.png'
import viteLogo from '@/images/logos/icons8-vite-48.png'
import vscodeLogo from '@/images/logos/icons8-vscode-48.png'
import mcpLogo from '@/images/logos/mcp.svg'

/**
 * Author-decided status vocabulary for featured projects.
 * Fixed 5 values — see DESIGN.md §7 (Status Label Vocabulary).
 *
 * - `Active`     — pixel 単位で改善中 (the one project receiving daily polish)
 * - `Daily tool` — 今も毎日触ってる (battle-tested, used in author's own workflow)
 * - `Experiment` — 証明系の思想実験 (proving an idea, may pivot or stop)
 * - `Maintained` — bugfix のみ受ける (stable, no new features planned)
 * - `Paused`     — 一時停止 (deliberately on hold, not deprecated)
 */
export type ProjectStatus =
  | 'Active'
  | 'Daily tool'
  | 'Experiment'
  | 'Maintained'
  | 'Paused'

/**
 * Archive project — minimal metadata for compressed 1-line display.
 * No status label (Archive projects are intentionally label-less per design).
 */
export type ArchiveProject = {
  name: string
  description: string
  category: string
  href: string
  logo: StaticImageData
}

/**
 * Featured project — extends ArchiveProject with required status label.
 * Used by `FeaturedProjectListItem` which expects `status` to drive accent color.
 */
export type FeaturedProject = ArchiveProject & {
  status: ProjectStatus
}

/**
 * Featured 7 — hand-curated, status-labeled, large display.
 * Order is intentional (author-curated importance), NOT alphabetical.
 *
 * Updated 2026-05-17 (Phase 3 Step 0 worksheet — Preset A: recent-skewed).
 */
export const FEATURED_PROJECTS: readonly FeaturedProject[] = [
  {
    name: 'Skills Desktop',
    description:
      'Visualize installed Skills and symlink status across AI agents. GUI for managing skills with 21 AI agents support and 26 themes.',
    category: 'Desktop App',
    href: 'https://skills-desktop.vercel.app/',
    logo: electronLogo,
    status: 'Active',
  },
  {
    name: 'Skills',
    description:
      'Agent skills for AI coding assistants. Reusable skill modules for Claude Code, Cursor, Codex, Gemini CLI, and more.',
    category: 'Developer Tool',
    href: 'https://github.com/laststance/skills',
    logo: shellLogo,
    status: 'Daily tool',
  },
  {
    name: 'Tailwind CSS Canonical Classes',
    description:
      'Automatically convert non-canonical Tailwind CSS v4 classes to their canonical equivalents. Prettier plugin, CLI, and core library.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/tailwindcss-canonical-classes-monrepo',
    logo: tailwindLogo,
    status: 'Active',
  },
  {
    name: '@laststance/redux-storage-middleware',
    description:
      'SSR-safe Redux Toolkit middleware for localStorage persistence with selective slice hydration and performance optimization.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/redux-strorage-middeware',
    logo: reduxLogo,
    status: 'Maintained',
  },
  {
    name: 'GitBox',
    description:
      'A web application for managing GitHub repositories in Kanban board format. Organize your repos visually and boost productivity.',
    category: 'Web App',
    href: 'https://gitbox-laststance.vercel.app/',
    logo: git,
    status: 'Daily tool',
  },
  {
    name: 'react-lightbox',
    description:
      'A flexible and accessible React lightbox component for displaying images with keyboard navigation and touch support.',
    category: 'React Library',
    href: 'https://github.com/laststance/react-lightbox',
    logo: reactLogo,
    status: 'Maintained',
  },
  {
    name: 'electron-mcp-server',
    description:
      'A Model Context Protocol server for Electron applications. Bridge AI agents with desktop applications seamlessly.',
    category: 'Developer Tool',
    href: 'https://github.com/laststance/electron-mcp-server',
    logo: mcpLogo,
    status: 'Experiment',
  },
]

/**
 * Archive — alphabetical (case-insensitive) for predictable scanning.
 * No author-curated order, no status labels — pure reference list.
 */
export const ARCHIVE_PROJECTS: readonly ArchiveProject[] = [
  {
    name: '@laststance/react-next-eslint-plugin',
    description:
      'A collection of ESLint plugins for React and Next.js. Enforce best practices automatically.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/react-next-eslint-plugin',
    logo: npmLogo,
  },
  {
    name: 'Bookmark XP Explorer',
    description:
      'Manage Chrome bookmarks with a classic Windows XP explorer interface. Nostalgic yet functional.',
    category: 'Chrome Extension',
    href: 'https://chromewebstore.google.com/detail/bookmark-xp-explorer/bafnmajgbpafgeoafooklkfgamjbobpa',
    logo: chromeLogo,
  },
  {
    name: 'Claude Plugin Dashboard',
    description:
      'CLI dashboard for managing Claude Code plugins. Monitor and control your AI workflow.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/claude-plugin-dashboard',
    logo: npmLogo,
  },
  {
    name: 'Clean URL',
    description:
      'Remove tracking parameters from URLs automatically, protecting your privacy while browsing.',
    category: 'Chrome Extension',
    href: 'https://chromewebstore.google.com/detail/clean-url/konddpmmdjghlicegcfdjehalocbkmpl',
    logo: chromeLogo,
  },
  {
    name: 'Coffee Timer',
    description:
      'Simple timer PWA for coffee breaks with push notifications and customizable sounds.',
    category: 'Web App',
    href: 'https://github.com/laststance/coffee-timer',
    logo: nextLogo,
  },
  {
    name: 'Copy to',
    description:
      'A VSCode extension that adds a "Copy to..." option to the File Explorer context menu.',
    category: 'VS Code Extension',
    href: 'https://github.com/laststance/copy-to',
    logo: vscodeLogo,
  },
  {
    name: 'Create React App Vite',
    description:
      'Simple CRA-style Vite template. Familiar structure, modern tooling.',
    category: 'Template',
    href: 'https://github.com/laststance/create-react-app-vite',
    logo: viteLogo,
  },
  {
    name: 'do-i-need-umbrella',
    description:
      'Weather-based decision helper. Simple answer to a daily question.',
    category: 'Web App',
    href: 'https://github.com/laststance/do-i-need-an-umbrella',
    logo: reactLogo,
  },
  {
    name: 'dotfiles',
    description:
      'Personal Mac OS X setup manual. Reproducible development environment.',
    category: 'Developer Tool',
    href: 'https://github.com/ryota-murakami/dotfiles',
    logo: shellLogo,
  },
  {
    name: 'eslint-config-ts-prefixer',
    description:
      'Opinionated ESLint config with meaningful runtime rules and beautiful formatters.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/eslint-config-ts-prefixer',
    logo: npmLogo,
  },
  {
    name: 'git-commit-gpt',
    description:
      "AI-powered Git extension that generates commit messages using OpenAI's GPT models.",
    category: 'NPM Package',
    href: 'https://github.com/laststance/git-commit-gpt',
    logo: npmLogo,
  },
  {
    name: 'Laststance.io',
    description: 'This website. Built with Next.js, Tailwind, and MDX.',
    category: 'Web App',
    href: 'https://github.com/laststance/laststance.io',
    logo: nextLogo,
  },
  {
    name: 'mac-mcp-server',
    description: 'MacOS MCP Server',
    category: 'Developer Tool',
    href: 'https://github.com/laststance/mac-mcp-server',
    logo: mcpLogo,
  },
  {
    name: 'mui-storybook',
    description:
      'Storybook for MUI v5 default components. Visual component documentation.',
    category: 'Developer Tool',
    href: 'https://github.com/laststance/mui-storybook',
    logo: storybookLogo,
  },
  {
    name: 'next-msw-integration',
    description:
      'Next.js 16 + MSW integration demo. Mock Service Worker setup for browser and server environments.',
    category: 'Template',
    href: 'https://github.com/laststance/next-msw-integration',
    logo: nextLogo,
  },
  {
    name: 'npm-publish-tool',
    description:
      'Streamlined tool for publishing npm packages with version management.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/npm-publish-tool',
    logo: npmLogo,
  },
  {
    name: 'nsx',
    description:
      'Personal tech resource logger. Curate and revisit valuable reads.',
    category: 'Web App',
    href: 'https://github.com/laststance/nsx',
    logo: reactLogo,
  },
  {
    name: 'prettier-husky-lint-staged-installer',
    description:
      'One command to set up Prettier formatting on staged files at pre-commit.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/prettier-husky-lint-staged-installer',
    logo: npmLogo,
  },
  {
    name: 'React TypeScript TodoMVC 2022',
    description: 'Modern TodoMVC implementation. Clean code, modern patterns.',
    category: 'Template',
    href: 'https://github.com/laststance/react-typescript-todomvc-2022',
    logo: reactLogo,
  },
  {
    name: 'Redux Front Page',
    description:
      'Solving Redux documentation fragmentation. One source of truth.',
    category: 'Developer Tool',
    href: 'https://github.com/laststance/Redux-Front-Page',
    logo: reduxLogo,
  },
  {
    name: 'signage',
    description:
      'Dark self screen saver app for cooldown brain. Minimal distraction, maximum focus.',
    category: 'macOS App',
    href: 'https://github.com/laststance/signage',
    logo: macosLogo,
  },
  {
    name: 'vite-rtk-query',
    description:
      'Vite template for React + TypeScript + Redux Toolkit with RTK Query.',
    category: 'Template',
    href: 'https://github.com/laststance/vite-rtk-query',
    logo: reduxLogo,
  },
]
