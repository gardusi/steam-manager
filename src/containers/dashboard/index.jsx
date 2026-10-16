import { useOwnedGames } from '../../state/ownedGames'
import DashboardView from './view'

const Dashboard = () => {
  const { games, metadata } = useOwnedGames()
  return <DashboardView ownedGames={games} ownedGamesMetadata={metadata} />
}
export default Dashboard
