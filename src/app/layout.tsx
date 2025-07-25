import { Analytics } from '@vercel/analytics/react'
import { type Metadata } from 'next'

import { Layout } from '@/components/Layout'
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
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <meta name="view-transition" content="same-origin" />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <ProvidersClient>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </ProvidersClient>
        <Analytics />
      </body>
    </html>
  )
}
