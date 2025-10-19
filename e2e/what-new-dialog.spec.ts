import { argosScreenshot } from '@argos-ci/playwright'
import { test, expect } from '@playwright/test'

test("What's New dialog", async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: "Open What's New dialog" })).toBeVisible()

  await expect(page.getByRole('banner')).toContainText("What's New?")

  await page.getByRole('button', { name: "Open What's New dialog" }).click()

  await expect(page.getByRole('dialog')).toBeVisible()
  await argosScreenshot(page, `[${testInfo.project.name}]: What's New dialog`)

  await expect(page.getByRole('dialog')).toContainText('2023-12-18')
  await expect(page.getByText('Keybinds: update selection')).toBeVisible()

  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible()
  await page.getByRole('button', { name: 'Close' }).click()

  await expect(page.getByRole('dialog')).not.toBeVisible()
})

test("What's New dialog - no layout shift on open/close", async ({ page }) => {
  await page.goto('/')

  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle')

  // Measure the initial viewport and scrollbar width
  const initialViewportWidth = await page.evaluate(() => {
    return {
      innerWidth: window.innerWidth,
      documentWidth: document.documentElement.clientWidth,
      scrollbarWidth: window.innerWidth - document.documentElement.clientWidth,
      bodyOffsetLeft: document.body.offsetLeft
    }
  })

  // Open the modal
  await page.getByRole('button', { name: "Open What's New dialog" }).click({ force: true })
  await expect(page.getByRole('dialog')).toBeVisible()

  // Wait for any animations to complete
  await page.waitForTimeout(500)

  // Measure after modal opens
  const openViewportWidth = await page.evaluate(() => {
    return {
      innerWidth: window.innerWidth,
      documentWidth: document.documentElement.clientWidth,
      scrollbarWidth: window.innerWidth - document.documentElement.clientWidth,
      bodyOffsetLeft: document.body.offsetLeft
    }
  })

  // Verify no horizontal shift occurred - body should not have moved
  expect(openViewportWidth.bodyOffsetLeft).toBe(initialViewportWidth.bodyOffsetLeft)

  // Close the modal
  await page.getByRole('button', { name: 'Close' }).click({ force: true })
  await expect(page.getByRole('dialog')).not.toBeVisible()

  // Wait for any animations to complete
  await page.waitForTimeout(500)

  // Measure after modal closes
  const closedViewportWidth = await page.evaluate(() => {
    return {
      innerWidth: window.innerWidth,
      documentWidth: document.documentElement.clientWidth,
      scrollbarWidth: window.innerWidth - document.documentElement.clientWidth,
      bodyOffsetLeft: document.body.offsetLeft
    }
  })

  // Verify position returned to initial state
  expect(closedViewportWidth.bodyOffsetLeft).toBe(initialViewportWidth.bodyOffsetLeft)
})
