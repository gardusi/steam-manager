import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux-immutable'
import { appReducer } from './index'

export default combineReducers({
  routing: routerReducer,
  app: appReducer
})
