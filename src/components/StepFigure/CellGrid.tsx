'use client'

import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

/** Width of one terminal cell in SVG user units. */
const CELL_W = 26
/** Height of one terminal cell in SVG user units. */
const CELL_H = 32
/** Left margin that holds the row numbers. */
const GUTTER_X = 22
/** Top margin that holds the column numbers. */
const GUTTER_Y = 18

/** Text styling a run of cells can carry in the colour demo. */
export type CellStyle = 'green' | 'bold'

export interface CellRun {
  row: number
  col: number
  len: number
  kind: CellStyle
}

export interface CellGridProps {
  cols: number
  rows: number
  /** One string per screen row, top first. Rows may be shorter than `cols`. */
  lines: string[]
  /** 1-based cursor position, or `null` when the cursor is hidden. */
  cursor?: { row: number; col: number } | null
  /** 1-based cells to outline because the current step talks about them. */
  highlight?: { row: number; col: number; len?: number }
  /** Colour or weight for runs of cells. */
  runs?: CellRun[]
  /** Shrinks the grid for use inside a diagram box. */
  compact?: boolean
  reduceMotion: boolean
}

/** Characters that occupy two terminal columns (East Asian wide). */
function isWide(ch: string): boolean {
  const code = ch.codePointAt(0) ?? 0
  return (
    (code >= 0x1100 && code <= 0x115f) ||
    (code >= 0x2e80 && code <= 0xa4cf) ||
    (code >= 0xac00 && code <= 0xd7a3) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0xff00 && code <= 0xff60) ||
    (code >= 0xffe0 && code <= 0xffe6)
  )
}

/** Lays a row string out into 0-based columns, giving wide characters two. */
function layoutRow(line: string): { ch: string; col: number; wide: boolean }[] {
  const placed: { ch: string; col: number; wide: boolean }[] = []
  let col = 0
  for (const ch of line) {
    const wide = isWide(ch)
    if (ch !== ' ') placed.push({ ch, col, wide })
    col += wide ? 2 : 1
  }
  return placed
}

/**
 * A terminal screen drawn as an SVG grid of cells plus a cursor marker.
 *
 * It is the one picture every herdr figure keeps coming back to: the screen is
 * only cells and a cursor. Characters pop in when they appear and the cursor
 * slides between cells; both stop animating under reduced motion.
 *
 * @param props - See {@link CellGridProps}.
 * @returns An `<svg>` that scales to the width of its container.
 * @example
 * <CellGrid cols={10} rows={4} lines={['hi']} cursor={{ row: 1, col: 3 }} reduceMotion={false} />
 */
export function CellGrid({
  cols,
  rows,
  lines,
  cursor = null,
  highlight,
  runs = [],
  compact = false,
  reduceMotion,
}: CellGridProps) {
  const t = useTranslations('StepFigure')
  const width = GUTTER_X + cols * CELL_W + 4
  const height = GUTTER_Y + rows * CELL_H + 4
  const duration = reduceMotion ? 0 : 0.25
  const maxWidthClass = compact ? 'max-w-[220px]' : 'max-w-[420px]'

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${t('gridLabel', { cols: String(cols), rows: String(rows) })}${
        cursor
          ? `, ${t('cursorAt', { row: String(cursor.row), col: String(cursor.col) })}`
          : `, ${t('cursorHidden')}`
      }`}
      className={`mx-auto block h-auto w-full ${maxWidthClass} text-zinc-900 dark:text-zinc-100`}
    >
      {/* Column numbers across the top */}
      {Array.from({ length: cols }, (_, c) => (
        <text
          key={`c${c}`}
          x={GUTTER_X + c * CELL_W + CELL_W / 2}
          y={11}
          textAnchor="middle"
          className="fill-zinc-500 text-[9px] dark:fill-zinc-400"
        >
          {c + 1}
        </text>
      ))}
      {/* Row numbers down the left */}
      {Array.from({ length: rows }, (_, r) => (
        <text
          key={`r${r}`}
          x={GUTTER_X - 6}
          y={GUTTER_Y + r * CELL_H + CELL_H / 2 + 3}
          textAnchor="end"
          className="fill-zinc-500 text-[9px] dark:fill-zinc-400"
        >
          {r + 1}
        </text>
      ))}
      {/* The cells themselves */}
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols)
        const c = i % cols
        return (
          <rect
            key={i}
            x={GUTTER_X + c * CELL_W}
            y={GUTTER_Y + r * CELL_H}
            width={CELL_W}
            height={CELL_H}
            className="fill-white stroke-zinc-300 dark:fill-zinc-950 dark:stroke-zinc-700"
            strokeWidth={1}
          />
        )
      })}
      {/* Outline for the cells the caption points at */}
      {highlight ? (
        <motion.rect
          initial={false}
          animate={{
            x: GUTTER_X + (highlight.col - 1) * CELL_W,
            y: GUTTER_Y + (highlight.row - 1) * CELL_H,
            width: (highlight.len ?? 1) * CELL_W,
          }}
          transition={{ duration }}
          height={CELL_H}
          rx={3}
          className="fill-none stroke-teal-600 dark:stroke-teal-400"
          strokeWidth={2.5}
        />
      ) : null}
      {/* Cursor: a filled block that slides to its new cell */}
      {cursor ? (
        <motion.rect
          initial={false}
          animate={{
            x: GUTTER_X + (cursor.col - 1) * CELL_W + 1,
            y: GUTTER_Y + (cursor.row - 1) * CELL_H + 1,
          }}
          transition={{ duration }}
          width={CELL_W - 2}
          height={CELL_H - 2}
          rx={2}
          className="fill-teal-500/35 stroke-teal-600 dark:fill-teal-400/35 dark:stroke-teal-400"
          strokeWidth={1.5}
        />
      ) : null}
      {/* Characters */}
      {lines.flatMap((line, r) =>
        layoutRow(line).map(({ ch, col, wide }) => {
          const style = runs.find(
            (run) =>
              run.row === r + 1 &&
              col + 1 >= run.col &&
              col + 1 < run.col + run.len,
          )?.kind
          const colour =
            style === 'green'
              ? 'fill-emerald-600 dark:fill-emerald-400'
              : 'fill-zinc-900 dark:fill-zinc-100'
          return (
            <motion.text
              key={`${r}-${col}-${ch}`}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration }}
              x={GUTTER_X + col * CELL_W + (wide ? CELL_W : CELL_W / 2)}
              y={GUTTER_Y + r * CELL_H + CELL_H / 2 + 6}
              textAnchor="middle"
              className={`${colour} font-mono text-[18px] ${
                style === 'bold' ? 'font-extrabold' : ''
              }`}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              {ch}
            </motion.text>
          )
        }),
      )}
    </svg>
  )
}
