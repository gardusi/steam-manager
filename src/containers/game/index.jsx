import { useParams } from 'react-router'
import { useGameDetails, isValidAppId } from '../../state/game'
import { useLibrary } from '../../state/library'
import { useWishlist } from '../../state/wishlist'
import GameView from './view'

const Game = () => {
  const appId = Number(useParams().appId)
  const owned = useLibrary().games.find(game => game.appId === appId)
  const wished = useWishlist().items.find(item => item.appId === appId)
  const details = useGameDetails(appId, { owned: Boolean(owned) })

  return <GameView valid={isValidAppId(appId)} owned={owned} wished={wished} {...details} />
}
export default Game
