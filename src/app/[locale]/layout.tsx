import { Analytics } from '@vercel/analytics/react'
import { type Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HydrationFix } from '@/components/HydrationFix'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/siteUrl'

import { ProvidersClient } from './providers.client'

import '@/styles/global.css'

/**
 * Prerenders every page once per locale (`/en/...` and `/ja/...`); the proxy
 * picks which copy a visitor gets.
 *
 * Called by Next at build time. No `dynamicParams = false`, because Next applies
 * it across segments and it would turn the `[...rest]` localized 404 into a
 * plain one.
 */
export function generateStaticParams(): Array<{ locale: string }> {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * Site-wide metadata with the description in the visitor's locale.
 *
 * Called by Next for every page under `[locale]`; pages override `title` and
 * `description` through their own metadata. The brand title, template and OG
 * image stay English.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')
  return {
    title: {
      default: 'Laststance.io',
      template: '%s - Laststance.io',
    },
    alternates: {
      canonical: '/',
      types: {
        'application/rss+xml': `${SITE_URL}/feed.xml`,
      },
    },
    description: t('description'),
    metadataBase: new URL('https://laststance.io/'),
    openGraph: {
      title: 'Laststance.io',
      description: t('description'),
      images: [`/api/og?title=Laststance.io`],
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

/**
 * Root layout: sits under `[locale]`, which makes `locale` a root param that
 * {@link getRequestConfig} reads through `next/root-params`.
 *
 * Props are typed by hand rather than with `LayoutProps`, because CI runs bare
 * `tsc` without `next typegen`. `pages.*` prose is dropped from the client
 * messages so it never enters the RSC payload.
 */
export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<React.JSX.Element> {
  const locale = await getLocale()
  const { pages: _serverOnly, ...clientMessages } = await getMessages()

  return (
    <html lang={locale} className="antialiased" suppressHydrationWarning>
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body
        className="flex min-h-full bg-zinc-50 dark:bg-black"
        suppressHydrationWarning
      >
        <HydrationFix />
        <NextIntlClientProvider messages={clientMessages}>
          <ProvidersClient>
            <div className="flex w-full">
              <BackGround />
              <div className="relative flex w-full flex-col">
                <Header />
                <main className="flex-auto">{children}</main>
                <Footer />
              </div>
            </div>
          </ProvidersClient>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

/**
 * 📐 BackGround
 * ページ全体の背景レイヤーを提供する装飾コンポーネント。
 * fixed配置で画面全体をカバーし、コンテンツの下に表示される。
 * ライト/ダークモード対応の背景色とボーダーを持つ。
 */
function BackGround() {
  // fixed + inset-0: ビューポート全体に固定
  // このコンポーネントはソースオーダーでコンテンツより先に配置することで
  // 自動的にコンテンツの背景として機能する
  return (
    <div className="max-xs:w-screen fixed inset-0 flex justify-center sm:px-8">
      {/* max-w-7xl: コンテンツエリアの最大幅に合わせた制限 */}
      <div className="flex w-full max-w-7xl lg:px-8">
        {/* 実際の背景カード: ライト=白、ダーク=zinc-900 */}
        {/* ring-1: 薄いボーダーでカードの端を強調 */}
        <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"></div>
      </div>
    </div>
  )
}
