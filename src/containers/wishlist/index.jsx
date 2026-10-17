import { useWishlist } from '../../state/wishlist'
import WishlistView from './view'

const Wishlist = () => {
  const { items, status, error, reload } = useWishlist()
  return <WishlistView items={items} status={status} error={error} onRetry={reload} />
}
export default Wishlist
