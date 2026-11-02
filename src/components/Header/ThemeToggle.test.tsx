import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { describe, test, expect, vi, beforeEach } from 'vitest'

import { catalogs } from '@/i18n/catalogs'

import { ThemeToggle } from './ThemeToggle'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

/** Renders the toggle inside the same next-intl provider the layout gives it. */
function renderInLocale(locale: 'en' | 'ja'): void {
  render(
    <NextIntlClientProvider locale={locale} messages={catalogs[locale]}>
      <ThemeToggle />
    </NextIntlClientProvider>,
  )
}

describe('ThemeToggle', () => {
  const mockSetTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should render with light theme', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
      theme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    } as any)

    renderInLocale('en')

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /switch to dark theme/i,
      })
      expect(button).toBeInTheDocument()
    })
  })

  test('should render with dark theme', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      theme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
    } as any)

    renderInLocale('en')

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /switch to light theme/i,
      })
      expect(button).toBeInTheDocument()
    })
  })

  test('should toggle theme when clicked', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
      theme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    } as any)

    renderInLocale('en')

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /switch to dark theme/i,
      })
      fireEvent.click(button)
    })

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  test('should toggle from dark to light', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      theme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
    } as any)

    renderInLocale('en')

    await waitFor(() => {
      const button = screen.getByRole('button', {
        name: /switch to light theme/i,
      })
      fireEvent.click(button)
    })

    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  test('should have appropriate accessible label', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
      theme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    } as any)

    renderInLocale('en')

    await waitFor(() => {
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Switch to dark theme')
    })
  })

  test('announces the switch to dark theme in Japanese for Japanese visitors', async () => {
    // Arrange
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
      theme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    } as any)

    // Act
    renderInLocale('ja')

    // Assert
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'ダークテーマに切り替え',
      )
    })
  })
})
