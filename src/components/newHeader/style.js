import styled from 'styled-components'
import { Button, SteamColors } from '../../globalStyles'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: ${SteamColors.gradientLight};
  padding: 20px;
`
export const Tab = styled(Button)`
  border-style: solid;
  padding: 15px;
  margin-left: 30px;
  margin-right: 30px;
  border-width: 0px 0px 3px;
`
export const Label = styled.p`
  font-size: 22px;
  color: ${SteamColors.accent};
`
