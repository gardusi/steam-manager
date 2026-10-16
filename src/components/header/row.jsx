import styled from 'styled-components'
import { Label, Value } from '../../globalStyles'

const Container = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: row;
`
const Row = ({ label = '', value = '' }) => (
  <Container>
    <Label>{label}&nbsp;</Label>
    <Value>{value}</Value>
  </Container>
)
export default Row
