import { sortOptions, useGameList } from './hooks'
import GameCard from '../../components/gameCard'
import Search from '../../components/search'
import { Background } from '../../globalStyles'

const DashboardView = ({ ownedGames }) => {
  const { games, setQuery, sortOption, setSortOption } = useGameList(ownedGames)
  return (
    <Background>
      <Search
        onQuery={setQuery}
        sortOptions={sortOptions}
        sortOption={sortOption}
        onSort={setSortOption}
      />
      {games.map(game => <GameCard game={game} key={game.appId} />)}
    </Background>
  )
}
export default DashboardView
