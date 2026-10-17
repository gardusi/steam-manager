import { useOwnedGames } from '../../state/ownedGames'
import StatisticsView from './view'

const Statistics = () => {
  const { games, metadata, status, error, reload } = useOwnedGames()
  return <StatisticsView games={games} metadata={metadata} status={status} error={error} onRetry={reload} />
}
export default Statistics
