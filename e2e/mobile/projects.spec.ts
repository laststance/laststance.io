import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'

test('projects', async ({ page }) => {
  await page.goto('http://localhost:3000/projects')
  await expect(
    page.getByText('I eliminate all unnecessary complexity from Web Dev.'),
  ).toBeVisible()

  await argosScreenshot(page, 'mobile_projects')
})