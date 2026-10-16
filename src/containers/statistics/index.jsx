import { useOwnedGames } from '../../state/ownedGames'
import StatisticsView from './view'

const Statistics = () => {
  const { metadata } = useOwnedGames()
  return <StatisticsView ownedGamesMetadata={metadata} />
}
export default Statistics
