import { describe, expect, test } from 'vitest'

import { commitStatusFor } from '../../scripts/argos-status.mjs'

const stats = {
  added: 1,
  removed: 0,
  unchanged: 40,
  changed: 2,
  ignored: 0,
  failure: 0,
  retryFailure: 0,
  total: 43,
}

describe('the Argos commit status on a PR', () => {
  test('passes when the screenshots did not change', () => {
    // Arrange
    const build = { status: 'no-changes', stats }

    // Act
    const status = commitStatusFor(build)

    // Assert
    expect(status).toEqual({
      state: 'success',
      description: 'No visual changes',
    })
  })

  test('fails until someone reviews the changed screenshots in Argos', () => {
    // Arrange
    const build = { status: 'changes-detected', stats }

    // Act
    const status = commitStatusFor(build)

    // Assert
    expect(status).toEqual({
      state: 'failure',
      description: '3 visual changes need review in Argos',
    })
  })

  test('passes once the changes are approved in Argos', () => {
    // Arrange
    const build = { status: 'accepted', stats }

    // Act
    const status = commitStatusFor(build)

    // Assert
    expect(status).toEqual({
      state: 'success',
      description: '3 visual changes approved in Argos',
    })
  })

  test('fails when the changes are rejected in Argos', () => {
    // Arrange
    const build = { status: 'rejected', stats }

    // Act
    const status = commitStatusFor(build)

    // Assert
    expect(status).toEqual({
      state: 'failure',
      description: 'Visual changes rejected in Argos',
    })
  })

  test('reports an error instead of staying pending when Argos is still comparing', () => {
    // Arrange
    const build = { status: 'progress', stats: null }

    // Act
    const status = commitStatusFor(build)

    // Assert
    expect(status).toEqual({
      state: 'error',
      description: 'Argos was still comparing screenshots after 5 minutes',
    })
  })
})
