import { describe, test, expect } from 'vitest'

import { formatDate } from './formatDate'

describe('formatDate', () => {
  test('should format date correctly', () => {
    expect(formatDate('2024-01-01', 'en')).toBe('January 1, 2024')
    expect(formatDate('2024-12-25', 'en')).toBe('December 25, 2024')
    expect(formatDate('2023-07-04', 'en')).toBe('July 4, 2023')
  })

  test('should handle single digit days and months', () => {
    expect(formatDate('2024-03-09', 'en')).toBe('March 9, 2024')
    expect(formatDate('2024-01-01', 'en')).toBe('January 1, 2024')
  })

  test('should handle leap year dates', () => {
    expect(formatDate('2024-02-29', 'en')).toBe('February 29, 2024')
  })

  test('should handle different years', () => {
    expect(formatDate('2020-06-15', 'en')).toBe('June 15, 2020')
    expect(formatDate('2030-11-30', 'en')).toBe('November 30, 2030')
    expect(formatDate('1999-12-31', 'en')).toBe('December 31, 1999')
  })

  test('should handle invalid date strings gracefully', () => {
    expect(formatDate('invalid-date', 'en')).toBe('Invalid Date')
    expect(formatDate('', 'en')).toBe('Invalid Date')
  })

  test('should format all months correctly', () => {
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
      expect(formatDate(input, 'en')).toBe(expected)
    })
  })
})

describe('formatDate for Japanese visitors', () => {
  test('shows article dates in Japanese year-month-day form', () => {
    // Arrange
    const date = '2024-01-01'

    // Act
    const formatted = formatDate(date, 'ja')

    // Assert
    expect(formatted).toBe('2024年1月1日')
  })

  test('keeps the calendar day on the last day of the year in Japanese', () => {
    // Arrange
    const date = '1999-12-31'

    // Act
    const formatted = formatDate(date, 'ja')

    // Assert
    expect(formatted).toBe('1999年12月31日')
  })

  test('shows a two-digit month and day in Japanese', () => {
    // Arrange
    const date = '2026-10-10'

    // Act
    const formatted = formatDate(date, 'ja')

    // Assert
    expect(formatted).toBe('2026年10月10日')
  })
})
