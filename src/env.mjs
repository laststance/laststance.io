import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    REVALIDATE_SECRET: z.string().min(16).optional(),
  },

  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  },
})
