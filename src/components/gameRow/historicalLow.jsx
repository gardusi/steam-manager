import { Lowest, LowestBadge } from './style'
import { formatPrice } from '../../utils/format'
import { isAtHistoricalLow } from '../../utils/prices'

const explanation = 'Menor preço já cobrado na Steam, segundo o IsThereAnyDeal'

// Steam historical low: a badge when the current price matches it, otherwise the value
const HistoricalLow = ({ price, steamLowest }) => {
  if (isAtHistoricalLow(price, steamLowest)) {
    return <LowestBadge title={explanation}>No mínimo histórico</LowestBadge>
  }
  if (!(steamLowest > 0)) return null
  return <Lowest title={explanation}>Mínimo histórico: {formatPrice(steamLowest)}</Lowest>
}
export default HistoricalLow
