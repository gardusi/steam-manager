import React, { PureComponent } from 'react'
import { SteamColors } from '../../globalStyles'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  flex-direction: row;
  background: #1b2838;
  background-image:${SteamColors.gradientLight};
`

const GameInfo = styled.div`
  padding: 14px;
`

const Image = styled.img`
  object-fit: contain;
  max-width: 200px;
  width: 100%;
  height: 100%;
  background: white;
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

export default class GameCard extends PureComponent {
  render () {
    const { game } = this.props
    return (
      <Card>
        <Image src={game.logoUrl} alt={game.name} />
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
