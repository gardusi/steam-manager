import styled from 'styled-components'
import GameRow from '../gameRow'
import HistoricalLow from '../gameRow/historicalLow'
import { PriceBlock, Price } from '../gameRow/style'
import { SteamColors, VisuallyHidden, space } from '../../globalStyles'
import { formatPrice, formatRelativeDate } from '../../utils/format'

// Steam-style discount: green "-75%" block next to the old and new prices
const DealRow = styled.div`
  display: flex;
  align-items: stretch;
  border-radius: 2px;
  overflow: hidden;
`
const DiscountPct = styled.span`
  display: flex;
  align-items: center;
  padding: 0 ${space(2)};
  font-size: 16px;
  font-weight: 700;
  color: ${SteamColors.discount};
  background: ${SteamColors.discountBg};
`
const DealPrices = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: ${space(1)} ${space(2)};
  background: rgba(0, 0, 0, 0.25);
  line-height: 1.2;
`
const RegularPrice = styled.s`
  font-size: 11px;
  color: ${SteamColors.textMuted};
`
const SalePrice = styled.span`
  font-size: 15px;
  color: ${SteamColors.discount};
  font-variant-numeric: tabular-nums;
`
const Unavailable = styled.p`
  font-size: 13px;
  color: ${SteamColors.textMuted};
`
const Tag = styled.span`
  display: inline-block;
  margin-right: ${space(2)};
  padding: 1px ${space(1.5)};
  border-radius: 2px;
  font-size: 11px;
  color: ${SteamColors.accent};
  background: ${SteamColors.surfaceHover};
`

const year = (timestamp) => new Date(timestamp).getFullYear()

const Subtitle = ({ item }) => (
  <>
    {item.comingSoon && <Tag>{item.releaseDate ? `Lança em ${year(item.releaseDate)}` : 'Em breve'}</Tag>}
    {item.earlyAccess && <Tag>Acesso antecipado</Tag>}
    Adicionado {formatRelativeDate(item.addedAt)}
  </>
)

const PriceInfo = ({ item }) => {
  if (item.price == null) {
    return <Unavailable>{item.comingSoon ? 'Em breve' : 'Indisponível'}</Unavailable>
  }
  if (item.price === 0) return <Price>Gratuito</Price>
  return (
    <>
      {item.cut > 0
        ? (
            <DealRow>
              <VisuallyHidden>{`${item.cut}% de desconto: de ${formatPrice(item.regular)} por ${formatPrice(item.price)}`}</VisuallyHidden>
              <DiscountPct aria-hidden='true'>-{item.cut}%</DiscountPct>
              <DealPrices aria-hidden='true'>
                <RegularPrice>{formatPrice(item.regular)}</RegularPrice>
                <SalePrice>{formatPrice(item.price)}</SalePrice>
              </DealPrices>
            </DealRow>
          )
        : <Price>{formatPrice(item.price)}</Price>}
      <HistoricalLow price={item.price} steamLowest={item.steamLowest} />
    </>
  )
}

// A game on the wishlist: release/early access tags, when it was added and its current deal
const WishlistCard = ({ item }) => (
  <GameRow
    game={item}
    subtitle={<Subtitle item={item} />}
    aside={<PriceBlock><PriceInfo item={item} /></PriceBlock>}
  />
)
export default WishlistCard
