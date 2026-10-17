import { describe, expect, it } from 'vitest'
import { attachPrices, isAtHistoricalLow } from './prices'

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

describe('attachPrices', () => {
  const items = [{ appId: 1, name: 'A' }, { appId: 2, name: 'B' }]

  it('merges the deal by appId and flags the historical low', () => {
    const [a] = attachPrices(items, [{ appId: 1, price: 24.99, regular: 249.99, cut: 90, steamLowest: 24.99 }])
    expect(a).toEqual({ appId: 1, name: 'A', price: 24.99, regular: 249.99, cut: 90, steamLowest: 24.99, atHistoricalLow: true })
  })

  it('uses null, not 0, for unknown prices (0 means free)', () => {
    const [, b] = attachPrices(items, [])
    expect(b).toMatchObject({ price: null, regular: null, cut: 0, steamLowest: null, atHistoricalLow: false })
  })
})
