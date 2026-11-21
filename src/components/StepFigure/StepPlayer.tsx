'use client'

import { useReducedMotion } from 'motion/react'
import { useTranslations } from 'next-intl'
import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

/** Milliseconds each step stays on screen while "Play" is running. */
const AUTOPLAY_INTERVAL_MS = 3600

/**
 * Splits a caption on backticks and renders the odd segments as inline code,
 * so one caption string can mention `ESC[2J` or `--takeover` without markup.
 *
 * @param text - One caption sentence; backticks mark code.
 * @returns The caption as a list of text and `<code>` nodes.
 * @example
 * renderInlineCode('Press `Enter`.')
 */
export function renderInlineCode(text: string): ReactNode[] {
  return text.split('`').map((part, index) =>
    index % 2 === 1 ? (
      <code
        key={index}
        className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[0.85em] wrap-break-word text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
      >
        {part}
      </code>
    ) : (
      part
    ),
  )
}

export interface StepPlayerProps {
  /** Accessible name and visible heading of the figure. */
  title: string
  /** One sentence per step, taken from the article edition that embeds the figure. */
  captions: string[]
  /** Draws the scene for the step that is currently shown. */
  renderStage: (step: number, reduceMotion: boolean) => ReactNode
}

/**
 * Shell shared by every animated figure in the herdr article: a stage, one
 * sentence per step, and Back / Next / Play controls.
 *
 * Why it exists: each mechanism is explained by letting the reader advance one
 * small change at a time. Nothing moves on its own unless the reader presses
 * Play, which also hides when the visitor asks for reduced motion.
 * Triggered when an MDX edition renders one of the figure components; the
 * arrow keys work whenever the figure has focus.
 *
 * @param props - See {@link StepPlayerProps}.
 * @returns A focusable `<figure>` with live-region captions.
 * @example
 * <StepPlayer title="Grid" captions={['A', 'B']} renderStage={(s) => <p>{s}</p>} />
 */
export function StepPlayer({ title, captions, renderStage }: StepPlayerProps) {
  const t = useTranslations('StepFigure')
  const reduceMotion = useReducedMotion() ?? false
  const headingId = useId()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const last = captions.length - 1
  const stepButtonRef = useRef<HTMLButtonElement>(null)

  // Autoplay: advance on a timer; stop on the last step, or as soon as the reader turns on reduced motion
  useEffect(() => {
    if (!playing) return
    if (reduceMotion || step >= last) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(
      () => setStep(step + 1),
      AUTOPLAY_INTERVAL_MS,
    )
    return (): void => window.clearTimeout(timer)
  }, [playing, reduceMotion, step, last])

  // Play leaves the DOM on the last step and under reduced motion. If it had focus,
  // hand focus to Next / Restart so the arrow keys still reach the toolbar.
  // Stable identity: the cleanup must run only when the button unmounts, not on every render.
  const playButtonRef = useCallback((playButton: HTMLButtonElement | null) => {
    if (!playButton) return
    return (): void => {
      if (document.activeElement === playButton) stepButtonRef.current?.focus()
    }
  }, [])

  function go(next: number): void {
    setStep(Math.min(last, Math.max(0, next)))
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>): void {
    // Arrow / Home / End step the figure; Enter and Space stay with the focused button
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setPlaying(false)
      go(step + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setPlaying(false)
      go(step - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      go(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      go(last)
    }
  }

  const buttonClass =
    'min-h-11 min-w-11 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800'

  return (
    <figure
      role="group"
      aria-labelledby={headingId}
      className="not-prose my-8 rounded-xl border border-zinc-200 bg-zinc-50 p-3 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none sm:p-4 dark:border-zinc-700 dark:bg-zinc-900/60"
    >
      <figcaption
        id={headingId}
        className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        {title}
      </figcaption>
      {/* Every step is also laid out invisibly in the same grid cell, so the
          figure keeps the height of its tallest step and the controls never jump. */}
      <div className="grid overflow-hidden rounded-lg bg-white p-2 dark:bg-zinc-950">
        <div className="[grid-area:1/1]">{renderStage(step, reduceMotion)}</div>
        {captions.map((_, index) => (
          <div
            key={index}
            aria-hidden="true"
            inert
            className="pointer-events-none invisible [grid-area:1/1]"
          >
            {renderStage(index, true)}
          </div>
        ))}
      </div>
      <div className="mt-3 grid text-[0.95rem] leading-relaxed text-zinc-800 dark:text-zinc-200">
        <p aria-live="polite" className="[grid-area:1/1]">
          {renderInlineCode(captions[step])}
        </p>
        {captions.map((caption, index) => (
          <p
            key={index}
            aria-hidden="true"
            className="pointer-events-none invisible [grid-area:1/1]"
          >
            {renderInlineCode(caption)}
          </p>
        ))}
      </div>
      <div
        role="toolbar"
        aria-label={title}
        onKeyDown={onKeyDown}
        className="mt-2 flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          className={buttonClass}
          disabled={step === 0}
          onClick={() => {
            setPlaying(false)
            go(step - 1)
          }}
        >
          {t('back')}
        </button>
        {step < last ? (
          <button
            ref={stepButtonRef}
            type="button"
            className={`${buttonClass} border-teal-600! bg-teal-600! text-white! hover:bg-teal-700! dark:border-teal-500! dark:bg-teal-600!`}
            onClick={() => {
              setPlaying(false)
              go(step + 1)
            }}
          >
            {t('next')}
          </button>
        ) : (
          <button
            ref={stepButtonRef}
            type="button"
            className={buttonClass}
            onClick={() => {
              setPlaying(false)
              go(0)
            }}
          >
            {t('restart')}
          </button>
        )}
        {!reduceMotion && step < last ? (
          <button
            ref={playButtonRef}
            type="button"
            className={buttonClass}
            aria-pressed={playing}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? t('pause') : t('play')}
          </button>
        ) : null}
        <span className="ml-auto text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
          {t('stepOf', {
            current: String(step + 1),
            total: String(captions.length),
          })}
        </span>
      </div>
    </figure>
  )
}
