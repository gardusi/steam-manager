import { useQuery } from '@tanstack/react-query'
import { fetchAchievements, fetchGamePrices, fetchPriceHistory, fetchStoreDetails } from '../services'
import { toResource } from './resource'

const isValidAppId = (appId) => Number.isInteger(appId) && appId > 0

const useGamePart = (appId, part, queryFn, enabled = true) => toResource(useQuery({
  queryKey: ['game', appId, part],
  queryFn,
  enabled: isValidAppId(appId) && enabled
}))

// Data for one game's page. Each part loads on its own, so a slow or failing API
// doesn't block the others. Kept in memory only (not persisted).
export const useGameDetails = (appId, { owned }) => ({
  store: useGamePart(appId, 'store', () => fetchStoreDetails(appId)),
  deal: useGamePart(appId, 'deal', async () => (await fetchGamePrices([appId]))[0] ?? null),
  history: useGamePart(appId, 'history', () => fetchPriceHistory(appId)),
  // Steam only returns a player's achievements for games they own
  achievements: useGamePart(appId, 'achievements', () => fetchAchievements(appId), owned)
})

export { isValidAppId }
