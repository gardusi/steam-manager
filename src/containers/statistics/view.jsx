import Header from '../../components/header'
import { Background } from '../../globalStyles'

const StatisticsView = ({ ownedGamesMetadata }) => (
  <Background>
    <Header {...ownedGamesMetadata} />
  </Background>
)
export default StatisticsView
