import { Card, GameInfo, Image, ImageContainer, ImageOverlay, Link, Title, Hours, Price, Lowest, PlayButton } from './style'
import { formatPrice } from '../../utils/format'

const GameCard = ({ game }) => (
  <Card>
    <ImageContainer>
      <Image src={game.logoUrl} alt={game.name} />
      <ImageOverlay>
        <Link href={`steam://run/${game.appId}`}>
          <PlayButton>▶ JOGAR</PlayButton>
        </Link>
      </ImageOverlay>
    </ImageContainer>
    <GameInfo>
      <Link href={game.link} target='_blank'>
        <Title>{game.name}</Title>
      </Link>
      <Hours>{game.playtime.toFixed(1)} Horas de jogo</Hours>
      {game.price > 0 && (
        <Price>
          {formatPrice(game.price)}
          {game.lowest > 0 && <Lowest> · menor histórico {formatPrice(game.lowest)}</Lowest>}
        </Price>
      )}
    </GameInfo>
  </Card>
)
export default GameCard
