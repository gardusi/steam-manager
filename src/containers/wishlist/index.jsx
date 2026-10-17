import { useWishlist } from '../../state/wishlist'
import WishlistView from './view'

const Wishlist = () => {
  const { items, isLoading, isError, error, reload } = useWishlist()
  return <WishlistView items={items} isLoading={isLoading} isError={isError} error={error} onRetry={reload} />
}
export default Wishlist
