import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'

test('/projects', async ({ page }, testInfo) => {
  await page.goto('/projects')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/projects`,
  )
})

test('Clean URL project should be displayed correctly', async ({ page }) => {
  await page.goto('/projects')

  // Find the Clean URL project card (article element with h2 title)
  const cleanUrlCard = page.locator('article').filter({
    has: page.locator('h2', { hasText: 'Clean URL' }),
  })

  // Check that the card exists
  await expect(cleanUrlCard).toBeVisible()

  // Check the project title (h2 in minimal list layout)
  await expect(cleanUrlCard.locator('h2')).toHaveText('Clean URL')

  // The link wraps the entire card content
  const link = cleanUrlCard.locator(
    'a[href="https://chromewebstore.google.com/detail/clean-url/konddpmmdjghlicegcfdjehalocbkmpl"]',
  )
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('target', '_blank')

  // Check that the Chrome logo is displayed
  const logo = cleanUrlCard.locator('img').first()
  await expect(logo).toBeVisible()
})

test('Coffee Timer project should be displayed correctly', async ({ page }) => {
  await page.goto('/projects')

  // Find the Coffee Timer project card (article element with h2 title)
  const coffeeTimerCard = page.locator('article').filter({
    has: page.locator('h2', { hasText: 'Coffee Timer' }),
  })

  // Check that the card exists
  await expect(coffeeTimerCard).toBeVisible()

  // Check the project title (h2 in minimal list layout)
  await expect(coffeeTimerCard.locator('h2')).toHaveText('Coffee Timer')

  // The link wraps the entire card content
  const link = coffeeTimerCard.locator(
    'a[href="https://github.com/laststance/coffee-timer"]',
  )
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('target', '_blank')

  // Check that the Next.js logo is displayed
  const logo = coffeeTimerCard.locator('img').first()
  await expect(logo).toBeVisible()
})

test('Projects list should contain Clean URL and Coffee Timer', async ({
  page,
}) => {
  await page.goto('/projects')

  // Wait for the page to fully load and the project list to be rendered
  // Project names are in h2 inside article elements (minimal list layout)
  await page.waitForSelector('article h2', { state: 'visible' })

  // Get all project titles (h2 elements inside articles)
  const projectTitles = await page.locator('article h2').allTextContents()

  // Check that Clean URL exists in the list (position-independent)
  expect(projectTitles).toContain('Clean URL')
  // Check that Coffee Timer exists in the list
  expect(projectTitles).toContain('Coffee Timer')
})
