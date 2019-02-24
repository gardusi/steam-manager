import { Map } from 'immutable'
import { FetchStatus, fetchOwnedGames } from '../services/steam'

export const GET_OWNED_GAMES_START = 'GET_OWNED_GAMES_START'
export const GET_OWNED_GAMES_RESULT = 'GET_OWNED_GAMES_RESULT'
export const GET_OWNED_GAMES_END = 'GET_OWNED_GAMES_END'

const getOwnedGamesStart = () => ({ type: GET_OWNED_GAMES_START })
const getOwnedGamesEnd = () => ({ type: GET_OWNED_GAMES_END })
const getOwnedGamesResult = (ownedGames, status) => ({
  type: GET_OWNED_GAMES_RESULT,
  payload: { ownedGames, status }
})

export const getOwnedGames = () => async (dispatch) => {
  dispatch(getOwnedGamesStart())
  const { ownedGames, status } = await fetchOwnedGames()
  dispatch(getOwnedGamesResult(ownedGames, status))
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
    case GET_OWNED_GAMES_RESULT:
      return state
        .set('ownedGamesStatus', payload.status)
        .set('ownedGames', payload.ownedGames)
    default:
      return state
  }
}
