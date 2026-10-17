import { useState } from 'react'
import { Link } from 'react-router'
import {
  Card, ImageContainer, Image, ImageFallback, ImageOverlay,
  GameInfo, Title, TitleLink, Subtitle,
  SkeletonCard, SkeletonImage, SkeletonLine
} from './style'

// Shared layout for a game in a list: header image (with an optional hover overlay),
// title linking to the game's page, a subtitle line and a right-aligned aside (prices).
const GameRow = ({ game, overlay, subtitle, aside }) => {
  const [imageFailed, setImageFailed] = useState(false)

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
        {overlay && <ImageOverlay>{overlay}</ImageOverlay>}
      </ImageContainer>
      <GameInfo>
        <Title>
          <TitleLink as={Link} to={`/game/${game.appId}`}>
            {game.name}
          </TitleLink>
        </Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </GameInfo>
      {aside}
    </Card>
  )
}

export const GameRowSkeleton = () => (
  <SkeletonCard aria-hidden='true'>
    <SkeletonImage />
    <GameInfo>
      <SkeletonLine $width='45%' />
      <SkeletonLine $width='25%' />
    </GameInfo>
  </SkeletonCard>
)

export default GameRow
