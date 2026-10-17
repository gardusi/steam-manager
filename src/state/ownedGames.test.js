import { describe, expect, it } from 'vitest'
import { buildMetadata } from './ownedGames'

const games = [
  { name: 'A', playtime: 0 },
  { name: 'B', playtime: 0.5 },
  { name: 'C', playtime: 5 },
  { name: 'D', playtime: 50 },
  { name: 'E', playtime: 150 }
]

describe('buildMetadata', () => {
  const metadata = buildMetadata(games)

  it('sums playtime and counts games', () => {
    expect(metadata.hoursPlayed).toBe(205.5)
    expect(metadata.numberOfGames).toBe(5)
  })

  it('counts games per playtime bucket', () => {
    expect(metadata.buckets).toEqual({
      '100h-ou-mais': 1,
      '10-a-100h': 1,
      '1-a-10h': 1,
      'menos-de-1h': 1,
      'nunca-jogados': 1
    })
  })

  it('computes the share of games ever played', () => {
    expect(metadata.timeNeverPlayed).toBe(1)
    expect(metadata.percentualPlayed).toBe(0.8)
  })

  it('handles an empty library instead of throwing', () => {
    const empty = buildMetadata([])
    expect(empty.numberOfGames).toBe(0)
    expect(empty.hoursPlayed).toBe(0)
    expect(empty.percentualPlayed).toBe(0)
    expect(Object.values(empty.buckets).every(count => count === 0)).toBe(true)
  })
})
