import { describe, expect, it } from 'vitest'
import { discountInsights, nearestIndex, niceStep, pointsInRange, priceScale, timeTicks, year } from './model'

const day = 24 * 60 * 60 * 1000
const now = new Date(2026, 9, 17).getTime()
const point = (daysAgo, price, cut = 0) => ({ date: now - daysAgo * day, price, regular: 100, cut })

describe('niceStep', () => {
  it('rounds to 1, 2 or 5 times a power of ten', () => {
    expect(niceStep(33.99, 4)).toBe(10)
    expect(niceStep(249.99, 4)).toBe(100)
    expect(niceStep(7, 4)).toBe(2)
    expect(niceStep(18, 4)).toBe(5)
  })
})

describe('priceScale', () => {
  it('starts at zero and ends at a round value above the max', () => {
    const scale = priceScale(249.99)
    expect(scale.ticks[0]).toBe(0)
    expect(scale.max).toBe(300)
    expect(scale.ticks).toEqual([0, 100, 200, 300])
  })
  it('handles a zero max without dividing by zero', () => {
    expect(priceScale(0).max).toBeGreaterThan(0)
  })
})

describe('timeTicks', () => {
  it('uses yearly ticks on January 1st for spans over 3 years', () => {
    const { ticks, yearly } = timeTicks(new Date(2013, 6, 9).getTime(), now)
    expect(yearly).toBe(true)
    expect(ticks.map(t => new Date(t).getFullYear())).toEqual([2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026])
    expect(ticks.every(t => new Date(t).getMonth() === 0 && new Date(t).getDate() === 1)).toBe(true)
  })
  it('uses 3-month ticks for about a year', () => {
    const { ticks, yearly } = timeTicks(now - year, now)
    expect(yearly).toBe(false)
    expect(ticks.length).toBe(4)
    expect(ticks.every(t => t >= now - year && t <= now)).toBe(true)
  })
})

describe('pointsInRange', () => {
  const history = [point(800, 100), point(300, 25, 75), point(250, 100), point(10, 50, 50)]

  it('carries the price in effect at the range start and extends to now', () => {
    const points = pointsInRange(history, year, now)
    // 800 days ago is the last change before the 1-year window: its price was in effect
    expect(points[0]).toMatchObject({ date: now - year, price: 100, carried: true })
    expect(points.at(-1)).toMatchObject({ date: now, price: 50, carried: true })
    expect(points.filter(p => !p.carried).map(p => p.price)).toEqual([25, 100, 50])
  })
  it('shows the whole history when the span is null', () => {
    const points = pointsInRange(history, null, now)
    expect(points[0].date).toBe(history[0].date)
    expect(points.filter(p => !p.carried)).toHaveLength(3)
  })
})

describe('nearestIndex', () => {
  it('returns the index of the closest date', () => {
    const points = [{ date: 0 }, { date: 100 }, { date: 200 }]
    expect(nearestIndex(points, 140)).toBe(1)
    expect(nearestIndex(points, 160)).toBe(2)
    expect(nearestIndex(points, -50)).toBe(0)
  })
})

describe('discountInsights', () => {
  it('counts sales that started in the last year and the biggest cut', () => {
    const history = [
      point(500, 25, 75), point(480, 100),
      point(200, 50, 50), point(190, 40, 60), point(180, 100),
      point(20, 10, 90), point(15, 100)
    ]
    expect(discountInsights(history, now)).toEqual({
      salesLastYear: 2,
      biggestCutLastYear: 90,
      lastSale: now - 20 * day
    })
  })
  it('reports no sales when the price never dropped', () => {
    expect(discountInsights([point(100, 100)], now)).toEqual({ salesLastYear: 0, biggestCutLastYear: 0, lastSale: null })
  })
})
