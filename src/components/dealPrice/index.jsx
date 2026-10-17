import styled from 'styled-components'
import HistoricalLow from '../gameRow/historicalLow'
import { Price } from '../gameRow/style'
import { SteamColors, VisuallyHidden, space } from '../../globalStyles'
import { formatPrice } from '../../utils/format'

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

// Current Steam price ({ price, regular, cut, steamLowest }) with discount and historical low
const DealPrice = ({ deal, comingSoon = false }) => {
  if (deal?.price == null) {
    return <Unavailable>{comingSoon ? 'Em breve' : 'Indisponível'}</Unavailable>
  }
  if (deal.price === 0) return <Price>Gratuito</Price>
  return (
    <>
      {deal.cut > 0
        ? (
            <DealRow>
              <VisuallyHidden>{`${deal.cut}% de desconto: de ${formatPrice(deal.regular)} por ${formatPrice(deal.price)}`}</VisuallyHidden>
              <DiscountPct aria-hidden='true'>-{deal.cut}%</DiscountPct>
              <DealPrices aria-hidden='true'>
                <RegularPrice>{formatPrice(deal.regular)}</RegularPrice>
                <SalePrice>{formatPrice(deal.price)}</SalePrice>
              </DealPrices>
            </DealRow>
          )
        : <Price>{formatPrice(deal.price)}</Price>}
      <HistoricalLow price={deal.price} steamLowest={deal.steamLowest} />
    </>
  )
}
export default DealPrice
