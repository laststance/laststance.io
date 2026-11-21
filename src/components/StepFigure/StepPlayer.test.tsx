import { fireEvent, render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { describe, expect, test } from 'vitest'

import { catalogs } from '@/i18n/catalogs'

import { StepPlayer } from './StepPlayer'

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
})
