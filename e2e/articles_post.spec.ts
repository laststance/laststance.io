import { argosScreenshot } from '@argos-ci/playwright'
import { test } from '@playwright/test'

test('/articles/dropped-eslint-plugin-sort-keys-custom-order-from-eslint-config-ts-prefixerv1120', async ({
  page,
}, testInfo) => {
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/articles/dropped-eslint-plugin-sort-keys-custom-order-from-eslint-config-ts-prefixerv1120`,
  )
})
