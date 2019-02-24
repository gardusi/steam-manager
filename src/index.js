import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createBrowserHistory } from 'history'
import './index.css'
import { Router, Route, Redirect, Switch } from 'react-router'
import { unregister } from './serviceWorker'
import LandingContainer from './containers/landing'

const history = createBrowserHistory()
const rootElement = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={LandingContainer} />
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Router>
  </AppContainer>,
  rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
unregister()
