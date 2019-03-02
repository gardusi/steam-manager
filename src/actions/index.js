import { Map } from 'immutable'
import { GET_OWNED_GAMES } from './types'
import { fetchStatus, fetchOwnedGames, fetchGamePrices } from '../services'

export const getOwnedGames = () => async (dispatch) => {
  dispatch(getOwnedGamesStart())
  try {
    const games = await fetchOwnedGames()
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

    const gamePrices = await fetchGamePrices(games.map(game => game.appId))
    const gamesWithPrice = games.map(game => {
      const { price, lowest } = gamePrices.find(item => item.appId === `${game.appId}`)
      return { ...game, price, lowest }
    })

    dispatch(getOwnedGamesResult(gamesWithPrice, metadata))
  } catch (error) {
    dispatch(getOwnedGamesError(error))
  } finally {
    dispatch(getOwnedGamesEnd())
  }
}

const getOwnedGamesStart = () => ({ type: GET_OWNED_GAMES.START })
const getOwnedGamesEnd = () => ({ type: GET_OWNED_GAMES.END })
const getOwnedGamesError = (error) => ({
  type: GET_OWNED_GAMES.ERROR, payload: { error }
})
const getOwnedGamesResult = (games, metadata) => ({
  type: GET_OWNED_GAMES.RESULT, payload: { games, metadata }
})

const initialState = Map({
  ownedGamesStatus: fetchStatus.idle,
  ownedGames: []
})

export const appReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case GET_OWNED_GAMES.START:
      return state
        .set('ownedGamesStatus', fetchStatus.fetching)
    case GET_OWNED_GAMES.END:
      return state
        .set('ownedGamesStatus', fetchStatus.idle)
    case GET_OWNED_GAMES.ERROR:
      return state
        .set('ownedGamesStatus', fetchStatus.idle)
    case GET_OWNED_GAMES.RESULT:
      return state
        .set('ownedGamesStatus', payload.status)
        .set('ownedGamesMetadata', payload.metadata)
        .set('ownedGames', payload.games)
    default:
      return state
  }
}
