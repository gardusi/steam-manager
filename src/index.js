import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './actions/store'
import { unregister } from './serviceWorker'
import App from './app'
import './index.css'

const initialState = Immutable.Map()
const [store, history] = configureStore(initialState)

const render = () => {
  console.log(store.getState(), history)
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('react-root')
  )
}

render()

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept('./app', () => {
    render()
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
unregister()
