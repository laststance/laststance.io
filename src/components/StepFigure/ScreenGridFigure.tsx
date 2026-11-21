'use client'

import { CellGrid, type CellGridProps } from './CellGrid'
import type { FigureProps } from './parts'
import { StepPlayer } from './StepPlayer'

type GridScene = Pick<CellGridProps, 'lines' | 'cursor' | 'highlight'>

/** The nine steps of the "what is a screen" figure; one thing changes per step. */
const SCENES: GridScene[] = [
  { lines: [], cursor: null },
  { lines: [], cursor: { row: 1, col: 1 } },
  { lines: ['h'], cursor: { row: 1, col: 1 }, highlight: { row: 1, col: 1 } },
  { lines: ['h'], cursor: { row: 1, col: 2 } },
  { lines: ['hi'], cursor: { row: 1, col: 2 }, highlight: { row: 1, col: 2 } },
  { lines: ['hi'], cursor: { row: 1, col: 3 } },
  { lines: ['hi'], cursor: { row: 2, col: 1 } },
  {
    lines: ['hi', '日'],
    cursor: { row: 2, col: 1 },
    highlight: { row: 2, col: 1, len: 2 },
  },
  { lines: ['hi', '日'], cursor: { row: 2, col: 3 } },
]

/**
 * Figure 1: a terminal screen is a 10×4 grid of cells plus a cursor.
 *
 * A program writes `h`, `i`, a newline and a wide character; the reader sees
 * the cursor move each time. Used in the "What is a terminal screen" section
 * of the herdr article (both editions).
 *
 * @param props - Heading and nine captions from the article edition.
 * @example
 * <ScreenGridFigure title="…" captions={nineSentences} />
 */
export function ScreenGridFigure({ title, captions }: FigureProps) {
  return (
    <StepPlayer
      title={title}
      captions={captions}
      renderStage={(step, reduceMotion) => (
        <CellGrid
          cols={10}
          rows={4}
          reduceMotion={reduceMotion}
          {...SCENES[step]}
        />
      )}
    />
  )
}
