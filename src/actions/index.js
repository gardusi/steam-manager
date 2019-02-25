import { Map } from 'immutable'
import { FetchStatus, fetchOwnedGames } from '../services/steam'

export const GET_OWNED_GAMES_START = 'GET_OWNED_GAMES_START'
export const GET_OWNED_GAMES_RESULT = 'GET_OWNED_GAMES_RESULT'
export const GET_OWNED_GAMES_END = 'GET_OWNED_GAMES_END'

const getOwnedGamesStart = () => ({ type: GET_OWNED_GAMES_START })
const getOwnedGamesEnd = () => ({ type: GET_OWNED_GAMES_END })
const getOwnedGamesResult = (games, metadata, status) => ({
  type: GET_OWNED_GAMES_RESULT,
  payload: { games, metadata, status }
})

export const getOwnedGames = () => async (dispatch) => {
  dispatch(getOwnedGamesStart())
  const { games, status } = await fetchOwnedGames()
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

  dispatch(getOwnedGamesResult(games, metadata, status))
  dispatch(getOwnedGamesEnd())
}

const initialState = Map({
  ownedGamesStatus: FetchStatus.Idle,
  ownedGames: []
})

export const appReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case GET_OWNED_GAMES_START:
      return state
    case GET_OWNED_GAMES_END:
      return state
        .set('ownedGamesStatus', FetchStatus.Idle)
    case GET_OWNED_GAMES_RESULT:
      return state
        .set('ownedGamesStatus', payload.status)
        .set('ownedGamesMetadata', payload.metadata)
        .set('ownedGames', payload.games)
    default:
      return state
  }
}
