import styled from 'styled-components'
import Selector from 'react-select'

export const Background = styled.div`
  background-color: lightblue;
  width: 100%;
  height: 100%;
`
export const Select = styled(Selector)`
  width: 50%;
  height: 30px;
  min-width: 110px;
`
export const CardContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`
