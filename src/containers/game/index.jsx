import { useParams } from 'react-router'
import { useAsync } from '../../hooks/useAsync'
import { fetchAchievements, fetchGamePrices, fetchPriceHistory, fetchStoreDetails } from '../../services'
import { useOwnedGames } from '../../state/ownedGames'
import { useWishlist } from '../../state/wishlist'
import GameView from './view'

const Game = () => {
  const appId = Number(useParams().appId)
  const valid = Number.isInteger(appId) && appId > 0
  const library = useOwnedGames()
  const wishlist = useWishlist()
  const owned = library.games.find(game => game.appId === appId)
  const wished = wishlist.items.find(item => item.appId === appId)

  // Each section loads on its own, so a slow or failing API doesn't block the others
  const store = useAsync(valid ? `store:${appId}` : null, () => fetchStoreDetails(appId))
  const deal = useAsync(valid ? `deal:${appId}` : null, async () => (await fetchGamePrices([appId]))[0] ?? null)
  const history = useAsync(valid ? `history:${appId}` : null, () => fetchPriceHistory(appId))
  // Steam only returns a player's achievements for games they own
  const achievements = useAsync(valid && owned ? `achievements:${appId}` : null, () => fetchAchievements(appId))

  return (
    <GameView
      appId={appId}
      valid={valid}
      owned={owned}
      wished={wished}
      store={store}
      deal={deal}
      history={history}
      achievements={achievements}
    />
  )
}
export default Game
