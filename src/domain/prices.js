// True when the current Steam price matches (or beats) the lowest price Steam ever charged
export const isAtHistoricalLow = (price, steamLowest) =>
  price > 0 && steamLowest > 0 && price <= steamLowest

// Adds the current Steam deal to each item ({ appId }), from fetchGamePrices results.
// Unknown prices are null (no deal on Steam, or ITAD not configured), never 0:
// 0 means free.
export const attachPrices = (items, prices) => {
  const byAppId = new Map(prices.map(deal => [deal.appId, deal]))
  return items.map(item => {
    const { price = null, regular = null, cut = 0, steamLowest = null } = byAppId.get(item.appId) ?? {}
    return { ...item, price, regular, cut, steamLowest, atHistoricalLow: isAtHistoricalLow(price, steamLowest) }
  })
}
