import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PERSONAL_ACCESS_TOKEN: z.string().min(1).startsWith('ghp_'),
  },

  runtimeEnv: {
    PERSONAL_ACCESS_TOKEN: process.env.PERSONAL_ACCESS_TOKEN,
  },
})
