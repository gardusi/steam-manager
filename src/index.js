import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './actions/store'
import { Router, Route, Redirect, Switch } from 'react-router'
import { unregister } from './serviceWorker'
import Dashboard from './containers/dashboard'
import Statistics from './containers/statistics'
import Header from './components/newHeader'
import './index.css'

const [store, history] = configureStore(Immutable.Map())
ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Header />
      <Router history={history}>
        <Switch>
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/statistics' exact component={Statistics} />
          <Route>
            <Redirect to='/dashboard' />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
unregister()
