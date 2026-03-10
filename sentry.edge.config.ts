// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
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
