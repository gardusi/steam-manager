import styled from 'styled-components'
import DealPrice from '../dealPrice'
import GameRow from '../gameRow'
import { PriceBlock } from '../gameRow/style'
import { SteamColors, space } from '../../globalStyles'
import { formatRelativeDate } from '../../utils/format'

export const Tag = styled.span`
  display: inline-block;
  margin-right: ${space(2)};
  padding: 1px ${space(1.5)};
  border-radius: 2px;
  font-size: 11px;
  color: ${SteamColors.accent};
  background: ${SteamColors.surfaceHover};
`

const year = (timestamp) => new Date(timestamp).getFullYear()

export const ReleaseTags = ({ game }) => (
  <>
    {game.comingSoon && <Tag>{game.releaseDate ? `Lança em ${year(game.releaseDate)}` : 'Em breve'}</Tag>}
    {game.earlyAccess && <Tag>Acesso antecipado</Tag>}
  </>
)

// A game on the wishlist: release/early access tags, when it was added and its current deal
const WishlistCard = ({ item }) => (
  <GameRow
    game={item}
    subtitle={<><ReleaseTags game={item} />Adicionado {formatRelativeDate(item.addedAt)}</>}
    aside={<PriceBlock><DealPrice deal={item} comingSoon={item.comingSoon} /></PriceBlock>}
  />
)
export default WishlistCard
