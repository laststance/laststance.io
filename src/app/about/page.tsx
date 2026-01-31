import clsx from 'clsx'
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import { Box, Text, VStack } from '@/components/ui/primitives'
import { env } from '@/env.mjs'
import portraitImage from '@/images/gonnahell.jpeg'

const title = 'About'
export const metadata: Metadata = {
  title: title,
  description: 'An independent organization for OSS activity.',
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
}

function SocialLink({
  children,
  className,
  href,
  icon: Icon,
}: {
  children: React.ReactNode
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}) {
  const isExternalLink =
    href.startsWith('http') && !href.startsWith(env.NEXT_PUBLIC_SITE_URL || '')
  const isEmailLink = href.startsWith('mailto:')

  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-base font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500 sm:text-lg"
        {...(isExternalLink && !isEmailLink
          ? {
              target: '_blank',
              rel: 'noopener noreferrer',
              'aria-label': `${children} (opens in new tab)`,
            }
          : {})}
        {...(isEmailLink
          ? {
              'aria-label': `Send email to ${children}`,
            }
          : {})}
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <Box maxW="xs" px={2} className="lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Ryota Murakami portrait photo"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </Box>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <Text variant="h1">
            Laststance.io is my experimental laboratory for eliminate like this.
            ➡️
          </Text>
          <VStack gap={6} className="mt-6">
            <Text variant="body" color="muted">
              I'm{' '}
              <a
                href="https://ryota-murakami.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ryota Murakami's personal website (opens in new tab)"
                className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
              >
                Ryota Murakami live in Tokyo,
              </a>
              here is website of my personal Github organization.
              <br />
              <br />
              Initially, Laststance.io was just a Github organization created
              for use to name a NPM scoped name, such as "@foo/mylib", prevent
              new package name already used others.
            </Text>
            <Text variant="body" color="muted">
              But now it has become an important hub for me to co-locate all OSS
              activities.
            </Text>
            <Text variant="body" color="muted">
              Laststance.io is currently focusing on React and other web
              development issues, as well as developing and researching
              toolchains to improve the quality of software development and the
              developer experience.
            </Text>
            <Text variant="body" color="muted">
              Laststance.io final gig is making the best web application
              framework. <br />
              You have no time to do it within 8h 5days per week and your
              exhausted by daily job"? Then work 3 days a week, inventing all
              webdev/OSS things.
            </Text>
          </VStack>
        </div>
        <div className="lg:pl-20">
          <ul>
            <SocialLink href="https://twitter.com/malloc007" icon={TwitterIcon}>
              Follow on Twitter
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/ryota_murakam1/"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://github.com/ryota-murakami"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/ryota-murakami-ba9206164/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:contact@laststance.io"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              contact@laststance.io
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
