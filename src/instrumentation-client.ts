// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

Sentry.init({
  // Only send events in Vercel production environment
  dsn: isProduction
    ? 'https://5e977b65922d736b1f2b29c7c6cd9ccc@o1245861.ingest.us.sentry.io/4510397497409536'
    : undefined,

  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,

  integrations: [Sentry.replayIntegration()],

  tracesSampleRate: 1,
  enableLogs: true,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  sendDefaultPii: true,
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
