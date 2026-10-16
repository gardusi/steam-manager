import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchStatus, fetchOwnedGames, fetchGamePrices } from '../services'
import { costPerHour, playtimeBuckets } from '../utils/playtime'
import { readCache, writeCache } from './cache'

const OwnedGamesContext = createContext(null)

const buildMetadata = (games) => {
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
    const { price = 0, lowest = 0 } = pricesByAppId.get(`${game.appId}`) ?? {}
    const withPrice = { ...game, price, lowest }
    return { ...withPrice, costPerHour: costPerHour(withPrice) }
  })

  // Without ITAD prices there's no account value to show
  if (gamePrices.length > 0) {
    metadata.accountValue = gamesWithPrice.reduce((acc, game) => acc + game.price, 0)
    metadata.valuePerHour = metadata.hoursPlayed ? metadata.accountValue / metadata.hoursPlayed : 0
  }

  return { games: gamesWithPrice, metadata }
}

const emptyState = {
  status: fetchStatus.idle,
  games: [],
  metadata: undefined,
  updatedAt: null,
  refreshing: false,
  error: null
}

// Starts from the cached library when there is one, so pages render immediately
const initState = () => {
  const cached = readCache()
  return cached ? { ...emptyState, ...cached, status: fetchStatus.success } : emptyState
}

export const OwnedGamesProvider = ({ children }) => {
  const [state, setState] = useState(initState)
  const [attempt, setAttempt] = useState(0)
  const reload = useCallback(() => setAttempt(current => current + 1), [])

  useEffect(() => {
    let cancelled = false
    // With data on screen, refresh in the background instead of showing a loading state
    setState(current => current.status === fetchStatus.success
      ? { ...current, refreshing: true, error: null }
      : { ...current, status: fetchStatus.fetching, error: null })

    loadOwnedGames()
      .then(({ games, metadata }) => {
        if (cancelled) return
        const updatedAt = Date.now()
        writeCache({ games, metadata, updatedAt })
        setState({ ...emptyState, status: fetchStatus.success, games, metadata, updatedAt })
      })
      .catch(error => {
        console.error(error)
        if (cancelled) return
        // Keep showing cached data when a refresh fails
        setState(current => current.status === fetchStatus.success
          ? { ...current, refreshing: false, error }
          : { ...current, status: fetchStatus.error, error })
      })

    return () => { cancelled = true }
  }, [attempt])

  const value = useMemo(() => ({ ...state, reload }), [state, reload])
  return <OwnedGamesContext value={value}>{children}</OwnedGamesContext>
}

export const useOwnedGames = () => {
  const context = useContext(OwnedGamesContext)
  if (!context) throw new Error('useOwnedGames must be used inside <OwnedGamesProvider>')
  return context
}
