import { createContext, useContext, useMemo } from 'react'
import { fetchOwnedGames, fetchGamePrices } from '../services'
import { costPerHour, playtimeBuckets } from '../utils/playtime'
import { dropCache } from './cache'
import { useCachedResource } from './useCachedResource'

const OwnedGamesContext = createContext(null)

// Older versions stored a different shape
dropCache('owned-games:v2')
dropCache('owned-games:v3')

export const buildMetadata = (games) => {
  const buckets = Object.fromEntries(playtimeBuckets.map(bucket =>
    [bucket.key, games.filter(game => bucket.test(game.playtime)).length]
  ))
  const timeNeverPlayed = buckets['nunca-jogados']
  return {
    hoursPlayed: games.reduce((acc, game) => acc + game.playtime, 0),
    mostPlayed: games.reduce((max, game) => max.playtime < game.playtime ? game : max),
    numberOfGames: games.length,
    buckets,
    timeNeverPlayed,
    percentualPlayed: 1 - timeNeverPlayed / games.length
  }
}

const loadOwnedGames = async () => {
  const games = await fetchOwnedGames()
  const metadata = buildMetadata(games)

  const gamePrices = await fetchGamePrices(games.map(game => game.appId))
  const pricesByAppId = new Map(gamePrices.map(item => [item.appId, item]))
  const gamesWithPrice = games.map(game => {
    const prices = pricesByAppId.get(`${game.appId}`)
    const withPrice = { ...game, price: prices?.price ?? 0, steamLowest: prices?.steamLowest ?? 0 }
    return { ...withPrice, costPerHour: costPerHour(withPrice) }
  })

  // Without ITAD prices there's no account value to show
  if (gamePrices.length > 0) {
    metadata.accountValue = gamesWithPrice.reduce((acc, game) => acc + game.price, 0)
    metadata.valuePerHour = metadata.hoursPlayed ? metadata.accountValue / metadata.hoursPlayed : 0
  }

  return { games: gamesWithPrice, metadata }
}

export const OwnedGamesProvider = ({ children }) => {
  const resource = useCachedResource('owned-games:v4', loadOwnedGames)
  const value = useMemo(() => {
    const { data, ...rest } = resource
    return { ...rest, games: data?.games ?? [], metadata: data?.metadata }
  }, [resource])
  return <OwnedGamesContext value={value}>{children}</OwnedGamesContext>
}

export const useOwnedGames = () => {
  const context = useContext(OwnedGamesContext)
  if (!context) throw new Error('useOwnedGames must be used inside <OwnedGamesProvider>')
  return context
}
