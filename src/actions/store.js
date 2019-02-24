import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable'
import { Map } from 'immutable'
import thunk from 'redux-thunk'
import reducers from './reducers'

export default (initialState = Map(), history) => {
  let middleware = applyMiddleware(thunk, routerMiddleware(history))
  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }
  const store = createStore(
    connectRouter(history)(reducers),
    initialState,
    compose(middleware)
  )
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(connectRouter(history)(reducers))
    })
  }
  return store
}
