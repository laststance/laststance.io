import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeToggle } from './ThemeToggle'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

describe('ThemeToggle', () => {
  const mockSetTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with light theme', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
      theme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    } as any)

    render(<ThemeToggle />)

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /switch to dark theme/i })
      expect(button).toBeInTheDocument()
    })
  })

  it('should render with dark theme', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      theme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
    } as any)

    render(<ThemeToggle />)

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /switch to light theme/i })
      expect(button).toBeInTheDocument()
    })
  })

  it('should toggle theme when clicked', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
      theme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    } as any)

    render(<ThemeToggle />)

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /switch to dark theme/i })
      fireEvent.click(button)
    })

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('should toggle from dark to light', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      theme: 'dark',
      themes: ['light', 'dark'],
      systemTheme: 'dark',
    } as any)

    render(<ThemeToggle />)

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /switch to light theme/i })
      fireEvent.click(button)
    })

    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('should have appropriate accessible label', async () => {
    const { useTheme } = await import('next-themes')
    vi.mocked(useTheme).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
      theme: 'light',
      themes: ['light', 'dark'],
      systemTheme: 'light',
    } as any)

    render(<ThemeToggle />)

    await waitFor(() => {
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Switch to dark theme')
    })
  })
})