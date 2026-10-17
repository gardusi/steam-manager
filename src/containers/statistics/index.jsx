import { useLibrary } from '../../state/library'
import StatisticsView from './view'

const Statistics = () => {
  const { games, metadata, isLoading, isError, error, reload } = useLibrary()
  return <StatisticsView games={games} metadata={metadata} isLoading={isLoading} isError={isError} error={error} onRetry={reload} />
}
export default Statistics
