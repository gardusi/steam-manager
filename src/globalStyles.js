import styled from 'styled-components'
import Selector from 'react-select'

export const SteamColors = {
  primaryDark: '#171a21',
  primary: '#1b2838',
  primaryLight: '#2a475e',
  secondary: '#66c0f4',
  accent: '#c7d5e0',
  gradientLight: 'linear-gradient(#1b2838, #2a475e)',
  gradientSecondary: 'linear-gradient(#66c0f4, #2a475e)',
  gradientOverlay: 'linear-gradient(rgba(0,0,0,0), #2a475e)'
}

export const Background = styled.div`
  background-color: ${SteamColors.primaryDark};
  width: 100%;
  height: 100%;
`
export const Label = styled.p`
  font-size: 16px;
  color: ${SteamColors.accent};
`
export const Value = styled.p`
  font-size: 16px;
  color: ${SteamColors.secondary};
`
export const Select = styled(Selector)`
  width: 50%;
  height: 30px;
  min-width: 110px;
`
