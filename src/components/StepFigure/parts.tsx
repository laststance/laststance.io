'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** Props every figure takes: the article edition supplies the words. */
export interface FigureProps {
  /** Heading of the figure, in the edition's language. */
  title: string
  /** One sentence per step, in the edition's language. */
  captions: string[]
}

/** A piece of a code line; `hl` pieces are emphasised. */
export interface CodePart {
  t: string
  hl?: boolean
}

/**
 * Shows each `ESC` (the invisible escape character) in a muted colour so that
 * sequences glued together in a decoded frame can be told apart.
 *
 * @param text - A piece of a code block.
 * @returns The piece with every `ESC` wrapped in a muted span.
 */
function renderEsc(text: string): ReactNode[] {
  return text.split(/(ESC)/).map((piece, index) =>
    piece === 'ESC' ? (
      <span key={index} className="font-bold text-zinc-500 dark:text-zinc-400">
        ESC
      </span>
    ) : (
      piece
    ),
  )
}

/**
 * Monospaced block for a request, a record or a decoded byte string. Long
 * lines wrap instead of scrolling so the block stays readable on a phone.
 *
 * @param props.parts - Pieces of text; the highlighted ones are what the current step is about.
 * @param props.dim - Greys the block out when the step is about something else.
 * @example
 * <CodeBlock parts={[{ t: '{"seq":' }, { t: '1', hl: true }, { t: '}' }]} />
 */
export function CodeBlock({
  parts,
  dim = false,
  label,
}: {
  parts: CodePart[]
  dim?: boolean
  label?: string
}) {
  return (
    <div
      className={`rounded-md border border-zinc-200 bg-zinc-50 p-2 transition-opacity duration-200 motion-reduce:transition-none dark:border-zinc-700 dark:bg-zinc-900 ${
        dim ? 'opacity-40' : 'opacity-100'
      }`}
    >
      {label ? (
        <div className="mb-1 text-[0.7rem] font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          {label}
        </div>
      ) : null}
      <pre className="m-0 bg-transparent p-0 font-mono text-[0.72rem] leading-relaxed break-all whitespace-pre-wrap text-zinc-800 sm:text-xs dark:text-zinc-200">
        {parts.map((part, i) =>
          part.hl ? (
            <mark
              key={i}
              className="rounded bg-teal-200 px-0.5 text-zinc-900 dark:bg-teal-700/70 dark:text-zinc-50"
            >
              {renderEsc(part.t)}
            </mark>
          ) : (
            <span key={i}>{renderEsc(part.t)}</span>
          ),
        )}
      </pre>
    </div>
  )
}

/**
 * A labelled box in a flow diagram. The active one gets a teal ring so the
 * eye lands on the thing the current step is about.
 *
 * @param props.active - Whether the step talks about this box right now.
 * @param props.dim - Greys the box out when it is not part of the step.
 */
export function FlowBox({
  title,
  active = false,
  dim = false,
  badge,
  children,
}: {
  title: string
  active?: boolean
  dim?: boolean
  badge?: string
  children?: ReactNode
}) {
  return (
    <div
      className={`rounded-lg border-2 p-2 transition-all duration-200 motion-reduce:transition-none ${
        active
          ? 'border-teal-600 bg-teal-50 dark:border-teal-400 dark:bg-teal-950/40'
          : 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950'
      } ${dim ? 'opacity-40' : 'opacity-100'}`}
    >
      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
        <span>{title}</span>
        {badge ? (
          <span className="rounded-full bg-teal-600 px-2 py-0.5 text-[0.65rem] font-semibold text-white dark:bg-teal-500 dark:text-zinc-950">
            {badge}
          </span>
        ) : null}
      </div>
      {children ? <div className="mt-1">{children}</div> : null}
    </div>
  )
}

/**
 * The message that is travelling between two boxes in the current step.
 * It slides in from the direction of travel; under reduced motion it only
 * appears.
 *
 * @param props.text - What is being sent, shown in monospace.
 * @param props.direction - `down` or `up` arrow in front of the text.
 */
export function Travelling({
  text,
  direction,
  reduceMotion,
}: {
  text: string
  direction: 'down' | 'up'
  reduceMotion: boolean
}) {
  return (
    <motion.div
      key={`${direction}-${text}`}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: direction === 'down' ? -10 : 10 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3 }}
      className="flex items-center gap-2 py-1 pl-4 font-mono text-[0.72rem] break-all text-teal-800 sm:text-xs dark:text-teal-300"
    >
      <span aria-hidden="true" className="text-base">
        {direction === 'down' ? '↓' : '↑'}
      </span>
      <span>{text}</span>
    </motion.div>
  )
}

/** Empty spacer that keeps a gap between boxes at constant height. */
export function Gap() {
  return <div aria-hidden="true" className="h-7" />
}
