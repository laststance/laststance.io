// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://5e977b65922d736b1f2b29c7c6cd9ccc@o1245861.ingest.us.sentry.io/4510397497409536',

  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,

  // Add optional integrations for additional features
  integrations: [Sentry.replayIntegration()],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Enable sending user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Filter out noise from development and preview environments
  beforeSend(event) {
    if (process.env.NODE_ENV !== 'production') {
      return null // Don't send events in development
    }

    // Drop hydration errors from Vercel preview deployments (bot/synthetic traffic)
    const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    const serialized = event.extra?.['__serialized__'] as
      | { message?: string }
      | undefined
    const isHydrationError =
      event.message?.includes('Hydration') ||
      serialized?.message?.includes('Hydration') ||
      event.tags?.['issue.type'] === 'replay_hydration_error'
    if (isPreview && isHydrationError) {
      return null
    }

    return event
  },
})

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart
