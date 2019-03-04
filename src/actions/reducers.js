import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { appReducer } from './index'

export default (history) => combineReducers({
  router: connectRouter(history),
  app: appReducer
})
