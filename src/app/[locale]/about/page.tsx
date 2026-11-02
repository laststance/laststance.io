import clsx from 'clsx'
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import { Box, Text, VStack } from '@/components/ui/primitives'
import { env } from '@/env.mjs'
import { getPageMetadata } from '@/i18n/pageMetadata'
import { proseTags } from '@/i18n/proseTags'
import portraitImage from '@/images/gonnahell.jpeg'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('about')
}

/**
 * One contact link in the About sidebar.
 *
 * `label` is a string, not children, because the aria-label is composed from it
 * in the visitor's language ("… (opens in new tab)" or "Send email to …").
 */
function SocialLink({
  label,
  className,
  href,
  icon: Icon,
}: {
  label: string
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}) {
  const t = useTranslations('Common')
  const isExternalLink =
    href.startsWith('http') && !href.startsWith(env.NEXT_PUBLIC_SITE_URL || '')
  const isEmailLink = href.startsWith('mailto:')

  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex min-h-11 items-center text-base font-medium text-zinc-800 transition hover:text-teal-500 sm:text-lg dark:text-zinc-200 dark:hover:text-teal-500"
        {...(isExternalLink && !isEmailLink
          ? {
              target: '_blank',
              rel: 'noopener noreferrer',
              'aria-label': t('opensInNewTab', { label }),
            }
          : {})}
        {...(isEmailLink
          ? {
              'aria-label': t('sendEmailTo', { email: label }),
            }
          : {})}
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{label}</span>
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
  const t = useTranslations('pages.about')
  const common = useTranslations('Common')
  // 96px top offset (mt-16 sm:mt-24) to match SimpleLayout, /projects, and the article pages.
  return (
    <Container className="page-start">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16">
        <div className="min-w-0">
          <Box maxW="xs" px={2} className="lg:max-w-none">
            <Image
              src={portraitImage}
              alt={t('portraitAlt')}
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </Box>
        </div>
        <div className="min-w-0 lg:order-first lg:row-span-2">
          <Text variant="h1">{t('heading')}</Text>
          <VStack gap={6} className="page-intro">
            <Text variant="body" color="muted">
              {t.rich('intro', {
                ...proseTags,
                link: (chunks) => (
                  <a
                    href="https://ryota-murakami.github.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={common('personalSiteLabel')}
                    className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </Text>
            <Text variant="body" color="muted">
              {t('hub')}
            </Text>
            <Text variant="body" color="muted">
              {t('focus')}
            </Text>
            <Text variant="body" color="muted">
              {t.rich('finalGig', proseTags)}
            </Text>
          </VStack>
        </div>
        <div className="min-w-0">
          <ul>
            <SocialLink
              href="https://twitter.com/malloc007"
              icon={TwitterIcon}
              label={t('followOn.twitter')}
            />
            <SocialLink
              href="https://www.instagram.com/ryota_murakam1/"
              icon={InstagramIcon}
              className="mt-4"
              label={t('followOn.instagram')}
            />
            <SocialLink
              href="https://github.com/ryota-murakami"
              icon={GitHubIcon}
              className="mt-4"
              label={t('followOn.github')}
            />
            <SocialLink
              href="https://www.linkedin.com/in/ryota-murakami-ba9206164/"
              icon={LinkedInIcon}
              className="mt-4"
              label={t('followOn.linkedin')}
            />
            <SocialLink
              href="mailto:contact@laststance.io"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              label="contact@laststance.io"
            />
          </ul>
        </div>
      </div>
    </Container>
  )
}
