import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Row from './row'
import { SteamColors } from '../../globalStyles'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${SteamColors.primaryDark};
  padding: 22px;
`
const Column = styled.div``

const Header = ({
  hoursPlayed,
  mostPlayed,
  numberOfGames,
  time100plus,
  time100to10,
  time10to1,
  time1minus,
  timeNeverPlayed,
  percentualPlayed
}) => (
  <Container>
    <Column>
      <Row label='Tempo de Jogo:' value={`${hoursPlayed.toFixed(0)} horas`} />
      {/*
        VALUE: accountValue.toFixed(2).replace('.', ',')
        <Row label='Valor da Conta:' value={`R$ ${accountValue}`} />
        <Row label='Reais / Horas:' value={`R$ ${valuePerHour}/h`} />
      */}
      <Row label='Percentual de Jogados:' value={`${(100 * percentualPlayed).toFixed(0)}%`} />
      <Row label='Total de Jogos:' value={numberOfGames} />
    </Column>
    <Column>
      <Row label='Mais de 100 horas:' value={time100plus} />
      <Row label='100 a 10 horas:' value={time100to10} />
      <Row label='10 a 1 horas:' value={time10to1} />
    </Column>
    <Column>
      <Row label='Menos de 1 hora:' value={time1minus} />
      <Row label='Nunca Jogados:' value={timeNeverPlayed} />
    </Column>
    <Column>
      <Row label='Mais Jogado:' value={`${mostPlayed.name} (${mostPlayed.playtime.toFixed(1)} horas)`} />
      <Row label='Powered by:' value={'IsThereAnyDeal.com'} />
    </Column>
  </Container>
)
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
