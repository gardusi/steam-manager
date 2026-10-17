import { describe, expect, it } from 'vitest'
import { summarizeWishlist } from './wishlist'

describe('summarizeWishlist', () => {
  it('totals current prices and today\'s savings', () => {
    const summary = summarizeWishlist([
      { price: 24.99, regular: 249.99, cut: 90, atHistoricalLow: true },
      { price: 50, regular: 50, cut: 0, atHistoricalLow: false },
      { price: null, regular: null, cut: 0, atHistoricalLow: false }
    ])
    expect(summary).toEqual({
      count: 3,
      onSale: 1,
      biggestCut: 90,
      atHistoricalLow: 1,
      total: 74.99,
      savings: 225
    })
  })

  it('handles an empty wishlist', () => {
    expect(summarizeWishlist([])).toMatchObject({ count: 0, onSale: 0, biggestCut: 0, total: 0, savings: 0 })
  })
})
