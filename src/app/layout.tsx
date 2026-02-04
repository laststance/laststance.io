import { Analytics } from '@vercel/analytics/react'
import { type Metadata } from 'next'

import { Footer } from '@/components/Footer' 
import { Header } from '@/components/Header'
import { HydrationFix } from '@/components/HydrationFix'
import { env } from '@/env.mjs'

import { ProvidersClient } from './providers.client'

import '@/styles/global.css'

export const metadata: Metadata = {
  title: {
    default: 'Laststance.io',
    template: '%s - Laststance.io',
  },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': `${env.NEXT_PUBLIC_SITE_URL || 'https://laststance.io'}/feed.xml`,
    },
  },
  description: 'An independent OSS organization for coding projects.',
  metadataBase: new URL('https://laststance.io/'),
  openGraph: {
    title: 'Laststance.io',
    description: 'An independent OSS organization for coding projects.',
    images: [`/api/og?title=Laststance.io`],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body className="flex min-h-full bg-zinc-50 dark:bg-black">
        <HydrationFix />
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
    <div className="fixed inset-0 flex justify-center max-xs:w-screen sm:px-8">
      {/* max-w-7xl: コンテンツエリアの最大幅に合わせた制限 */}
      <div className="flex w-full max-w-7xl lg:px-8">
        {/* 実際の背景カード: ライト=白、ダーク=zinc-900 */}
        {/* ring-1: 薄いボーダーでカードの端を強調 */}
        <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"></div>
      </div>
    </div>
  )
}

