import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router/immutable'
import { Map } from 'immutable'
import thunk from 'redux-thunk'
import reducers from './reducers'

export default (initialState = Map()) => {
  const browserHistory = createBrowserHistory()
  let middleware = applyMiddleware(thunk, routerMiddleware(browserHistory))
  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension())
    }
  }
  const store = createStore(
    reducers(browserHistory),
    initialState,
    compose(middleware)
  )
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers(browserHistory))
    })
  }
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.get('routing')
  })
  return [store, history]
}
