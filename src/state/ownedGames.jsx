import { createContext, useContext, useEffect, useState } from 'react'
import { fetchStatus, fetchOwnedGames, fetchGamePrices } from '../services'

const OwnedGamesContext = createContext(null)

const buildMetadata = (games) => {
  const metadata = {
    hoursPlayed: games.reduce((acc, game) => acc + game.playtime, 0),
    mostPlayed: games.reduce((max, game) => max.playtime < game.playtime ? game : max),
    numberOfGames: games.length,
    time100plus: games.filter(game => game.playtime >= 100).length,
    time100to10: games.filter(game => game.playtime < 100 && game.playtime >= 10).length,
    time10to1: games.filter(game => game.playtime < 10 && game.playtime >= 1).length,
    time1minus: games.filter(game => game.playtime < 1 && game.playtime >= 0.01).length,
    timeNeverPlayed: games.filter(game => game.playtime < 0.01).length
  }
  metadata.percentualPlayed = 1 - metadata.timeNeverPlayed / metadata.numberOfGames
  return metadata
}

const loadOwnedGames = async () => {
  const games = await fetchOwnedGames()
  const metadata = buildMetadata(games)

  const gamePrices = await fetchGamePrices(games.map(game => game.appId))
  const gamesWithPrice = games.map(game => {
    const { price, lowest } = gamePrices.find(item => item.appId === `${game.appId}`)
    return { ...game, price, lowest }
  })

  return { games: gamesWithPrice, metadata }
}

const initialState = {
  status: fetchStatus.idle,
  games: [],
  metadata: undefined,
  error: null
}

export const OwnedGamesProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let cancelled = false
    setState(current => ({ ...current, status: fetchStatus.fetching }))

    loadOwnedGames()
      .then(({ games, metadata }) => {
        if (!cancelled) setState({ status: fetchStatus.success, games, metadata, error: null })
      })
      .catch(error => {
        console.error(error)
        if (!cancelled) setState(current => ({ ...current, status: fetchStatus.error, error }))
      })

    return () => { cancelled = true }
  }, [])

  return <OwnedGamesContext value={state}>{children}</OwnedGamesContext>
}

export const useOwnedGames = () => {
  const context = useContext(OwnedGamesContext)
  if (!context) throw new Error('useOwnedGames must be used inside <OwnedGamesProvider>')
  return context
}
