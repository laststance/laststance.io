'use client'

import { CellGrid, type CellGridProps } from './CellGrid'
import { CodeBlock, type CodePart, type FigureProps } from './parts'
import { StepPlayer } from './StepPlayer'

/** Where the escape character is shown as ESC and a space as · in the figure. */
const BOOKKEEPING_HEAD = 'ESC[?2026hESC[?25lESC]8;;ESC\\'

/** One recorded frame: the JSON header, the base64 start, and the decoded pieces. */
interface RecordedFrame {
  seq: number
  full: boolean
  size: number
  base64: string
  /** Decoded byte string cut into pieces so a step can highlight one of them. */
  pieces: string[]
}

const FRAMES: RecordedFrame[] = [
  {
    seq: 1,
    full: true,
    size: 135,
    base64: 'G1s/MjAyNmgbWz8yNWwbXTg7OxtcG1syShtbMTsxSBtbMDszOTs0OW0g…',
    pieces: [
      BOOKKEEPING_HEAD, // 0
      'ESC[2J', // 1 clear
      'ESC[1;1HESC[0;39;49m··········ESC[2;1H··········ESC[3;1H··········ESC[4;1H··········ESC[0m', // 2 paint
      'ESC[1;1H', // 3 cursor position
      'ESC[?25hESC[?2026lESC[1;1HESC[?25h', // 4 tail
    ],
  },
  {
    seq: 2,
    full: false,
    size: 75,
    base64:
      'G1s/MjAyNmgbWz8yNWwbXTg7OxtcG1sxOzFIG1swOzM5OzQ5bWhpG1swbRtbMTszSBtbPzI1aBtbPzIwMjZsG1sxOzNIG1s/MjVo',
    pieces: [
      BOOKKEEPING_HEAD, // 0
      'ESC[1;1H', // 1 move
      'ESC[0;39;49m', // 2 style
      'hi', // 3 text
      'ESC[0m', // 4 reset
      'ESC[1;3H', // 5 cursor position
      'ESC[?25hESC[?2026lESC[1;3HESC[?25h', // 6 tail
    ],
  },
  {
    seq: 3,
    full: false,
    size: 75,
    base64:
      'G1s/MjAyNmgbWz8yNWwbXTg7OxtcG1syOzFIG1swOzM5OzQ5bWhpG1swbRtbMzsxSBtbPzI1aBtbPzIwMjZsG1szOzFIG1s/MjVo',
    pieces: [
      BOOKKEEPING_HEAD, // 0
      'ESC[2;1H', // 1 move
      'ESC[0;39;49m', // 2 style
      'hi', // 3 text
      'ESC[0m', // 4 reset
      'ESC[3;1H', // 5 cursor position
      'ESC[?25hESC[?2026lESC[3;1HESC[?25h', // 6 tail
    ],
  },
]

interface FramesScene {
  frame: 0 | 1 | 2
  /** Whether the decoded string is on screen yet. */
  decoded: boolean
  /** Indices into the frame's pieces to emphasise. */
  hl: number[]
  grid: Pick<CellGridProps, 'lines' | 'cursor' | 'highlight'>
  /** Last step: compare sizes instead of showing a frame. */
  sizes?: boolean
}

const SCENES: FramesScene[] = [
  { frame: 0, decoded: false, hl: [], grid: { lines: [], cursor: null } },
  { frame: 0, decoded: true, hl: [], grid: { lines: [], cursor: null } },
  { frame: 0, decoded: true, hl: [1], grid: { lines: [], cursor: null } },
  {
    frame: 0,
    decoded: true,
    hl: [2],
    grid: { lines: [], cursor: null, highlight: { row: 1, col: 1, len: 10 } },
  },
  {
    frame: 0,
    decoded: true,
    hl: [3],
    grid: { lines: [], cursor: { row: 1, col: 1 } },
  },
  {
    frame: 1,
    decoded: true,
    hl: [1],
    grid: {
      lines: [],
      cursor: { row: 1, col: 1 },
      highlight: { row: 1, col: 1 },
    },
  },
  {
    frame: 1,
    decoded: true,
    hl: [3],
    grid: {
      lines: ['hi'],
      cursor: { row: 1, col: 1 },
      highlight: { row: 1, col: 1, len: 2 },
    },
  },
  {
    frame: 1,
    decoded: true,
    hl: [5],
    grid: { lines: ['hi'], cursor: { row: 1, col: 3 } },
  },
  {
    frame: 2,
    decoded: true,
    hl: [1, 3],
    grid: {
      lines: ['hi', 'hi'],
      cursor: { row: 1, col: 3 },
      highlight: { row: 2, col: 1, len: 2 },
    },
  },
  {
    frame: 2,
    decoded: true,
    hl: [5],
    grid: { lines: ['hi', 'hi'], cursor: { row: 3, col: 1 } },
  },
  {
    frame: 2,
    decoded: false,
    hl: [],
    grid: { lines: ['hi', 'hi'], cursor: { row: 3, col: 1 } },
    sizes: true,
  },
]

/** The JSON header of a frame record, with the base64 payload shortened for display. */
function recordParts(frame: RecordedFrame): CodePart[] {
  return [
    { t: '{"type":"terminal.frame",' },
    { t: `"seq":${frame.seq}`, hl: false },
    { t: ',"width":10,"height":4,' },
    { t: `"full":${frame.full}`, hl: true },
    { t: ',"encoding":"ansi","bytes":"' },
    { t: frame.base64 },
    { t: '"}' },
  ]
}

/**
 * Figure 5: replaying three recorded `terminal.frame` records onto a grid.
 * The reader sees the JSON line, its base64 payload decoded into escape
 * codes, and each code changing the grid or moving the cursor.
 *
 * @param props - Heading and eleven captions from the article edition.
 * @example
 * <FramesFigure title="…" captions={elevenSentences} />
 */
export function FramesFigure({ title, captions }: FigureProps) {
  return (
    <StepPlayer
      title={title}
      captions={captions}
      renderStage={(step, reduceMotion) => {
        const scene = SCENES[step]
        const frame = FRAMES[scene.frame]
        return (
          <div className="mx-auto grid max-w-xl gap-2">
            {scene.sizes ? (
              <CodeBlock
                label="bytes"
                parts={[
                  { t: 'record 1  full   ' },
                  { t: '135', hl: true },
                  { t: '\nrecord 2  patch  ' },
                  { t: '75', hl: true },
                  { t: '\nrecord 3  patch  ' },
                  { t: '75', hl: true },
                  { t: '\n(120×40 pane, full: 5,188)' },
                ]}
              />
            ) : (
              <>
                <CodeBlock label="record" parts={recordParts(frame)} />
                <CodeBlock
                  label={`${frame.size} bytes`}
                  dim={!scene.decoded}
                  parts={
                    scene.decoded
                      ? frame.pieces.map((t, i) => ({
                          t,
                          hl: scene.hl.includes(i),
                        }))
                      : [{ t: 'base64 → ?' }]
                  }
                />
              </>
            )}
            <CellGrid
              cols={10}
              rows={4}
              reduceMotion={reduceMotion}
              {...scene.grid}
            />
          </div>
        )
      }}
    />
  )
}
