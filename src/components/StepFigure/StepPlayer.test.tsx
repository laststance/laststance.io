import { act, fireEvent, render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { catalogs } from '@/i18n/catalogs'

import { StepPlayer } from './StepPlayer'

/**
 * Stands in for the browser's `(prefers-reduced-motion: reduce)` query, which jsdom lacks.
 * Starts with reduced motion off.
 *
 * @returns `turnOn()` flips the preference and fires `change`, as the OS setting does.
 */
function stubReducedMotionQuery(): { turnOn: () => void } {
  const listeners = new Set<() => void>()
  const media = {
    matches: false,
    addEventListener: (_type: 'change', listener: () => void): void => {
      listeners.add(listener)
    },
    removeEventListener: (_type: 'change', listener: () => void): void => {
      listeners.delete(listener)
    },
  }
  vi.stubGlobal('matchMedia', () => media)
  return {
    turnOn: (): void => {
      media.matches = true
      listeners.forEach((listener) => listener())
    },
  }
}

function renderPlayer(locale: 'en' | 'ja' = 'en'): void {
  render(
    <NextIntlClientProvider locale={locale} messages={catalogs[locale]}>
      <StepPlayer
        title="Demo"
        captions={['first sentence', 'second sentence', 'third sentence']}
        renderStage={(step) => <span>stage {step}</span>}
      />
    </NextIntlClientProvider>,
  )
}

beforeEach(() => {
  stubReducedMotionQuery()
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('StepPlayer', () => {
  test('Next shows the following sentence and the step counter moves, so the reader advances one change at a time', () => {
    // Arrange
    renderPlayer()

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))

    // Assert
    expect(screen.getByText('Step 2 of 3')).toBeVisible()
    expect(screen.getAllByText('second sentence')[0]).toBeVisible()
  })

  test('ArrowRight on the controls advances and ArrowLeft goes back, so keyboard users can step through', () => {
    // Arrange
    renderPlayer()
    const toolbar = screen.getByRole('toolbar')

    // Act
    fireEvent.keyDown(toolbar, { key: 'ArrowRight' })
    fireEvent.keyDown(toolbar, { key: 'ArrowRight' })
    fireEvent.keyDown(toolbar, { key: 'ArrowLeft' })

    // Assert
    expect(screen.getByText('Step 2 of 3')).toBeVisible()
  })

  test('the last step offers Restart instead of Next, so the figure can be replayed', () => {
    // Arrange
    renderPlayer()

    // Act
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Restart' }))

    // Assert
    expect(screen.getByText('Step 1 of 3')).toBeVisible()
  })

  test('when Play reaches the last step and its button disappears, keyboard focus moves to Restart instead of being lost', () => {
    // Arrange
    vi.useFakeTimers()
    renderPlayer()
    const playButton = screen.getByRole('button', { name: 'Play' })
    playButton.focus()

    // Act
    fireEvent.click(playButton)
    act(() => {
      vi.advanceTimersByTime(3600)
    })
    act(() => {
      vi.advanceTimersByTime(3600)
    })

    // Assert
    expect(screen.getByText('Step 3 of 3')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Restart' })).toHaveFocus()
  })

  test('turning on reduced motion during Play stops autoplay, so the figure no longer moves on its own', () => {
    // Arrange
    vi.useFakeTimers()
    const reducedMotionQuery = stubReducedMotionQuery()
    renderPlayer()
    fireEvent.click(screen.getByRole('button', { name: 'Play' }))

    // Act
    act(() => {
      reducedMotionQuery.turnOn()
    })
    act(() => {
      vi.advanceTimersByTime(7200)
    })

    // Assert
    expect(screen.getByText('Step 1 of 3')).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Pause' })).toBeNull()
  })
})
