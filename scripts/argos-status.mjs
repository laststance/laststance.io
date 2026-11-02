#!/usr/bin/env node
/**
 * Reports the Argos build of a Playwright run as a GitHub commit status, so
 * visual changes show up in `gh pr checks` next to the e2e jobs.
 *
 * The Playwright workflows run it after the tests:
 * `node scripts/argos-status.mjs playwright-output.txt`
 * It reads ARGOS_TOKEN, GITHUB_TOKEN, GITHUB_REPOSITORY, COMMIT_SHA and
 * STATUS_CONTEXT, and writes argos-result.json for `gh run download`.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'
import { pathToFileURL } from 'node:url'

const STILL_COMPARING = new Set(['pending', 'progress'])

/**
 * Maps a finished Argos build to the commit status it should produce.
 *
 * Called by the workflow step after polling stops, so a build that is still
 * comparing has timed out and reports an error instead of a status that
 * stays pending forever.
 *
 * @param build - An Argos API build: `status` plus the `stats` of its snapshots.
 * @returns The `state` and `description` for the GitHub statuses API.
 *
 * @example
 * ```js
 * commitStatusFor({ status: 'no-changes', stats: null })
 * // { state: 'success', description: 'No visual changes' }
 * ```
 */
export function commitStatusFor(build) {
  const changes =
    (build.stats?.changed ?? 0) +
    (build.stats?.added ?? 0) +
    (build.stats?.removed ?? 0)
  switch (build.status) {
    case 'no-changes':
      return { state: 'success', description: 'No visual changes' }
    case 'accepted':
      return {
        state: 'success',
        description: `${changes} visual changes approved in Argos`,
      }
    case 'changes-detected':
      return {
        state: 'failure',
        description: `${changes} visual changes need review in Argos`,
      }
    case 'rejected':
      return {
        state: 'failure',
        description: 'Visual changes rejected in Argos',
      }
    case 'pending':
    case 'progress':
      return {
        state: 'error',
        description: 'Argos was still comparing screenshots after 5 minutes',
      }
    default:
      return { state: 'error', description: `Argos build ${build.status}` }
  }
}

/**
 * Runs an Argos CLI command and parses its `--json` output.
 *
 * @param args - CLI arguments after `argos`, for example `['build', 'get', url]`.
 * @returns The parsed JSON the CLI printed.
 */
function argos(...args) {
  return JSON.parse(
    execFileSync('pnpm', ['exec', 'argos', ...args, '--json'], {
      encoding: 'utf8',
    }),
  )
}

async function main() {
  const [outputFile] = process.argv.slice(2)
  const buildUrl = readFileSync(outputFile, 'utf8')
    .match(/https:\/\/app\.argos-ci\.com\/\S+?\/builds\/\d+/g)
    ?.at(-1)
  if (!buildUrl) {
    console.log('No Argos build in the Playwright output; no status reported.')
    return
  }

  let build = argos('build', 'get', buildUrl)
  for (let poll = 0; STILL_COMPARING.has(build.status) && poll < 30; poll++) {
    await sleep(10_000)
    build = argos('build', 'get', buildUrl)
  }
  const needsReview = STILL_COMPARING.has(build.status)
    ? null
    : argos('build', 'snapshots', buildUrl, '--needs-review')
  writeFileSync(
    'argos-result.json',
    JSON.stringify({ build, needsReview }, null, 2),
  )

  const { state, description } = commitStatusFor(build)
  const { GITHUB_REPOSITORY, COMMIT_SHA, GITHUB_TOKEN, STATUS_CONTEXT } =
    process.env
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPOSITORY}/statuses/${COMMIT_SHA}`,
    {
      method: 'POST',
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        state,
        description,
        target_url: build.url,
        context: STATUS_CONTEXT,
      }),
    },
  )
  if (!response.ok) {
    throw new Error(
      `GitHub rejected the status: ${response.status} ${await response.text()}`,
    )
  }
  console.log(`${STATUS_CONTEXT}: ${state}, ${description}, ${build.url}`)
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main()
