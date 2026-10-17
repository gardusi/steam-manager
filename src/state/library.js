import { useQuery } from '@tanstack/react-query'
import { buildLibrary } from '../domain/library'
import { fetchGamePrices, fetchOwnedGames } from '../services'
import { toResource } from './resource'

const noGames = []

const loadLibrary = async () => {
  const games = await fetchOwnedGames()
  const prices = await fetchGamePrices(games.map(game => game.appId))
  return buildLibrary(games, prices)
}

// The user's owned games with prices and totals: { games, metadata, ...resource }
export const useLibrary = () => {
  const resource = toResource(useQuery({ queryKey: ['library'], queryFn: loadLibrary, meta: { persist: true } }))
  return { ...resource, games: resource.data?.games ?? noGames, metadata: resource.data?.metadata }
}
