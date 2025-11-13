import { type Metadata } from 'next'
import Image from 'next/image'

import { Card, CardLink, CardDescription } from '@/components/Card'
import { Container } from '@/components/Container'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { SimpleLayout } from '@/components/SimpleLayout'
import chromeLogo from '@/images/logos/icons8-chrome-48.png'
import nextLogo from '@/images/logos/icons8-nextjs-48.png'
import npmLogo from '@/images/logos/icons8-npm-48.png'
import reactLogo from '@/images/logos/icons8-react-a-javascript-library-for-building-user-interfaces-32.png'
import reduxLogo from '@/images/logos/icons8-redux-48.png'
import shellLogo from '@/images/logos/icons8-shell-40.png'
import viteLogo from '@/images/logos/icons8-vite-48.png'
import mcpLogo from '@/images/logos/mcp.svg'

const title = 'Projects'

export const metadata: Metadata = {
  title: title,
  description: 'Laststance.io Github repositories.',
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
}

const projects = [
  { name: '@laststance/react-next-eslint-plugin',
    description: 'A collection of ESLint plugins for React and Next.js.',
    link: {
      href: 'https://github.com/laststance/react-next-eslint-plugin',
      label: 'react-next-eslint-plugin',
    },
    logo: npmLogo,
  },
  {
    name: 'do-i-need-umbrella',
    description:
      'helps you decide whether you need an umbrella based on weather forecasts. ',
    link: {
      href: 'https://github.com/laststance/do-i-need-an-umbrella',
      label: 'do-i-need-umbrella',
    },
    logo: reactLogo,
  },
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
    name: 'Clean URL',
    description:
      'Chrome extension that removes tracking parameters from URLs, protecting your privacy while browsing.',
    link: {
      href: 'https://chromewebstore.google.com/detail/clean-url/konddpmmdjghlicegcfdjehalocbkmpl',
      label: 'Clean URL',
    },
    logo: chromeLogo,
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
    name: 'Redux Front Page',
    description: 'Solve the Redux documentation fragmentation problem.',
    link: {
      href: 'https://github.com/laststance/Redux-Front-Page',
      label: 'Redux Front Page',
    },
    logo: reduxLogo,
  },
  {
    name: 'nsx',
    description: 'Just logging tech resources I read.',
    link: { href: 'https://github.com/laststance/nsx', label: 'nsx' },
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
    name: 'React TypeScript TodoMVC 2022',
    description: 'A Modern Code Style Todo Example.',
    link: {
      href: 'https://github.com/laststance/react-typescript-todomvc-2022',
      label: 'React TypeScript TodoMVC 2022',
    },
    logo: reactLogo,
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
  {
    name: 'dotfiles',
    description: '👨‍💻 My Mac OS X setup manual.',
    link: {
      href: 'https://github.com/ryota-murakami/dotfiles',
      label: 'dotfiles',
    },
    logo: shellLogo,
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
      <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <CardLink href={project.link.href} target="_blank">
                {project.name}
              </CardLink>
            </h2>
            <CardDescription>{project.description}</CardDescription>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <LinkIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
      <Container className="grid place-content-center mt-32">
        <h2 className="text-3xl pb-2 ml-[-0.75rem]">Icon8 Credit</h2>
        <ul className="list-disc">
          <li>
            <a target="_blank" href="https://icons8.com/icon/24895/npm">
              NPM
            </a>{' '}
            icon by{' '}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </li>
          <li>
            <a target="_blank" href="https://icons8.com/icon/63785/chrome">
              Chrome
            </a>{' '}
            icon by{' '}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://icons8.com/icon/9vlfB9hjA1lX/react-a-javascript-library-for-building-user-interfaces"
            >
              React a JavaScript library for building user interfaces
            </a>{' '}
            icon by{' '}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </li>
          <li>
            <a target="_blank" href="https://icons8.com/icon/YO3YqSaTOu5K/vite">
              Vite
            </a>{' '}
            icon by{' '}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://icons8.com/icon/3VGtaw5gCc8T/redux-an-open-source-javascript-library-for-managing-application-state"
            >
              Redux an open-source JavaScript library for managing application
              state
            </a>{' '}
            icon by{' '}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://icons8.com/icon/yUdJlcKanVbh/next.js"
            >
              Nextjs
            </a>{' '}
            icon by{' '}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://icons8.com/icon/nuPce-GYYZeC/console"
            >
              Shell
            </a>{' '}
            icon by{' '}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </li>
        </ul>
      </Container>
    </SimpleLayout>
  )
}
