import { useOwnedGames } from '../../state/ownedGames'
import DashboardView from './view'

const Dashboard = () => {
  const { games, status, error, reload } = useOwnedGames()
  return <DashboardView ownedGames={games} status={status} error={error} onRetry={reload} />
}
export default Dashboard
