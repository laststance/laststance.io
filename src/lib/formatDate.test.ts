import { describe, it, expect } from 'vitest'

import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('should format date correctly', () => {
    expect(formatDate('2024-01-01')).toBe('January 1, 2024')
    expect(formatDate('2024-12-25')).toBe('December 25, 2024')
    expect(formatDate('2023-07-04')).toBe('July 4, 2023')
  })

  it('should handle single digit days and months', () => {
    expect(formatDate('2024-03-09')).toBe('March 9, 2024')
    expect(formatDate('2024-01-01')).toBe('January 1, 2024')
  })

  it('should handle leap year dates', () => {
    expect(formatDate('2024-02-29')).toBe('February 29, 2024')
  })

  it('should handle different years', () => {
    expect(formatDate('2020-06-15')).toBe('June 15, 2020')
    expect(formatDate('2030-11-30')).toBe('November 30, 2030')
    expect(formatDate('1999-12-31')).toBe('December 31, 1999')
  })

  it('should handle invalid date strings gracefully', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date')
    expect(formatDate('')).toBe('Invalid Date')
  })

  it('should format all months correctly', () => {
    const months = [
      { input: '2024-01-15', expected: 'January 15, 2024' },
      { input: '2024-02-15', expected: 'February 15, 2024' },
      { input: '2024-03-15', expected: 'March 15, 2024' },
      { input: '2024-04-15', expected: 'April 15, 2024' },
      { input: '2024-05-15', expected: 'May 15, 2024' },
      { input: '2024-06-15', expected: 'June 15, 2024' },
      { input: '2024-07-15', expected: 'July 15, 2024' },
      { input: '2024-08-15', expected: 'August 15, 2024' },
      { input: '2024-09-15', expected: 'September 15, 2024' },
      { input: '2024-10-15', expected: 'October 15, 2024' },
      { input: '2024-11-15', expected: 'November 15, 2024' },
      { input: '2024-12-15', expected: 'December 15, 2024' },
    ]

    months.forEach(({ input, expected }) => {
      expect(formatDate(input)).toBe(expected)
    })
  })
})
