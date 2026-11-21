'use client'

import { useTranslations } from 'next-intl'

import { CellGrid, type CellGridProps, type CellRun } from './CellGrid'
import { CodeBlock, type CodePart, type FigureProps } from './parts'
import { StepPlayer } from './StepPlayer'

/** `green` and `bold` are the two styled words on the recorded screen. */
const RUNS: CellRun[] = [
  { row: 1, col: 4, len: 5, kind: 'green' },
  { row: 1, col: 10, len: 4, kind: 'bold' },
]

const LINES = ['ok green bold', '$']

const TEXT_CMD: CodePart[] = [
  { t: 'herdr pane read w2:p1 --source visible ' },
  { t: '--format text', hl: true },
]
const ANSI_CMD: CodePart[] = [
  { t: 'herdr pane read w2:p1 --source visible ' },
  { t: '--format ansi', hl: true },
]

interface ReadScene {
  grid: Pick<CellGridProps, 'highlight'>
  command?: CodePart[]
  /** Output shown so far. */
  output?: CodePart[]
  outputDim?: boolean
}

const SCENES: ReadScene[] = [
  { grid: {} },
  { grid: { highlight: { row: 1, col: 1, len: 14 } }, command: TEXT_CMD },
  {
    grid: { highlight: { row: 1, col: 1, len: 13 } },
    command: TEXT_CMD,
    output: [{ t: 'ok green bold', hl: true }],
  },
  {
    grid: { highlight: { row: 2, col: 1 } },
    command: TEXT_CMD,
    output: [{ t: 'ok green bold\n' }, { t: '$', hl: true }],
  },
  {
    grid: { highlight: { row: 2, col: 3 } },
    command: TEXT_CMD,
    output: [{ t: 'ok green bold\n$' }],
  },
  {
    grid: { highlight: { row: 1, col: 1, len: 13 } },
    command: ANSI_CMD,
    output: [
      { t: 'ok ESC[0m' },
      { t: 'ESC[38;5;2m', hl: true },
      { t: 'greenESC[0m ESC[0m' },
      { t: 'ESC[1m', hl: true },
      { t: 'boldESC[0m\n$ ' },
    ],
  },
  {
    grid: { highlight: { row: 2, col: 3 } },
    command: ANSI_CMD,
    output: [
      { t: 'ok ESC[0mESC[38;5;2mgreenESC[0m ESC[0mESC[1mboldESC[0m\n$ ' },
    ],
    outputDim: true,
  },
]

/**
 * Figure 4: what `pane read` hands back. The screen on the left is read row
 * by row into text; with `--format ansi` colour and bold arrive as escape
 * codes; the cursor never arrives. Output strings are the recorded ones.
 *
 * @param props - Heading and seven captions from the article edition.
 * @example
 * <ReadFigure title="…" captions={sevenSentences} />
 */
export function ReadFigure({ title, captions }: FigureProps) {
  const t = useTranslations('StepFigure')
  return (
    <StepPlayer
      title={title}
      captions={captions}
      renderStage={(step, reduceMotion) => {
        const scene = SCENES[step]
        return (
          <div className="mx-auto grid max-w-xl gap-3">
            <CellGrid
              cols={14}
              rows={3}
              lines={LINES}
              runs={RUNS}
              cursor={{ row: 2, col: 3 }}
              reduceMotion={reduceMotion}
              {...scene.grid}
            />
            {scene.command ? (
              <CodeBlock parts={scene.command} label="shell" />
            ) : null}
            {scene.output ? (
              <CodeBlock
                parts={scene.output}
                label={t('textOut')}
                dim={scene.outputDim}
              />
            ) : null}
          </div>
        )
      }}
    />
  )
}
