import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  flex-direction: row;
  background: #1b2838;

`

const GameInfo = styled.div`
  padding-left: 15px;
`

const Image = styled.img`

`

const Title = styled.h3`
  color: white;
`

const Hours = styled.p`
  color: white;
`

export default class GameCard extends PureComponent {
  render () {
    const { game } = this.props
    const playtime = (game.playtime / 60).toFixed(1)
    return (
      <Card>
        <Image src={game.logoUrl} />
        <GameInfo>
          <Title>{game.name}</Title>
          <Hours>{playtime} Horas de jogo</Hours>
        </GameInfo>
      </Card>
    )
  }
}
