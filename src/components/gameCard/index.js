import React, { PureComponent } from 'react'
import { SteamColors } from '../../globalStyles'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  flex-direction: row;
  background: #1b2838;
  background-image: ${SteamColors.gradientLight};
`
const GameInfo = styled.div`
  padding: 14px;
`
const ImageContainer = styled.div`
  position: relative;
`
const Image = styled.img`
  display: block;
  object-fit: contain;
  width: 200px;
  height: 100%;
`
const ImageOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: ${SteamColors.gradientOverlay};
  visibility: hidden;
  ${ImageContainer}:hover & {
    visibility: visible;
  };
`
const Title = styled.h3`
  font-size: 16px;
  color: ${SteamColors.secondary};
  padding-bottom: 5px;
`
const Hours = styled.p`
  font-size: 15px;
  color: ${SteamColors.accent};
`
const Link = styled.a`
  text-decoration: none;
`
const PlayButton = styled.div`
  padding: 4px 16px 4px 16px;
  font-size: 16px;
  background-image: ${SteamColors.gradientSecondary};
  color: ${SteamColors.accent};
`

export default class GameCard extends PureComponent {
  render () {
    const { game } = this.props
    return (
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
  }
}
