import { useOwnedGames } from '../../state/ownedGames'
import DashboardView from './view'

const Dashboard = () => {
  const { games, status, reload } = useOwnedGames()
  return <DashboardView ownedGames={games} status={status} onRetry={reload} />
}
export default Dashboard
