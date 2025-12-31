import { type Metadata } from 'next'
import Image from 'next/image'

import { Card, CardLink } from '@/components/Card'
import { Container } from '@/components/Container'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { SimpleLayout } from '@/components/SimpleLayout'
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
  description: 'Laststance.io Projects',
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
}

type Project = {
  name: string
  description: string
  link: {
    href: string
    label: string
  }
  logo: typeof chromeLogo
}

type Category = {
  name: string
  emoji: string
  projects: Project[]
}

const categories: Category[] = [
  {
    name: 'Chrome Extensions',
    emoji: '🌐',
    projects: [
      {
        name: 'Bookmark XP Explorer',
        description:
          'This extension manages Chrome bookmarks using the chrome.bookmarks API.',
        link: {
          href: 'https://chromewebstore.google.com/detail/bookmark-xp-explorer/bafnmajgbpafgeoafooklkfgamjbobpa',
          label: 'Bookmark XP Explorer',
        },
        logo: chromeLogo,
      },
      {
        name: 'Clean URL',
        description:
          'Chrome extension that removes tracking parameters from URLs, protecting your privacy while browsing.',
        link: {
          href: 'https://chromewebstore.google.com/detail/clean-url/konddpmmdjghlicegcfdjehalocbkmpl',
          label: 'Clean URL',
        },
        logo: chromeLogo,
      },
    ],
  },
  {
    name: 'VS Code Extensions',
    emoji: '💻',
    projects: [
      {
        name: 'Copy to',
        description:
          'A VSCode extension that adds a "Copy to..." option to the File Explorer context menu.',
        link: {
          href: 'https://github.com/laststance/copy-to',
          label: 'copy-to',
        },
        logo: vscodeLogo,
      },
    ],
  },
  {
    name: 'macOS Apps',
    emoji: '🍎',
    projects: [
      {
        name: 'signage',
        description: 'Dark self screen saver app for cooldown brain.',
        link: {
          href: 'https://github.com/laststance/signage',
          label: 'signage',
        },
        logo: macosLogo,
      },
      {
        name: 'complete',
        description:
          'macOS system-wide spell autocomplete triggered by global hotkey.',
        link: {
          href: 'https://github.com/laststance/complete',
          label: 'complete',
        },
        logo: macosLogo,
      },
    ],
  },
  {
    name: 'React Libraries',
    emoji: '⚛️',
    projects: [
      {
        name: 'react-lightbox',
        description:
          'A flexible and accessible React lightbox component for displaying images with keyboard navigation and touch support.',
        link: {
          href: 'https://github.com/laststance/react-lightbox',
          label: 'react-lightbox',
        },
        logo: reactLogo,
      },
    ],
  },
  {
    name: 'NPM Packages',
    emoji: '📦',
    projects: [
      {
        name: 'Claude Code Plugin Dashboard',
        description: 'Claude Plugin Dashboard CLI',
        link: {
          href: 'https://github.com/laststance/claude-plugin-dashboard',
          label: 'claude-plugin-dashboard',
        },
        logo: npmLogo,
      },
      {
        name: '@laststance/react-next-eslint-plugin',
        description: 'A collection of ESLint plugins for React and Next.js.',
        link: {
          href: 'https://github.com/laststance/react-next-eslint-plugin',
          label: 'react-next-eslint-plugin',
        },
        logo: npmLogo,
      },
      {
        name: 'eslint-config-ts-prefixer',
        description:
          'Ruleset of meaningful Lint rules on runtime and beautiful formatters.',
        link: {
          href: 'https://github.com/laststance/eslint-config-ts-prefixer',
          label: 'eslint-config-ts-prefixer',
        },
        logo: npmLogo,
      },
      {
        name: 'npm-publish-tool',
        description: 'A tool to publish npm packages.',
        link: {
          href: 'https://github.com/laststance/npm-publish-tool',
          label: 'npm-publish-tool',
        },
        logo: npmLogo,
      },
      {
        name: 'git-commit-gpt',
        description:
          "An AI-powered Git extension that generates commit messages using OpenAI's GPT-3.5-turbo-instruct.",
        link: {
          href: 'https://github.com/laststance/git-commit-gpt',
          label: 'git-commit-gpt',
        },
        logo: npmLogo,
      },
      {
        name: 'prettier-husky-lint-staged-installer',
        description: 'Setup prettier format staged files at precommit.',
        link: {
          href: 'https://github.com/laststance/prettier-husky-lint-staged-installer',
          label: 'prettier-husky-lint-staged-installer',
        },
        logo: npmLogo,
      },
      {
        name: 'USD Query',
        description: 'Just make $ alias for document.querySelector.',
        link: {
          href: 'https://github.com/laststance/usd-query',
          label: 'USD Query',
        },
        logo: npmLogo,
      },
    ],
  },
  {
    name: 'Web Applications',
    emoji: '🚀',
    projects: [
      {
        name: 'GitBox',
        description:
          'A web application for managing GitHub repositories in Kanban board format.',
        link: {
          href: 'https://gitbox-laststance.vercel.app/',
          label: 'gitbox',
        },
        logo: git,
      },
      {
        name: 'Coffee Timer',
        description:
          'Simple timer PWA for coffee breaks with push notifications and customizable sounds.',
        link: {
          href: 'https://github.com/laststance/coffee-timer',
          label: 'coffee-timer',
        },
        logo: nextLogo,
      },
      {
        name: 'do-i-need-umbrella',
        description:
          'helps you decide whether you need an umbrella based on weather forecasts.',
        link: {
          href: 'https://github.com/laststance/do-i-need-an-umbrella',
          label: 'do-i-need-umbrella',
        },
        logo: reactLogo,
      },
      {
        name: 'Laststance.io',
        description: 'This website codebase',
        link: {
          href: 'https://github.com/laststance/laststance.io',
          label: 'laststance.io',
        },
        logo: nextLogo,
      },
      {
        name: 'nsx',
        description: 'Just logging tech resources I read.',
        link: { href: 'https://github.com/laststance/nsx', label: 'nsx' },
        logo: reactLogo,
      },
    ],
  },
  {
    name: 'Templates & Starters',
    emoji: '🎯',
    projects: [
      {
        name: 'next-msw-integration',
        description:
          'Next.js 16 × MSW Integration Demo - Mock Service Worker setup for browser and server environments.',
        link: {
          href: 'https://github.com/laststance/next-msw-integration',
          label: 'next-msw-integration',
        },
        logo: nextLogo,
      },
      {
        name: 'Create React App Vite',
        description: 'Simple CRA style Vite template.',
        link: {
          href: 'https://github.com/laststance/create-react-app-vite',
          label: 'Create React App Vite',
        },
        logo: viteLogo,
      },
      {
        name: 'vite-rtk-query',
        description:
          'Vite template for React + TypeScript + Redux-Toolkit / RTK Query.',
        link: {
          href: 'https://github.com/laststance/vite-rtk-query',
          label: 'vite-rtk-query',
        },
        logo: reduxLogo,
      },
      {
        name: 'React TypeScript TodoMVC 2022',
        description: 'A Modern Code Style Todo Example.',
        link: {
          href: 'https://github.com/laststance/react-typescript-todomvc-2022',
          label: 'React TypeScript TodoMVC 2022',
        },
        logo: reactLogo,
      },
    ],
  },
  {
    name: 'Developer Tools',
    emoji: '🛠️',
    projects: [
      {
        name: 'electron-mcp-server',
        description: 'A simple MCP server for Electron.',
        link: {
          href: 'https://github.com/laststance/electron-mcp-server',
          label: 'electron-mcp-server',
        },
        logo: mcpLogo,
      },
      {
        name: 'mui-storybook',
        description: 'Storybook for MUI v5 default components.',
        link: {
          href: 'https://github.com/laststance/mui-storybook',
          label: 'mui-storybook',
        },
        logo: storybookLogo,
      },
      {
        name: 'Redux Front Page',
        description: 'Solve the Redux documentation fragmentation problem.',
        link: {
          href: 'https://github.com/laststance/Redux-Front-Page',
          label: 'Redux Front Page',
        },
        logo: reduxLogo,
      },
      {
        name: 'dotfiles',
        description: '👨‍💻 My Mac OS X setup manual.',
        link: {
          href: 'https://github.com/ryota-murakami/dotfiles',
          label: 'dotfiles',
        },
        logo: shellLogo,
      },
    ],
  },
]

export default function Projects() {
  return (
    <SimpleLayout
      title="I eliminate all unnecessary complexity from Web Dev."
      intro="Laststance.io is currently focusing on React and other web
              development issues, as well as developing and researching
              toolchains to improve the quality of software development and the
              developer experience."
    >
      <div className="space-y-14 sm:space-y-18 md:space-y-24">
        {categories.map((category, index) => (
          <section key={category.name} aria-labelledby={`category-${index}`}>
            {/* Category Header with improved visual hierarchy */}
            <div className="relative mb-8 sm:mb-10 md:mb-12">
              {/* Enhanced gradient divider with better dark mode visibility */}
              {index > 0 && (
                <div
                  className="absolute -top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent sm:-top-9 md:-top-12 dark:via-zinc-500/50"
                  role="separator"
                  aria-hidden="true"
                />
              )}
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Emoji container - enhanced with aria-hidden */}
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100/80 text-xl shadow-sm ring-1 ring-zinc-200/50 transition-all duration-200 ease-out hover:scale-105 hover:shadow-md active:scale-95 sm:h-[52px] sm:w-[52px] sm:text-2xl dark:bg-zinc-800/80 dark:shadow-zinc-900/50 dark:ring-zinc-700/60 dark:hover:ring-zinc-600"
                  aria-hidden="true"
                  role="img"
                >
                  {category.emoji}
                </span>
                <h2
                  id={`category-${index}`}
                  className="text-lg font-semibold tracking-[-0.01em] text-zinc-900 sm:text-xl md:text-2xl dark:text-zinc-50"
                >
                  {category.name}
                </h2>
              </div>
            </div>
            {/* Project grid with responsive spacing and staggered animations */}
            <ul
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3"
              aria-label={`${category.name} projects`}
            >
              {category.projects.map((project, projectIndex) => (
                <Card
                  as="li"
                  key={project.name}
                  className={`group/card relative flex min-h-[180px] flex-col overflow-hidden rounded-xl bg-gradient-to-br from-white/50 to-zinc-50/30 p-2 shadow-sm ring-1 ring-zinc-900/[0.03] backdrop-blur-[2px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/[0.08] hover:ring-zinc-900/[0.06] focus-within:ring-2 focus-within:ring-teal-500/50 focus-within:ring-offset-2 focus-within:ring-offset-white motion-safe:animate-fade-in-up motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-[200px] sm:rounded-2xl dark:from-zinc-800/40 dark:to-zinc-900/30 dark:ring-zinc-700/40 dark:hover:shadow-2xl dark:hover:shadow-teal-500/[0.06] dark:hover:ring-zinc-600/50 dark:focus-within:ring-teal-400/50 dark:focus-within:ring-offset-zinc-900 animation-delay-${projectIndex % 6}`}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 sm:rounded-2xl dark:from-teal-400/[0.04]"
                    aria-hidden="true"
                  />
                  {/* Logo - touch-friendly with enhanced focus styles */}
                  <div
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-900/5 transition-all duration-200 group-hover/card:shadow-md group-hover/card:ring-zinc-900/10 dark:bg-zinc-800 dark:shadow-zinc-900/30 dark:ring-zinc-600/50 dark:group-hover/card:shadow-lg dark:group-hover/card:shadow-zinc-900/40 dark:group-hover/card:ring-zinc-500/60"
                    aria-hidden="true"
                  >
                    <Image
                      src={project.logo}
                      alt=""
                      className="h-6 w-6 transition-transform duration-200 group-hover/card:scale-105 sm:h-7 sm:w-7"
                      unoptimized
                    />
                  </div>
                  {/* Project title - refined typography with better letter-spacing */}
                  <h3 className="relative z-10 mt-4 text-sm font-semibold leading-6 tracking-[-0.005em] text-zinc-900 sm:mt-5 sm:text-[15px] dark:text-zinc-50">
                    <CardLink
                      href={project.link.href}
                      target="_blank"
                      aria-label={`${project.name} - Opens in new tab`}
                    >
                      {project.name}
                    </CardLink>
                  </h3>
                  {/* Description - improved line-height for readability */}
                  <p className="relative z-10 mt-2 flex-grow text-xs leading-[1.65] text-zinc-600 line-clamp-3 sm:mt-3 sm:text-[13px] sm:leading-[1.6] dark:text-zinc-400">
                    {project.description}
                  </p>
                  {/* Link label - enhanced focus indicator and accessibility */}
                  <p
                    className="relative z-10 mt-auto flex min-h-[44px] items-center gap-1.5 pt-3 text-xs font-medium text-zinc-500 transition-all duration-200 group-hover/card:text-teal-600 group-active/card:scale-[0.98] sm:pt-4 sm:text-[13px] dark:text-zinc-400 dark:group-hover/card:text-teal-400"
                    aria-hidden="true"
                  >
                    <LinkIcon className="h-4 w-4 flex-none transition-transform duration-200 group-hover/card:rotate-[-8deg]" />
                    <span className="truncate">{project.link.label}</span>
                  </p>
                </Card>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {/* Icon8 Credits Section - subtle and non-distracting */}
      <Container className="mt-16 sm:mt-20 md:mt-24">
        <aside
          className="rounded-xl border border-zinc-200/50 bg-zinc-50/30 p-4 opacity-70 transition-all duration-200 hover:border-zinc-200/80 hover:opacity-100 sm:rounded-2xl sm:p-5 dark:border-zinc-800/50 dark:bg-zinc-900/20 dark:hover:border-zinc-700/70"
          aria-label="Icon attribution"
        >
          <h2 className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 sm:text-xs dark:text-zinc-500">
            Icon Credits
          </h2>
          <p className="mt-2 text-[10px] leading-relaxed text-zinc-400 sm:text-[11px] sm:leading-relaxed dark:text-zinc-500">
            Icons by{' '}
            <a
              href="https://icons8.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors duration-150 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 active:text-zinc-700 dark:hover:text-zinc-400 dark:active:text-zinc-300 dark:focus-visible:ring-offset-zinc-900"
            >
              Icons8
            </a>{' '}
            &mdash;{' '}
            <a
              href="https://icons8.com/icon/24895/npm"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              NPM
            </a>
            ,{' '}
            <a
              href="https://icons8.com/icon/63785/chrome"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              Chrome
            </a>
            ,{' '}
            <a
              href="https://icons8.com/icon/9vlfB9hjA1lX/react-a-javascript-library-for-building-user-interfaces"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              React
            </a>
            ,{' '}
            <a
              href="https://icons8.com/icon/YO3YqSaTOu5K/vite"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              Vite
            </a>
            ,{' '}
            <a
              href="https://icons8.com/icon/3VGtaw5gCc8T/redux-an-open-source-javascript-library-for-managing-application-state"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              Redux
            </a>
            ,{' '}
            <a
              href="https://icons8.com/icon/yUdJlcKanVbh/next.js"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              Next.js
            </a>
            ,{' '}
            <a
              href="https://icons8.com/icon/nuPce-GYYZeC/console"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              Shell
            </a>
            ,{' '}
            <a
              href="https://icons8.com/icon/9OGIyU8hrxW5/visual-studio-code-2019"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              VS Code
            </a>
            ,{' '}
            <a
              href="https://icons8.com/icon/JTj1N49eUpVk/storybook"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              Storybook
            </a>
            ,{' '}
            <a
              href="https://icons8.com/icon/WbRVMGxOfiNl/mac-os"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-150 hover:text-zinc-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:hover:text-zinc-400 dark:focus-visible:ring-offset-zinc-900"
            >
              macOS
            </a>
          </p>
        </aside>
      </Container>
    </SimpleLayout>
  )
}
