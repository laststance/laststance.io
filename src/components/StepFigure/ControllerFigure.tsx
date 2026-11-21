'use client'

import { useTranslations } from 'next-intl'

import { CodeBlock, FlowBox, type CodePart, type FigureProps } from './parts'
import { StepPlayer } from './StepPlayer'

type ClientState = 'idle' | 'controller' | 'refused' | 'closed'

interface ControllerScene {
  a: ClientState
  b: ClientState
  /** What the terminal's first line shows. */
  screen: string
  /** The JSON line travelling in this step, with its direction. */
  message?: { who: 'A' | 'B'; dir: 'in' | 'out'; parts: CodePart[] }
}

const INPUT_ABC: CodePart[] = [
  { t: '{"type":"terminal.input",' },
  { t: '"text":"abc"', hl: true },
  { t: '}' },
]
const INPUT_Z: CodePart[] = [
  { t: '{"type":"terminal.input",' },
  { t: '"text":"Z"', hl: true },
  { t: '}' },
]
const REFUSED: CodePart[] = [
  { t: '{"type":"terminal.closed","reason":"' },
  {
    t: 'terminal attach failed: terminal term_… already has an attached client; retry with --takeover',
    hl: true,
  },
  { t: '"}' },
]
const TAKEN: CodePart[] = [
  { t: '{"type":"terminal.closed","reason":"' },
  { t: 'terminal attach taken over', hl: true },
  { t: '"}' },
]

const SCENES: ControllerScene[] = [
  { a: 'idle', b: 'idle', screen: '' },
  { a: 'controller', b: 'idle', screen: '' },
  {
    a: 'controller',
    b: 'idle',
    screen: 'abc',
    message: { who: 'A', dir: 'in', parts: INPUT_ABC },
  },
  { a: 'controller', b: 'refused', screen: 'abc' },
  {
    a: 'controller',
    b: 'refused',
    screen: 'abc',
    message: { who: 'B', dir: 'out', parts: REFUSED },
  },
  { a: 'controller', b: 'controller', screen: 'abc' },
  {
    a: 'closed',
    b: 'controller',
    screen: 'abc',
    message: { who: 'A', dir: 'out', parts: TAKEN },
  },
  { a: 'closed', b: 'controller', screen: 'abc' },
  {
    a: 'closed',
    b: 'controller',
    screen: 'abcZ',
    message: { who: 'B', dir: 'in', parts: INPUT_Z },
  },
]

/**
 * Figure 7: the controller ownership rule. One client at a time may type;
 * a second is refused unless it passes `--takeover`, which closes the first.
 * The JSON lines are the ones printed by the recorded run.
 *
 * @param props - Heading and nine captions from the article edition.
 * @example
 * <ControllerFigure title="…" captions={nineSentences} />
 */
export function ControllerFigure({ title, captions }: FigureProps) {
  const t = useTranslations('StepFigure')
  const badge = (state: ClientState): string | undefined =>
    state === 'controller'
      ? t('controller')
      : state === 'refused'
        ? t('refused')
        : state === 'closed'
          ? t('closed')
          : undefined
  return (
    <StepPlayer
      title={title}
      captions={captions}
      renderStage={(step) => {
        const s = SCENES[step]
        return (
          <div className="mx-auto grid max-w-xl gap-2">
            <div className="grid grid-cols-2 gap-2">
              <FlowBox
                title={t('clientA')}
                active={s.a === 'controller'}
                dim={s.a === 'closed'}
                badge={badge(s.a)}
              >
                <p className="font-mono text-xs text-zinc-600 dark:text-zinc-300">
                  control
                </p>
              </FlowBox>
              <FlowBox
                title={t('clientB')}
                active={s.b === 'controller'}
                dim={s.b === 'refused'}
                badge={badge(s.b)}
              >
                <p className="font-mono text-xs text-zinc-600 dark:text-zinc-300">
                  control
                  {s.b === 'controller' || step >= 5 ? ' --takeover' : ''}
                </p>
              </FlowBox>
            </div>
            {s.message ? (
              <CodeBlock
                label={`${s.message.who} ${s.message.dir === 'in' ? '→' : '←'}`}
                parts={s.message.parts}
              />
            ) : (
              <CodeBlock label="" parts={[{ t: '·' }]} dim />
            )}
            <FlowBox title={`${t('terminalLabel')} w1:p1`}>
              <p className="min-h-5 font-mono text-sm text-zinc-900 dark:text-zinc-100">
                $ cat{' '}
                <span className="text-teal-700 dark:text-teal-300">
                  {s.screen}
                </span>
              </p>
            </FlowBox>
          </div>
        )
      }}
    />
  )
}
