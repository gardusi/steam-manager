import { connect } from 'react-redux'
import DashboardView from './view'
import { getOwnedGames } from '../../actions'

const mapStateToProps = state => ({
  ownedGames: state.get('app').get('ownedGames'),
  ownedGamesMetadata: state.get('app').get('ownedGamesMetadata')
})

const mapDispatchToProps = dispatch => ({
  getOwnedGames () { dispatch(getOwnedGames()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)
