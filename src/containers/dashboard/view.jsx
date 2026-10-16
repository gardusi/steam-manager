import { useFilteredGames } from './hooks'
import GameCard from '../../components/gameCard'
// import Header from '../../components/header'
import Search from '../../components/search'
import { Background } from '../../globalStyles'

const DashboardView = ({ ownedGames }) => {
  const [games, filterGames] = useFilteredGames(ownedGames)
  return (
    <Background>
      {/* <Header {...ownedGamesMetadata} /> */}
      <Search onQuery={filterGames} />
      {games.map(game => <GameCard game={game} key={game.appId} />)}
    </Background>
  )
}
export default DashboardView
