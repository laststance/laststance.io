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

  // Find the Clean URL project card
  const cleanUrlCard = page.locator('li').filter({
    hasText: 'Clean URL',
  })

  // Check that the card exists
  await expect(cleanUrlCard).toBeVisible()

  // Check the project title (h3 in new category-based layout)
  await expect(cleanUrlCard.locator('h3')).toHaveText('Clean URL')

  // Check the project description contains the key text
  await expect(cleanUrlCard).toContainText(
    'Chrome extension that removes tracking parameters from URLs',
  )

  // Check the link
  const link = cleanUrlCard.locator('a[href*="chromewebstore.google.com"]')
  await expect(link).toHaveAttribute(
    'href',
    'https://chromewebstore.google.com/detail/clean-url/konddpmmdjghlicegcfdjehalocbkmpl',
  )
  await expect(link).toHaveAttribute('target', '_blank')

  // Check that the Chrome logo is displayed
  const logo = cleanUrlCard.locator('img').first()
  await expect(logo).toBeVisible()
  await expect(logo).toHaveAttribute('src', expect.stringContaining('chrome'))

  // Check the link label using updated selector for new layout
  const linkLabel = cleanUrlCard.locator('p span.truncate')
  await expect(linkLabel).toHaveText('Clean URL')
})

test('Coffee Timer project should be displayed correctly', async ({ page }) => {
  await page.goto('/projects')

  // Find the Coffee Timer project card
  const coffeeTimerCard = page.locator('li').filter({
    hasText: 'Coffee Timer',
  })

  // Check that the card exists
  await expect(coffeeTimerCard).toBeVisible()

  // Check the project title (h3 in new category-based layout)
  await expect(coffeeTimerCard.locator('h3')).toHaveText('Coffee Timer')

  // Check the project description contains the key text
  await expect(coffeeTimerCard).toContainText(
    'Simple timer PWA for coffee breaks',
  )

  // Check the link
  const link = coffeeTimerCard.locator('a[href*="github.com"]')
  await expect(link).toHaveAttribute(
    'href',
    'https://github.com/laststance/coffee-timer',
  )
  await expect(link).toHaveAttribute('target', '_blank')

  // Check that the Next.js logo is displayed
  const logo = coffeeTimerCard.locator('img').first()
  await expect(logo).toBeVisible()
  await expect(logo).toHaveAttribute('src', expect.stringContaining('nextjs'))

  // Check the link label using updated selector for new layout
  const linkLabel = coffeeTimerCard.locator('p span.truncate')
  await expect(linkLabel).toHaveText('coffee-timer')
})

test('Projects list should contain Clean URL and Coffee Timer', async ({
  page,
}) => {
  await page.goto('/projects')

  // Wait for the page to fully load and the project list to be rendered
  // Project names are in h3 in the new category-based layout
  await page.waitForSelector('ul > li h3', { state: 'visible' })

  // Get all project titles (h3 elements inside list items)
  const projectTitles = await page.locator('ul > li h3').allTextContents()

  // Check that Clean URL exists in the list (position-independent)
  expect(projectTitles).toContain('Clean URL')
  // Check that Coffee Timer exists in the list
  expect(projectTitles).toContain('Coffee Timer')
})
