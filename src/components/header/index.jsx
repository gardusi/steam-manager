import styled from 'styled-components'
import Row from './row'
import { SteamColors } from '../../globalStyles'
import { formatPrice } from '../../utils/format'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${SteamColors.primaryDark};
  padding: 22px;
`
const Column = styled.div``

const Header = ({
  hoursPlayed = 0,
  mostPlayed = { name: 'N/A', playtime: 0 },
  numberOfGames = 0,
  time100plus = 0,
  time100to10 = 0,
  time10to1 = 0,
  time1minus = 0,
  timeNeverPlayed = 0,
  percentualPlayed = 0,
  accountValue,
  valuePerHour
}) => (
  <Container>
    <Column>
      <Row label='Tempo de Jogo:' value={`${hoursPlayed.toFixed(0)} horas`} />
      {accountValue != null && (
        <>
          <Row label='Valor da Conta:' value={formatPrice(accountValue)} />
          <Row label='Reais / Hora:' value={`${formatPrice(valuePerHour)}/h`} />
        </>
      )}
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
      <Row label='Powered by:' value='IsThereAnyDeal.com' />
    </Column>
  </Container>
)
export default Header
