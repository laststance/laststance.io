import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PERSONAL_ACCESS_TOKEN: z.string().min(1).startsWith('ghp_'),
  },

  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  },

  runtimeEnv: {
    PERSONAL_ACCESS_TOKEN: process.env.PERSONAL_ACCESS_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
})
