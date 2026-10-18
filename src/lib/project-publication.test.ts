import { describe, expect, it } from 'vitest'

import { getPublishedProjects, PROJECT_DISPLAY } from './projects'

describe('project publication', () => {
  it('hides all requested Stable projects while keeping the eight featured projects', () => {
    // Arrange
    const display = PROJECT_DISPLAY
    // Act
    const { featured, stable, selected } = getPublishedProjects(display)
    // Assert
    expect(stable).toEqual([])
    expect(featured).toHaveLength(8)
    expect(selected.map((project) => project.name)).toEqual([
      'Skills Desktop',
      'Go To Definition for JSDoc',
      'Tailwind CSS Canonical Classes',
    ])
  })

  it('removes hidden selections before applying the three-project Home limit', () => {
    // Arrange
    const display = {
      hiddenNames: ['Skills Desktop'],
      homeNames: [
        'Skills Desktop',
        'GitBox',
        'react-lightbox',
        'react-flow-scrollbar',
        'Clean URL',
      ],
    }
    // Act
    const { featured, selected } = getPublishedProjects(display)
    // Assert
    expect(featured.map((project) => project.name)).not.toContain(
      'Skills Desktop',
    )
    expect(selected.map((project) => project.name)).toEqual([
      'GitBox',
      'react-lightbox',
      'react-flow-scrollbar',
    ])
  })

  it('leaves no Home selections when all selected names are hidden or missing', () => {
    // Arrange
    const display = {
      hiddenNames: ['Skills Desktop'],
      homeNames: ['Skills Desktop', 'missing'],
    }
    // Act
    const { selected } = getPublishedProjects(display)
    // Assert
    expect(selected).toEqual([])
  })
})
