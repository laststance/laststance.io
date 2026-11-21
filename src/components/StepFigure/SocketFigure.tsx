'use client'

import { useTranslations } from 'next-intl'

import {
  CodeBlock,
  FlowBox,
  Gap,
  Travelling,
  type CodePart,
  type FigureProps,
} from './parts'
import { StepPlayer } from './StepPlayer'

/** The request line, exactly as sent over the socket in the recorded run. */
const REQUEST: CodePart[] = [
  { t: '{"id":"r1",' },
  { t: '"method":"pane.read"', hl: true },
  { t: ',"params":{"pane_id":"w1:p1","source":"visible","format":"text"}}' },
]

/** The server's answer to that request, copied from the recorded run. */
const RESPONSE: CodePart[] = [
  { t: '{"id":"r1",' },
  {
    t: '"result":{"type":"pane_read","read":{"pane_id":"w1:p1","workspace_id":"w1","tab_id":"w1:t1","source":"visible","format":"text",',
  },
  { t: '"text":"hi\\nhi\\nok日\\n"', hl: true },
  { t: ',"revision":0,"truncated":false}}}' },
]

/** Plain (no highlight) version of the request, for the step that talks about the id. */
const REQUEST_ID: CodePart[] = [
  { t: '{' },
  { t: '"id":"r1"', hl: true },
  {
    t: ',"method":"pane.read","params":{"pane_id":"w1:p1","source":"visible","format":"text"}}',
  },
]

type SocketScene = {
  /** 0 = nothing connected, 1 = connected. */
  connected: boolean
  request?: CodePart[]
  response?: CodePart[]
  travelling?: { text: string; direction: 'down' | 'up' }
  active: 'script' | 'server' | 'socket'
}

const SCENES: SocketScene[] = [
  { connected: false, active: 'socket' },
  { connected: true, active: 'script' },
  {
    connected: true,
    active: 'script',
    request: REQUEST,
    travelling: { text: '{"id":"r1",…}⏎', direction: 'down' },
  },
  { connected: true, active: 'server', request: REQUEST },
  {
    connected: true,
    active: 'server',
    request: REQUEST,
    response: RESPONSE,
    travelling: { text: '{"id":"r1",…}⏎', direction: 'up' },
  },
  {
    connected: true,
    active: 'script',
    request: REQUEST_ID,
    response: RESPONSE,
  },
]

/**
 * Figure 3: one request line goes into the server's Unix socket and one
 * answer line comes back. The two JSON lines are the real ones from the
 * recorded run, not placeholders.
 *
 * @param props - Heading and six captions from the article edition.
 * @example
 * <SocketFigure title="…" captions={sixSentences} />
 */
export function SocketFigure({ title, captions }: FigureProps) {
  const t = useTranslations('StepFigure')
  return (
    <StepPlayer
      title={title}
      captions={captions}
      renderStage={(step, reduceMotion) => {
        const scene = SCENES[step]
        return (
          <div className="mx-auto max-w-xl">
            <FlowBox
              title={t('scriptLabel')}
              active={scene.active === 'script'}
            >
              {scene.request ? (
                <CodeBlock parts={scene.request} />
              ) : (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">…</p>
              )}
            </FlowBox>
            {scene.travelling ? (
              <Travelling {...scene.travelling} reduceMotion={reduceMotion} />
            ) : (
              <div
                className="flex h-7 items-center pl-4 font-mono text-xs text-zinc-500 dark:text-zinc-400"
                aria-hidden="true"
              >
                {scene.connected ? '│' : '·'}
              </div>
            )}
            <FlowBox
              title={`${t('serverLabel')} · ~/.config/herdr/sessions/blog-herdr-demo/herdr.sock`}
              active={scene.active === 'server' || scene.active === 'socket'}
            >
              {scene.response ? (
                <CodeBlock parts={scene.response} />
              ) : (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {scene.connected ? '⏎ …' : '…'}
                </p>
              )}
            </FlowBox>
            <Gap />
          </div>
        )
      }}
    />
  )
}
