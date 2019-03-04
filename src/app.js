import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { Route, Redirect, Switch } from 'react-router'
import Header from './components/newHeader'
import Dashboard from './containers/dashboard'
import Statistics from './containers/statistics'
import './index.css'

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Header />
      <Switch>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/statistics' exact component={Statistics} />
        <Redirect to='/dashboard' />
      </Switch>
    </div>
  </ConnectedRouter>
)
App.propTypes = {
  history: PropTypes.object
}
export default App
