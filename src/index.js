import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import { AppContainer } from 'react-hot-loader'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import configureStore from './actions/store'
import { Router, Route, Redirect, Switch } from 'react-router'
import { unregister } from './serviceWorker'
import Dashboard from './containers/dashboard'
import './index.css'

const history = createBrowserHistory()
const store = configureStore(Immutable.Map(), history)
const rootElement = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={Dashboard} />
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </AppContainer>,
  rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
unregister()
