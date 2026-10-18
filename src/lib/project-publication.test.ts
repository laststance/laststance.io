import { describe, expect, it } from 'vitest'

import { getPublishedProjects, PROJECT_DISPLAY } from './projects'

describe('project publication', () => {
  it('hides all requested Stable projects while keeping the eight featured projects', () => {
    // Arrange
    const display = PROJECT_DISPLAY
    // Act
    const { featured, stable } = getPublishedProjects(display)
    // Assert
    expect(stable).toEqual([])
    expect(featured.map((project) => project.name)).toEqual([
      'Skills Desktop',
      'Go To Definition for JSDoc',
      'Tailwind CSS Canonical Classes',
      '@laststance/redux-storage-middleware',
      'GitBox',
      'react-lightbox',
      'react-flow-scrollbar',
      'eslint-config-ts-prefixer',
    ])
  })

  it('hides only explicitly named projects and preserves other Stable entries', () => {
    // Arrange
    const display = { hiddenNames: ['Skills Desktop', 'Clean URL'] }
    // Act
    const { featured, stable } = getPublishedProjects(display)
    // Assert
    expect(featured).toHaveLength(7)
    expect(featured.map((project) => project.name)).not.toContain(
      'Skills Desktop',
    )
    expect(stable).toHaveLength(13)
    expect(stable.map((project) => project.name)).not.toContain('Clean URL')
    expect(stable.map((project) => project.name)).toContain('Coffee Timer')
  })
})
