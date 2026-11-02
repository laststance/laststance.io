import type en from './messages/en'
import type { routing } from './routing'

// English is the type source, so every t() key and ICU argument is checked against en.ts.
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof en
  }
}
