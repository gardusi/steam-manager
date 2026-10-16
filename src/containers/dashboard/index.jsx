import { useOwnedGames } from '../../state/ownedGames'
import DashboardView from './view'

const Dashboard = () => {
  const { games } = useOwnedGames()
  return <DashboardView ownedGames={games} />
}
export default Dashboard
