import GameRow, { GameRowSkeleton } from '../gameRow'
import HistoricalLow from '../gameRow/historicalLow'
import { PlayButton, PriceBlock, Price, CostPerHour } from '../gameRow/style'
import { formatHours, formatPrice, formatRelativeDate } from '../../utils/format'
import { isPlayed } from '../../domain/playtime'

const playtimeLabel = (game) => {
  if (!isPlayed(game)) return 'Nunca jogado'
  const hours = `${formatHours(game.playtime)} de jogo`
  return game.lastPlayed ? `${hours} · jogado ${formatRelativeDate(game.lastPlayed)}` : hours
}

// A game in the owned library
const GameCard = ({ game, showCostPerHour = false }) => {
  return (
    <GameRow
      game={game}
      overlay={
        <PlayButton href={`steam://run/${game.appId}`} aria-label={`Jogar ${game.name}`}>
          ▶ Jogar
        </PlayButton>
      }
      subtitle={playtimeLabel(game)}
      aside={game.price > 0 && (
        <PriceBlock>
          <Price>{formatPrice(game.price)}</Price>
          {showCostPerHour && (
            <CostPerHour>
              {game.costPerHour != null ? `${formatPrice(game.costPerHour)}/h` : 'Menos de 1 h jogada'}
            </CostPerHour>
          )}
          <HistoricalLow price={game.price} steamLowest={game.steamLowest} />
        </PriceBlock>
      )}
    />
  )
}

export const GameCardSkeleton = GameRowSkeleton

export default GameCard
