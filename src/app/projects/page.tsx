import { type Metadata } from 'next'
import { type StaticImageData } from 'next/image'

import { Container } from '@/components/Container'
import { ProjectListItem } from '@/components/ProjectListItem'
import chromeLogo from '@/images/logos/icons8-chrome-48.png'
import git from '@/images/logos/icons8-git-48.png'
import macosLogo from '@/images/logos/icons8-macos-48.png'
import nextLogo from '@/images/logos/icons8-nextjs-48.png'
import npmLogo from '@/images/logos/icons8-npm-48.png'
import reactLogo from '@/images/logos/icons8-react-a-javascript-library-for-building-user-interfaces-32.png'
import reduxLogo from '@/images/logos/icons8-redux-48.png'
import shellLogo from '@/images/logos/icons8-shell-40.png'
import storybookLogo from '@/images/logos/icons8-storybook-48.png'
import viteLogo from '@/images/logos/icons8-vite-48.png'
import vscodeLogo from '@/images/logos/icons8-vscode-48.png'
import mcpLogo from '@/images/logos/mcp.svg'

const title = 'Projects'

export const metadata: Metadata = {
  title: title,
  description: 'Laststance.io Projects - Eliminating complexity from web development.',
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
}

/**
 * Project data structure for the minimal list layout
 */
type Project = {
  name: string
  description: string
  category: string
  href: string
  logo: StaticImageData
  featured?: boolean
}

/**
 * Flattened project list, sorted by importance (featured first)
 */
const projects: Project[] = [
  // Featured Projects
  {
    name: 'GitBox',
    description:
      'A web application for managing GitHub repositories in Kanban board format. Organize your repos visually and boost productivity.',
    category: 'Web App',
    href: 'https://gitbox-laststance.vercel.app/',
    logo: git,
    featured: true,
  },
  {
    name: 'react-lightbox',
    description:
      'A flexible and accessible React lightbox component for displaying images with keyboard navigation and touch support.',
    category: 'React Library',
    href: 'https://github.com/laststance/react-lightbox',
    logo: reactLogo,
    featured: true,
  },
  {
    name: 'electron-mcp-server',
    description: 'A Model Context Protocol server for Electron applications. Bridge AI agents with desktop applications seamlessly.',
    category: 'Developer Tool',
    href: 'https://github.com/laststance/electron-mcp-server',
    logo: mcpLogo,
    featured: true,
  },
  {
    name: 'mac-mcp-server',
    description: "MacOS MCP Server",
    category: 'Developer Tool',
    href: 'https://github.com/laststance/mac-mcp-server',
    logo: mcpLogo,
  },

  // Chrome Extensions
  {
    name: 'Bookmark XP Explorer',
    description:
      'Manage Chrome bookmarks with a classic Windows XP explorer interface. Nostalgic yet functional.',
    category: 'Chrome Extension',
    href: 'https://chromewebstore.google.com/detail/bookmark-xp-explorer/bafnmajgbpafgeoafooklkfgamjbobpa',
    logo: chromeLogo,
  },
  {
    name: 'Clean URL',
    description:
      'Remove tracking parameters from URLs automatically, protecting your privacy while browsing.',
    category: 'Chrome Extension',
    href: 'https://chromewebstore.google.com/detail/clean-url/konddpmmdjghlicegcfdjehalocbkmpl',
    logo: chromeLogo,
  },

  // macOS Apps
  {
    name: 'signage',
    description: 'Dark self screen saver app for cooldown brain. Minimal distraction, maximum focus.',
    category: 'macOS App',
    href: 'https://github.com/laststance/signage',
    logo: macosLogo,
  },
  {
    name: 'complete',
    description:
      'macOS system-wide spell autocomplete triggered by global hotkey. Type faster, everywhere.',
    category: 'macOS App',
    href: 'https://github.com/laststance/complete',
    logo: macosLogo,
  },

  // VS Code Extensions
  {
    name: 'Copy to',
    description:
      'A VSCode extension that adds a "Copy to..." option to the File Explorer context menu.',
    category: 'VS Code Extension',
    href: 'https://github.com/laststance/copy-to',
    logo: vscodeLogo,
  },

  // NPM Packages
  {
    name: 'Claude Plugin Dashboard',
    description: 'CLI dashboard for managing Claude Code plugins. Monitor and control your AI workflow.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/claude-plugin-dashboard',
    logo: npmLogo,
  },
  {
    name: '@laststance/react-next-eslint-plugin',
    description: 'A collection of ESLint plugins for React and Next.js. Enforce best practices automatically.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/react-next-eslint-plugin',
    logo: npmLogo,
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
    name: 'npm-publish-tool',
    description: 'Streamlined tool for publishing npm packages with version management.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/npm-publish-tool',
    logo: npmLogo,
  },
  {
    name: 'prettier-husky-lint-staged-installer',
    description: 'One command to set up Prettier formatting on staged files at pre-commit.',
    category: 'NPM Package',
    href: 'https://github.com/laststance/prettier-husky-lint-staged-installer',
    logo: npmLogo,
  },

  // Web Applications
  {
    name: 'Coffee Timer',
    description:
      'Simple timer PWA for coffee breaks with push notifications and customizable sounds.',
    category: 'Web App',
    href: 'https://github.com/laststance/coffee-timer',
    logo: nextLogo,
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
    name: 'Laststance.io',
    description: 'This website. Built with Next.js, Tailwind, and MDX.',
    category: 'Web App',
    href: 'https://github.com/laststance/laststance.io',
    logo: nextLogo,
  },
  {
    name: 'nsx',
    description: 'Personal tech resource logger. Curate and revisit valuable reads.',
    category: 'Web App',
    href: 'https://github.com/laststance/nsx',
    logo: reactLogo,
  },

  // Templates & Starters
  {
    name: 'next-msw-integration',
    description:
      'Next.js 16 + MSW integration demo. Mock Service Worker setup for browser and server environments.',
    category: 'Template',
    href: 'https://github.com/laststance/next-msw-integration',
    logo: nextLogo,
  },
  {
    name: 'Create React App Vite',
    description: 'Simple CRA-style Vite template. Familiar structure, modern tooling.',
    category: 'Template',
    href: 'https://github.com/laststance/create-react-app-vite',
    logo: viteLogo,
  },
  {
    name: 'vite-rtk-query',
    description:
      'Vite template for React + TypeScript + Redux Toolkit with RTK Query.',
    category: 'Template',
    href: 'https://github.com/laststance/vite-rtk-query',
    logo: reduxLogo,
  },
  {
    name: 'React TypeScript TodoMVC 2022',
    description: 'Modern TodoMVC implementation. Clean code, modern patterns.',
    category: 'Template',
    href: 'https://github.com/laststance/react-typescript-todomvc-2022',
    logo: reactLogo,
  },

  // Developer Tools
  {
    name: 'mui-storybook',
    description: 'Storybook for MUI v5 default components. Visual component documentation.',
    category: 'Developer Tool',
    href: 'https://github.com/laststance/mui-storybook',
    logo: storybookLogo,
  },
  {
    name: 'Redux Front Page',
    description: 'Solving Redux documentation fragmentation. One source of truth.',
    category: 'Developer Tool',
    href: 'https://github.com/laststance/Redux-Front-Page',
    logo: reduxLogo,
  },
  {
    name: 'dotfiles',
    description: 'Personal Mac OS X setup manual. Reproducible development environment.',
    category: 'Developer Tool',
    href: 'https://github.com/ryota-murakami/dotfiles',
    logo: shellLogo,
  },
]

/**
 * Projects page with minimal list layout
 *
 * Design inspired by Linear and Rauno Freiberg's portfolio.
 * Features:
 * - Typography-first approach with generous whitespace
 * - Hover/focus accordion expansion for project details
 * - Flattened structure (no category grouping)
 * - Featured projects at the top
 */
export default function Projects() {
  return (
    <main className="mt-16 sm:mt-24 md:mt-32">
      <Container>
        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Projects
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
            Eliminating unnecessary complexity from web development.
            <br className="hidden sm:block" />
            Tools, libraries, and applications that solve real problems.
          </p>
        </header>

        {/* Project List */}
        <section
          className="mt-16 sm:mt-20 md:mt-24"
          aria-label="Project list"
        >
          {/* Top border */}
          <div className="border-t border-zinc-200/60 dark:border-zinc-700/40" />

          {/* Projects */}
          {projects.map((project, index) => (
            <ProjectListItem
              key={project.name}
              name={project.name}
              description={project.description}
              category={project.category}
              href={project.href}
              logo={project.logo}
              index={index}
            />
          ))}
        </section>

        {/* Icon Credits - Minimal footer */}
        {/* <footer className="mt-24 pb-16 sm:mt-32">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Icons by{' '}
            <a
              href="https://icons8.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-zinc-600 dark:hover:text-zinc-400"
            >
              Icons8
            </a>
          </p>
        </footer> */}
      </Container>
    </main>
  )
}
