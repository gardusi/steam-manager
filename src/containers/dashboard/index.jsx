import { useLibrary } from '../../state/library'
import DashboardView from './view'

const Dashboard = () => {
  const { games, isLoading, isError, error, reload } = useLibrary()
  return <DashboardView ownedGames={games} isLoading={isLoading} isError={isError} error={error} onRetry={reload} />
}
export default Dashboard
