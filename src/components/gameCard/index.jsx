import { Card, GameInfo, Image, ImageContainer, ImageOverlay, Link, Title, Hours, PlayButton } from './style'

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
    </GameInfo>
  </Card>
)
export default GameCard
