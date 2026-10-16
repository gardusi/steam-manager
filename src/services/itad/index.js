import request from '..'
import target from './target'

const batchSize = 200

const inBatches = async (items, fetchBatch) => {
  const batches = []
  for (let i = 0; i < items.length; i += batchSize) batches.push(items.slice(i, i + batchSize))
  return Promise.all(batches.map(fetchBatch))
}

// Returns [{ appId, price, lowest }]. Without an ITAD key, prices are skipped.
export const fetchGamePrices = async (appsId) => {
  if (!import.meta.env.ITAD_ENABLED) return []

  // { 'app/10': '<itad id>' | null }
  const lookups = Object.assign({}, ...await inBatches(appsId, batch => request(target.lookupGameIds(batch))))
  const gameIds = Object.values(lookups).filter(Boolean)
  const prices = (await inBatches(gameIds, batch => request(target.getGamePrices(batch)))).flat()
  const pricesById = new Map(prices.map(item => [item.id, item]))

  return Object.entries(lookups).map(([shopId, gameId]) => {
    const item = pricesById.get(gameId)
    // TODO: Read regular and cut for discounts
    return {
      appId: shopId.split('/')[1],
      price: item?.deals?.[0]?.price?.amount ?? 0,
      lowest: item?.historyLow?.all?.amount ?? 0
    }
  })
}
