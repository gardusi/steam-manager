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
