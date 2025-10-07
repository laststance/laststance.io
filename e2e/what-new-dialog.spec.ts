import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'

test("What's New dialog", async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: "Open What's New dialog" })).toBeVisible()

  await expect(page.getByRole('banner')).toContainText("What's New?")

  await page.getByRole('button', { name: "Open What's New dialog" }).click()

  await expect(page.getByRole('dialog')).toBeVisible()
  await argosScreenshot(page, `[${testInfo.project.name}]: What's New dialog`)

  await expect(page.getByLabel("What's New?")).toContainText('2023-12-18')
  await expect(page.getByText('Keybinds: update selection')).toBeVisible()

  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible()
  await page.getByRole('button', { name: 'Close' }).click()

  await expect(page.getByRole('dialog')).not.toBeVisible()
})
