import DealPrice from '../dealPrice'
import GameRow from '../gameRow'
import { PriceBlock } from '../gameRow/style'
import { ReleaseTags } from '../tags'
import { formatRelativeDate } from '../../utils/format'

// A game on the wishlist: release/early access tags, when it was added and its current deal
const WishlistCard = ({ item }) => (
  <GameRow
    game={item}
    subtitle={<><ReleaseTags game={item} />Adicionado {formatRelativeDate(item.addedAt)}</>}
    aside={<PriceBlock><DealPrice deal={item} comingSoon={item.comingSoon} /></PriceBlock>}
  />
)
export default WishlistCard
