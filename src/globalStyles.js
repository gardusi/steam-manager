import styled, { css, keyframes } from 'styled-components'
import Selector from 'react-select'

export const SteamColors = {
  // Surfaces, darkest to lightest
  primaryDark: '#171a21',
  primary: '#1b2838',
  surface: 'rgba(0, 0, 0, 0.2)',
  surfaceHover: '#2a475e',
  cardHover: '#1e3044',
  border: '#2a475e',

  // Text
  textBright: '#ffffff',
  accent: '#c7d5e0',
  textMuted: '#8f98a0',

  // Brand
  secondary: '#66c0f4',
  chart: '#3d9be9',
  play: 'linear-gradient(to right, #4c7a17 5%, #426b13 95%)',
  playHover: 'linear-gradient(to right, #4f8016 5%, #477214 95%)',
  discount: '#beee11',
  discountBg: '#476520',
  danger: '#f07070',

  gradientLight: 'linear-gradient(#1b2838, #2a475e)'
}

export const space = (n) => `${n * 4}px`
export const radius = '4px'
export const maxContentWidth = '1100px'

export const reducedMotion = (rules) => css`
  @media (prefers-reduced-motion: reduce) {
    ${rules}
  }
`

const shimmer = keyframes`
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
`
export const skeleton = css`
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
  ${reducedMotion('animation: none;')}
`

export const Page = styled.main`
  max-width: ${maxContentWidth};
  margin: 0 auto;
  padding: ${space(6)} ${space(4)} ${space(12)};
`
export const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 300;
  color: ${SteamColors.textBright};
  margin-bottom: ${space(5)};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`
export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${SteamColors.accent};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: ${space(3)};
`
export const Panel = styled.section`
  background: ${SteamColors.surface};
  border-radius: ${radius};
  padding: ${space(5)};
`
export const Label = styled.label`
  font-size: 14px;
  color: ${SteamColors.textMuted};
`
export const Button = styled.button`
  font: inherit;
  font-size: 14px;
  color: ${SteamColors.textBright};
  background: ${SteamColors.surfaceHover};
  border: none;
  border-radius: ${radius};
  padding: ${space(2)} ${space(4)};
  cursor: pointer;
  transition: background 150ms ease;

  &:hover {
    background: ${SteamColors.secondary};
    color: ${SteamColors.primaryDark};
  }
`
export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`
export const Select = styled(Selector)`
  width: 200px;
  font-size: 14px;
`
