import { describe, expect, it } from 'vitest'
import { costPerHour, minHoursForCostPerHour, neverPlayedThreshold, playtimeBuckets } from './playtime'

describe('playtimeBuckets', () => {
  const samples = [0, 0.005, neverPlayedThreshold, 0.5, 0.99, 1, 9.99, 10, 99.9, 100, 653]

  it('puts every playtime in exactly one bucket', () => {
    for (const hours of samples) {
      const matches = playtimeBuckets.filter(bucket => bucket.test(hours))
      expect(matches, `${hours} h`).toHaveLength(1)
    }
  })

  it('uses the boundaries shown in the labels', () => {
    const bucketOf = (hours) => playtimeBuckets.find(bucket => bucket.test(hours)).key
    expect(bucketOf(0)).toBe('nunca-jogados')
    expect(bucketOf(0.5)).toBe('menos-de-1h')
    expect(bucketOf(1)).toBe('1-a-10h')
    expect(bucketOf(10)).toBe('10-a-100h')
    expect(bucketOf(100)).toBe('100h-ou-mais')
  })
})

describe('costPerHour', () => {
  it('divides price by hours played', () => {
    expect(costPerHour({ price: 30, playtime: 10 })).toBe(3)
  })
  it('is null below the minimum playtime, where the number would be misleading', () => {
    expect(costPerHour({ price: 200, playtime: minHoursForCostPerHour - 0.01 })).toBeNull()
  })
  it('is null without a price', () => {
    expect(costPerHour({ price: 0, playtime: 50 })).toBeNull()
    expect(costPerHour({ price: null, playtime: 50 })).toBeNull()
  })
})
