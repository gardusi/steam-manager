import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router/immutable'
import { Map } from 'immutable'
import thunk from 'redux-thunk'
import createRootReducer from './reducers'

export default (initialState = Map()) => {
  // Creates the Browser History
  const history = createBrowserHistory()

  // Prepares a compose with Dev tools for debugging
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  // Applies the thunk and router middlewares
  let middleware = applyMiddleware(thunk, routerMiddleware(history))

  // Creates the store using reducers, initialState and middlewares
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(middleware)
  )

  // Hot reloader for reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(history))
    })
  }

  return [store, history]
}
