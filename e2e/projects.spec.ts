import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'

test('/projects', async ({ page }, testInfo) => {
  await page.goto('/projects')
  await argosScreenshot(
    page,
    `[${testInfo.project.name}] https://laststance.io/projects`,
  )
})

test('published projects show their purpose without status labels', async ({
  page,
}) => {
  // Arrange
  await page.goto('/projects')
  // Act
  const skillsDesktop = page
    .locator('article')
    .filter({ has: page.getByRole('heading', { name: 'Skills Desktop' }) })
  // Assert
  await expect(skillsDesktop).toBeVisible()
  await expect(skillsDesktop.locator('p').first()).toBeVisible()
  await expect(skillsDesktop.locator('a')).toHaveAttribute('target', '_blank')
  await expect(skillsDesktop).not.toContainText('Active')
  await expect(
    page.locator('section[aria-label="Featured projects"] article'),
  ).toHaveCount(8)
  await expect(
    page.locator('section[aria-label="Stable projects"]'),
  ).toHaveCount(0)
})
