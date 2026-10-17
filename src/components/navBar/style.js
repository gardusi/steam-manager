import styled from 'styled-components'
import { Link, NavLink } from 'react-router'
import { colors, space, media, layout, shadows, visuallyHidden } from '../../styles'

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${colors.backgroundDeep};
  box-shadow: ${shadows.bar};
`
export const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: ${space(8)};
  max-width: ${layout.maxContentWidth};
  height: ${layout.navHeight};
  margin: 0 auto;
  padding: 0 ${space(4)};

  ${media.phone} {
    gap: ${space(4)};
  }
`
export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${space(2)};
  text-decoration: none;
  color: ${colors.textStrong};
`
export const Logo = styled.img`
  filter: invert(1);
  opacity: 0.9;
`
export const BrandName = styled.span`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  ${media.phone} {
    display: none;
  }
`
export const Nav = styled.nav`
  display: flex;
  align-self: stretch;
  gap: ${space(6)};

  ${media.compactNav} {
    gap: ${space(4)};
  }
`
export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  border-bottom: 3px solid transparent;
  padding-top: 3px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${colors.text};
  transition: color 150ms ease, border-color 150ms ease;

  &:hover {
    color: ${colors.textStrong};
  }
  &.active {
    color: ${colors.brand};
    border-bottom-color: ${colors.brand};
  }
`
// The short label is only for screen width; the long one stays in the accessibility tree
export const LongLabel = styled.span`
  ${media.compactNav} {
    ${visuallyHidden}
  }
`
export const ShortLabel = styled.span`
  display: none;

  ${media.compactNav} {
    display: inline;
  }
`
