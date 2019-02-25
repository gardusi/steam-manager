import React, { Text } from 'react'
import { SteamColors } from '../../globalStyles'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${SteamColors.primaryDark};
  padding: 22px;
`

const Column = styled.div`

`

const Row = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: row;
`

const Label = styled.p`
  font-size: 16px;
  color: ${SteamColors.accent};
`

const Value = styled.p`
  font-size: 16px;
  color: ${SteamColors.secondary};
`

const Header = props => {
  const {
    hoursPlayed,
    mostPlayed,
    numberOfGames,
    time100plus,
    time100to10,
    time10to1,
    time1minus,
    timeNeverPlayed,
    percentualPlayed
  } = props
  return (
    <Container>
      <Column>
        <Row>
          <Label>Tempo de Jogo:&nbsp;</Label>
          <Value>{hoursPlayed.toFixed(0)} horas</Value>
        </Row>
        {/*
          VALUE: accountValue.toFixed(2).replace('.', ',')
          <Row>
            <Label>Valor da Conta:&nbsp;</Label>
            <Value>R$ {accountValue}</Value>
          </Row>
          <Row>
            <Label>Reais / Horas:&nbsp;</Label>
            <Value>R$ {valuePerHour} / h</Value>
          </Row>
        */}
        <Row>
          <Label>Percentual de Jogados:&nbsp;</Label>
          <Value>{(100 * percentualPlayed).toFixed(0)}%</Value>
        </Row>
        <Row>
          <Label>Total de Jogos:&nbsp;</Label>
          <Value>{numberOfGames}</Value>
        </Row>
      </Column>
      <Column>
        <Row>
          <Label>Mais de 100 horas:&nbsp;</Label>
          <Value>{time100plus}</Value>
        </Row>
        <Row>
          <Label>100 a 10 horas:&nbsp;</Label>
          <Value>{time100to10}</Value>
        </Row>
        <Row>
          <Label>10 a 1 horas:&nbsp;</Label>
          <Value>{time10to1}</Value>
        </Row>
      </Column>
      <Column>
        <Row>
          <Label>Menos de 1 hora:&nbsp;</Label>
          <Value>{time1minus}</Value>
        </Row>
        <Row>
          <Label>Nunca Jogados:&nbsp;</Label>
          <Value>{timeNeverPlayed}</Value>
        </Row>
      </Column>
      <Column>
        <Row>
          <Label>Mais Jogado:&nbsp;</Label>
          <Value>{mostPlayed.name} ({mostPlayed.playtime.toFixed(1)} horas)</Value>
        </Row>
      </Column>
    </Container>
  )
}

Header.defaultProps = {
  mostPlayed: { name: 'N/A', playtime: 0 },
  hoursPlayed: 0,
  numberOfGames: 0,
  time100plus: 0,
  time100to10: 0,
  time10to1: 0,
  time1minus: 0,
  timeNeverPlayed: 0,
  percentualPlayed: 0
}

Header.propTypes = {
  mostPlayed: PropTypes.object.isRequired,
  hoursPlayed: PropTypes.number.isRequired,
  numberOfGames: PropTypes.number.isRequired,
  time100plus: PropTypes.number.isRequired,
  time100to10: PropTypes.number.isRequired,
  time10to1: PropTypes.number.isRequired,
  time1minus: PropTypes.number.isRequired,
  timeNeverPlayed: PropTypes.number.isRequired,
  percentualPlayed: PropTypes.number.isRequired
}

export default Header
