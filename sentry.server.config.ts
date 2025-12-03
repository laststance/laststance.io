// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://5e977b65922d736b1f2b29c7c6cd9ccc@o1245861.ingest.us.sentry.io/4510397497409536',

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Disable error reporting in development environment
  beforeSend(event) {
    if (process.env.NODE_ENV !== 'production') {
      return null // Don't send events in development
    }
    return event
  },
})
