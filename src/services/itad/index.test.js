import { describe, expect, it } from 'vitest'
import { cleanPriceHistory } from './index'

const entry = (timestamp, price, regular, cut = 0) => ({
  timestamp,
  deal: { price: { amount: price }, regular: { amount: regular }, cut }
})

describe('cleanPriceHistory', () => {
  it('maps ITAD entries and sorts them oldest first', () => {
    const history = cleanPriceHistory([
      entry('2026-10-15T19:19:30+02:00', 24.99, 249.99, 90),
      entry('2022-08-25T17:03:13+02:00', 249.99, 249.99)
    ])
    expect(history).toEqual([
      { date: Date.parse('2022-08-25T17:03:13+02:00'), price: 249.99, regular: 249.99, cut: 0 },
      { date: Date.parse('2026-10-15T19:19:30+02:00'), price: 24.99, regular: 249.99, cut: 90 }
    ])
  })

  it('drops entries with a zero regular price for paid games (ITAD glitch)', () => {
    // Half-Life 2 on 2024-11-15: half an hour at R$ 0 with regular price R$ 0
    const history = cleanPriceHistory([
      entry('2024-07-11T19:18:00+02:00', 32.99, 32.99),
      entry('2024-11-15T22:45:00+02:00', 0, 0),
      entry('2024-11-15T23:15:00+02:00', 3.29, 32.99, 90)
    ])
    expect(history.map(point => point.price)).toEqual([32.99, 3.29])
  })

  it('keeps zero prices for games that are free to play', () => {
    const history = cleanPriceHistory([entry('2024-01-01T00:00:00Z', 0, 0)])
    expect(history).toHaveLength(1)
  })
})
