import styled from 'styled-components'
import { visuallyHidden } from './mixins'
import { colors, layout, radius, space } from './tokens'

export const Page = styled.main`
  max-width: ${layout.maxContentWidth};
  margin: 0 auto;
  padding: ${space(6)} ${space(4)} ${space(12)};
`
export const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 300;
  color: ${colors.textStrong};
  margin-bottom: ${space(5)};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`
export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.text};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: ${space(3)};
`
export const Panel = styled.section`
  background: ${colors.surface};
  border-radius: ${radius};
  padding: ${space(5)};
`
export const Label = styled.label`
  font-size: 14px;
  color: ${colors.textMuted};
`
export const Button = styled.button`
  font: inherit;
  font-size: 14px;
  color: ${colors.textStrong};
  background: ${colors.surfaceRaised};
  border: none;
  border-radius: ${radius};
  padding: ${space(2)} ${space(4)};
  cursor: pointer;
  transition: background 150ms ease;

  &:hover {
    background: ${colors.brand};
    color: ${colors.backgroundDeep};
  }
`
export const VisuallyHidden = styled.span`
  ${visuallyHidden}
`
