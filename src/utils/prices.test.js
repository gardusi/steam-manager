import { describe, expect, it } from 'vitest'
import { isAtHistoricalLow } from './prices'

describe('isAtHistoricalLow', () => {
  it('is true when the current price matches or beats the Steam low', () => {
    expect(isAtHistoricalLow(24.99, 24.99)).toBe(true)
    expect(isAtHistoricalLow(19.99, 24.99)).toBe(true)
  })
  it('is false above the low', () => {
    expect(isAtHistoricalLow(33.99, 1.99)).toBe(false)
  })
  it('is false for free games or missing data', () => {
    expect(isAtHistoricalLow(0, 0)).toBe(false)
    expect(isAtHistoricalLow(null, 10)).toBe(false)
    expect(isAtHistoricalLow(10, null)).toBe(false)
  })
})
