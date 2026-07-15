import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'

test('/projects', async ({ page }, testInfo) => {
  await page.goto('/projects')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/projects`,
  )
})

test('featured Skills Desktop renders with Active status label', async ({
  page,
}) => {
  // Arrange
  await page.goto('/projects')

  // Act: featured projects render inside <article> with h2 headings.
  const skillsDesktopCard = page.locator('article').filter({
    has: page.locator('h2', { hasText: 'Skills Desktop' }),
  })

  // Assert: card is present, links externally, and shows ACTIVE status (uppercase via CSS).
  await expect(skillsDesktopCard).toBeVisible()
  await expect(
    skillsDesktopCard.locator('a[href="https://skills-desktop.vercel.app/"]'),
  ).toHaveAttribute('target', '_blank')
  // Status label is rendered "Active" but transformed to "ACTIVE" via Tailwind `uppercase`.
  // The label is duplicated in DOM (desktop block + mobile-expansion block) so we
  // assert containment rather than count — the spec is "status text is wired to this card",
  // not "rendered exactly once".
  await expect(skillsDesktopCard).toContainText('Active')
})

test('featured electron-mcp-server renders with Experiment status label', async ({
  page,
}) => {
  // Arrange
  await page.goto('/projects')

  // Act
  const electronMcpCard = page.locator('article').filter({
    has: page.locator('h2', { hasText: 'electron-mcp-server' }),
  })

  // Assert: present + EXPERIMENT label (uppercase via CSS).
  // Same desktop/mobile DOM-duplication caveat as the Active-label test above.
  await expect(electronMcpCard).toBeVisible()
  await expect(electronMcpCard).toContainText('Experiment')
})

test('archive Clean URL renders with Chrome Extension category', async ({
  page,
}) => {
  // Arrange
  await page.goto('/projects')

  // Act: archive items render as <li> inside the archive <ul>.
  const cleanUrlLink = page.locator(
    'a[href="https://chromewebstore.google.com/detail/clean-url/konddpmmdjghlicegcfdjehalocbkmpl"]',
  )

  // Assert: link is present, external, and shows the category.
  await expect(cleanUrlLink).toBeVisible()
  await expect(cleanUrlLink).toHaveAttribute('target', '_blank')
  await expect(cleanUrlLink).toContainText('Clean URL')
  await expect(cleanUrlLink).toContainText(/chrome extension/i)
})

test('archive Coffee Timer renders with Web App category', async ({ page }) => {
  // Arrange
  await page.goto('/projects')

  // Act
  const coffeeTimerLink = page.locator(
    'a[href="https://github.com/laststance/coffee-timer"]',
  )

  // Assert
  await expect(coffeeTimerLink).toBeVisible()
  await expect(coffeeTimerLink).toHaveAttribute('target', '_blank')
  await expect(coffeeTimerLink).toContainText('Coffee Timer')
  await expect(coffeeTimerLink).toContainText(/web app/i)
})

test('featured section shows 8 projects and stable section shows 22', async ({
  page,
}) => {
  // Arrange
  await page.goto('/projects')

  // Act: featured cards are <article>; stable items are <li> inside the stable list.
  const featuredCards = page.locator('section[aria-label="Featured projects"] article')
  const stableSection = page.locator('section[aria-label="Stable projects"]')
  const stableItems = stableSection.locator('li')

  // Assert: structural counts catch accidental featured ↔ stable misplacement.
  await expect(featuredCards).toHaveCount(8)
  await expect(
    stableSection.getByRole('heading', { name: 'Stable', exact: true }),
  ).toBeVisible()
  await expect(stableItems).toHaveCount(22)
})
