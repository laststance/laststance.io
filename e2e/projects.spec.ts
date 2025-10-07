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

  // Check the project title
  await expect(cleanUrlCard.locator('h2')).toHaveText('Clean URL')

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

  // Check the link label using a more specific selector
  const linkLabel = cleanUrlCard.locator('p.relative span.ml-2')
  await expect(linkLabel).toHaveText('Clean URL')
})

test('Clean URL should be the first project in the list', async ({ page }) => {
  await page.goto('/projects')

  // Wait for the page to fully load and the project list to be rendered
  await page.waitForSelector('ul > li h2', { state: 'visible' })

  // Get all project titles
  const projectTitles = await page.locator('ul > li h2').allTextContents()

  // Check that Clean URL is the first item
  expect(projectTitles[0]).toBe('Clean URL')
})
