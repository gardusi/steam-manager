import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import GameCard from '../../components/gameCard'
import Header from '../../components/header'
import { Background } from '../../globalStyles'
import { getOwnedGames } from '../../actions'

const Dashboard = props => {
  useEffect(() => {
    props.getOwnedGames()
  }, [])

  return (
    <Fragment>
      <Background>
        <Header {...props.ownedGamesMetadata} />
        { props.ownedGames && props.ownedGames
          .map(game => <GameCard game={game} key={game.appId} />)
        }
      </Background>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  ownedGames: state.get('app').get('ownedGames'),
  ownedGamesMetadata: state.get('app').get('ownedGamesMetadata')
})

const mapDispatchToProps = dispatch => ({
  getOwnedGames () { dispatch(getOwnedGames()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
