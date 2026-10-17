// Pure calculations behind the price history chart (no React, no DOM)

const day = 24 * 60 * 60 * 1000
export const year = 365 * day

// Rounds tick steps to 1, 2 or 5 times a power of ten
export const niceStep = (max, count) => {
  const raw = max / count
  const power = 10 ** Math.floor(Math.log10(raw))
  return [1, 2, 5, 10].map(m => m * power).find(step => step >= raw)
}

// Price axis from zero with ~4 round ticks and a little headroom above the max
export const priceScale = (maxPrice) => {
  const step = niceStep(maxPrice || 1, 4)
  const max = Math.ceil((maxPrice * 1.05) / step) * step || step
  const ticks = Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step)
  return { max, ticks }
}

// Month starts between `start` and `end`, spaced so long spans don't crowd the axis:
// yearly (January) above 3 years, then every 6, 3 or 1 months.
export const timeTicks = (start, end) => {
  const spanYears = (end - start) / year
  const monthStep = spanYears > 3 ? 12 : spanYears > 1.5 ? 6 : spanYears > 0.5 ? 3 : 1
  const cursor = new Date(start)
  cursor.setDate(1)
  cursor.setHours(0, 0, 0, 0)
  if (monthStep === 12) cursor.setMonth(0)
  const ticks = []
  while (cursor.getTime() <= end) {
    if (cursor.getTime() >= start) ticks.push(cursor.getTime())
    cursor.setMonth(cursor.getMonth() + monthStep)
  }
  return { ticks, yearly: monthStep === 12 }
}

// Price changes in the selected range, plus a point at the range start (the price
// in effect then) and one at `now` so the step line reaches today.
// `history` must be sorted oldest first; `span` null means the whole history.
export const pointsInRange = (history, span, now) => {
  const start = span ? now - span : history[0].date
  const before = history.filter(point => point.date <= start).at(-1)
  const inside = history.filter(point => point.date > start)
  const points = before ? [{ ...before, date: start, carried: true }, ...inside] : inside
  return [...points, { ...points.at(-1), date: now, carried: true }]
}

// Index of the point whose date is closest to `date`
export const nearestIndex = (points, date) => {
  let best = 0
  points.forEach((point, i) => {
    if (Math.abs(point.date - date) < Math.abs(points[best].date - date)) best = i
  })
  return best
}

// Discount periods that started in the last year and when the latest one began
export const discountInsights = (history, now) => {
  const starts = history.filter((point, i) => point.cut > 0 && !(history[i - 1]?.cut > 0))
  const lastYear = starts.filter(point => point.date >= now - year)
  return {
    salesLastYear: lastYear.length,
    biggestCutLastYear: Math.max(0, ...history.filter(p => p.date >= now - year).map(p => p.cut)),
    lastSale: starts.at(-1)?.date ?? null
  }
}
