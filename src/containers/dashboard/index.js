import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import GameCard from '../../components/gameCard'
import Header from '../../components/header'
import Search from '../../components/search'
import { Background } from '../../globalStyles'
import { getOwnedGames } from '../../actions'

const Dashboard = props => {
  const [games, setGames] = useState([])

  const filterGames = (games, query) => {
    if (!query) setGames(games)
    else {
      const queryTokens = query.toLocaleLowerCase('en-US').split(/-| /)
      setGames(games.filter(game => {
        const nameTokens = game.name.toLocaleLowerCase('en-US').split(/-| /)
        return nameTokens.some(nt => queryTokens.some(qt => nt.startsWith(qt)))
      }))
    }
  }

  useEffect(() => {
    props.getOwnedGames()
  }, [])
  useEffect(() => {
    setGames(props.ownedGames)
  }, [props.ownedGames])

  return (
    <Fragment>
      <Background>
        <Header {...props.ownedGamesMetadata} />
        <Search onQuery={(query) => filterGames(props.ownedGames, query)} />
        { games && games
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
