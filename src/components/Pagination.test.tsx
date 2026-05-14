import { describe, it, expect } from 'vitest'

import { buildPageList } from './Pagination'

// 📄 buildPageList — pure ellipsis-list logic for Pagination.
// Hard-coded expected values (DAMP) so each scenario reads as a complete spec.
describe('buildPageList', () => {
  it('returns every page directly when totalPages ≤ 7 (no ellipsis needed)', () => {
    // Arrange — 5 pages comfortably fits without collapsing.
    const currentPage = 2
    const totalPages = 5

    // Act
    const pages = buildPageList(currentPage, totalPages)

    // Assert
    expect(pages).toEqual([1, 2, 3, 4, 5])
  })

  it('returns [1..7] when totalPages equals the threshold of 7', () => {
    // Arrange — boundary: exactly 7 still skips ellipsis.
    const currentPage = 3
    const totalPages = 7

    // Act
    const pages = buildPageList(currentPage, totalPages)

    // Assert
    expect(pages).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('places only a trailing ellipsis when current is near the start', () => {
    // Arrange — page 1 of 10: window is [1, 2], so collapse pages 3-9.
    const currentPage = 1
    const totalPages = 10

    // Act
    const pages = buildPageList(currentPage, totalPages)

    // Assert
    expect(pages).toEqual([1, 2, 'ellipsis', 10])
  })

  it('shows both ellipses with window around current in the middle of the range', () => {
    // Arrange — page 4 of 10: window is [3, 5], collapse pages 2 and 6-9.
    const currentPage = 4
    const totalPages = 10

    // Act
    const pages = buildPageList(currentPage, totalPages)

    // Assert
    expect(pages).toEqual([1, 'ellipsis', 3, 4, 5, 'ellipsis', 10])
  })

  it('places only a leading ellipsis when current is on the last page', () => {
    // Arrange — page 10 of 10: window is [9, 9], collapse pages 2-8.
    const currentPage = 10
    const totalPages = 10

    // Act
    const pages = buildPageList(currentPage, totalPages)

    // Assert
    expect(pages).toEqual([1, 'ellipsis', 9, 10])
  })

  it('returns a single-entry list when totalPages is 1', () => {
    // Arrange — edge case: nothing to paginate.
    const currentPage = 1
    const totalPages = 1

    // Act
    const pages = buildPageList(currentPage, totalPages)

    // Assert
    expect(pages).toEqual([1])
  })
})
