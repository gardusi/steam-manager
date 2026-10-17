import request from '..'
import target from './target'
import { inBatches } from '../batches'

const batchSize = 200

// Returns [{ appId, price, regular, cut, steamLowest }], where:
// - price/regular/cut: current Steam price, price without discount and discount %
// - steamLowest: lowest price Steam ever charged (historical low)
// Games without a current Steam deal get null prices. Without an ITAD key, prices are skipped.
export const fetchGamePrices = async (appsId) => {
  if (!import.meta.env.ITAD_ENABLED) return []

  // { 'app/10': '<itad id>' | null }
  const lookups = Object.assign({}, ...await inBatches(appsId, batchSize, batch => request(target.lookupGameIds(batch))))
  const gameIds = Object.values(lookups).filter(Boolean)
  const prices = (await inBatches(gameIds, batchSize, batch => request(target.getGamePrices(batch)))).flat()
  const pricesById = new Map(prices.map(item => [item.id, item]))

  return Object.entries(lookups).map(([shopId, gameId]) => {
    const item = pricesById.get(gameId)
    const deal = item?.deals?.[0]
    return {
      appId: shopId.split('/')[1],
      price: deal?.price?.amount ?? null,
      regular: deal?.regular?.amount ?? null,
      cut: deal?.cut ?? 0,
      steamLowest: deal?.storeLow?.amount ?? null
    }
  })
}

// Steam price changes for one game, oldest first: [{ date, price, regular, cut }].
// Returns null when ITAD doesn't know the game or no key is configured.
export const fetchPriceHistory = async (appId) => {
  if (!import.meta.env.ITAD_ENABLED) return null
  const lookup = await request(target.lookupGameIds([appId]))
  const gameId = lookup[`app/${appId}`]
  if (!gameId) return null
  return cleanPriceHistory(await request(target.getPriceHistory(gameId)))
}

// Turns ITAD history entries into [{ date, price, regular, cut }], oldest first.
// ITAD occasionally records a paid game with a regular price of 0 for a few minutes
// (e.g. Half-Life 2 on 2024-11-15). A real giveaway keeps the regular price and shows
// a 100% cut, so these entries are collection glitches and are dropped.
export const cleanPriceHistory = (entries) => {
  const points = entries
    .map(entry => ({
      date: new Date(entry.timestamp).getTime(),
      price: entry.deal.price.amount,
      regular: entry.deal.regular.amount,
      cut: entry.deal.cut
    }))
    .sort((a, b) => a.date - b.date)
  const isPaid = points.some(point => point.regular > 0)
  return isPaid ? points.filter(point => point.regular > 0) : points
}
