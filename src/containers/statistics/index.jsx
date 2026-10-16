import { useOwnedGames } from '../../state/ownedGames'
import StatisticsView from './view'

const Statistics = () => {
  const { games, metadata, status, reload } = useOwnedGames()
  return <StatisticsView games={games} metadata={metadata} status={status} onRetry={reload} />
}
export default Statistics
