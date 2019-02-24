import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import GameCard from '../../components/gameCard'
import { Background } from '../../globalStyles'
import { getOwnedGames } from '../../actions'

const Dashboard = props => {
  useEffect(() => {
    props.getOwnedGames()
  }, [])

  return (
    <Fragment>
      <Background>
        { props.ownedGames && props.ownedGames
          .map(game => <GameCard game={game} key={game.appId} />)
        }
      </Background>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  ownedGames: state.get('app').get('ownedGames')
})

const mapDispatchToProps = dispatch => ({
  getOwnedGames () { dispatch(getOwnedGames()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
