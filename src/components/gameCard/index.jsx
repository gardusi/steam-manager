import { useState } from 'react'
import {
  Card, ImageContainer, Image, ImageFallback, ImageOverlay, PlayButton,
  GameInfo, Title, TitleLink, Playtime, PriceBlock, Price, Lowest, LowestBadge,
  SkeletonCard, SkeletonImage, SkeletonLine
} from './style'
import { formatHours, formatPrice } from '../../utils/format'

const playtimeLabel = (hours) => hours < 0.01 ? 'Nunca jogado' : `${formatHours(hours)} de jogo`

const GameCard = ({ game }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const atHistoricalLow = game.price > 0 && game.lowest > 0 && game.price <= game.lowest

  return (
    <Card>
      <ImageContainer>
        {imageFailed
          ? <ImageFallback aria-hidden='true'>{game.name}</ImageFallback>
          : (
              <Image
                src={game.logoUrl}
                alt=''
                width={460}
                height={215}
                loading='lazy'
                decoding='async'
                onError={() => setImageFailed(true)}
              />
            )}
        <ImageOverlay>
          <PlayButton href={`steam://run/${game.appId}`} aria-label={`Jogar ${game.name}`}>
            ▶ Jogar
          </PlayButton>
        </ImageOverlay>
      </ImageContainer>
      <GameInfo>
        <Title>
          <TitleLink href={game.link} target='_blank' rel='noopener noreferrer'>
            {game.name}
          </TitleLink>
        </Title>
        <Playtime>{playtimeLabel(game.playtime)}</Playtime>
      </GameInfo>
      {game.price > 0 && (
        <PriceBlock>
          <Price>{formatPrice(game.price)}</Price>
          {atHistoricalLow
            ? <LowestBadge>Menor preço histórico</LowestBadge>
            : game.lowest > 0 && <Lowest>Menor: {formatPrice(game.lowest)}</Lowest>}
        </PriceBlock>
      )}
    </Card>
  )
}

export const GameCardSkeleton = () => (
  <SkeletonCard aria-hidden='true'>
    <SkeletonImage />
    <GameInfo>
      <SkeletonLine $width='45%' />
      <SkeletonLine $width='25%' />
    </GameInfo>
  </SkeletonCard>
)

export default GameCard
