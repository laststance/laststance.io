// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const isProduction = process.env.VERCEL_ENV === 'production'

Sentry.init({
  // Only send events in Vercel production environment
  dsn: isProduction
    ? 'https://5e977b65922d736b1f2b29c7c6cd9ccc@o1245861.ingest.us.sentry.io/4510397497409536'
    : undefined,

  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,

  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
})
