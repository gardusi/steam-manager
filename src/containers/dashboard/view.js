import React, { Fragment } from 'react'
import { useOwnedGames } from './hooks'
import GameCard from '../../components/gameCard'
// import Header from '../../components/header'
import Search from '../../components/search'
import { Background } from '../../globalStyles'

const DashboardView = props => {
  const [games, filterGames] = useOwnedGames(props)
  return (
    <Fragment>
      <Background>
        {/* <Header {...props.ownedGamesMetadata} /> */}
        <Search onQuery={(query) => filterGames(query)} />
        { games && games
          .map(game => <GameCard game={game} key={game.appId} />)
        }
      </Background>
    </Fragment>
  )
}
export default DashboardView
