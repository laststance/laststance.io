import {
  act,
  fireEvent,
  render,
  screen,
  type RenderResult,
} from '@testing-library/react'
import type * as MotionReact from 'motion/react'
import { NextIntlClientProvider } from 'next-intl'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { catalogs } from '@/i18n/catalogs'

import { StepPlayer } from './StepPlayer'

// The reader's reduced-motion preference, switchable per test
const reducedMotion = vi.hoisted(() => ({ enabled: false }))

vi.mock('motion/react', async (importOriginal) => ({
  ...(await importOriginal<typeof MotionReact>()),
  useReducedMotion: (): boolean => reducedMotion.enabled,
}))

function PlayerTree({ locale }: { locale: 'en' | 'ja' }) {
  return (
    <NextIntlClientProvider locale={locale} messages={catalogs[locale]}>
      <StepPlayer
        title="Demo"
        captions={['first sentence', 'second sentence', 'third sentence']}
        renderStage={(step) => <span>stage {step}</span>}
      />
    </NextIntlClientProvider>
  )
}

function renderPlayer(locale: 'en' | 'ja' = 'en'): RenderResult {
  return render(<PlayerTree locale={locale} />)
}

afterEach(() => {
  vi.useRealTimers()
  reducedMotion.enabled = false
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
    const { rerender } = renderPlayer()
    fireEvent.click(screen.getByRole('button', { name: 'Play' }))

    // Act
    reducedMotion.enabled = true
    rerender(<PlayerTree locale="en" />)
    act(() => {
      vi.advanceTimersByTime(7200)
    })

    // Assert
    expect(screen.getByText('Step 1 of 3')).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Pause' })).toBeNull()
  })
})
