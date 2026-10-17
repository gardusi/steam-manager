import { useWishlist } from '../../state/wishlist'
import WishlistView from './view'

const Wishlist = () => {
  const { items, status, reload } = useWishlist()
  return <WishlistView items={items} status={status} onRetry={reload} />
}
export default Wishlist
