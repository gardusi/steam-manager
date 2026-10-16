import styled from 'styled-components'
import { Link, NavLink } from 'react-router'
import { SteamColors, maxContentWidth, space } from '../../globalStyles'

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${SteamColors.primaryDark};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`
export const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: ${space(8)};
  max-width: ${maxContentWidth};
  height: 64px;
  margin: 0 auto;
  padding: 0 ${space(4)};

  @media (max-width: 560px) {
    gap: ${space(4)};
  }
`
export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${space(2)};
  text-decoration: none;
  color: ${SteamColors.textBright};
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

  @media (max-width: 560px) {
    display: none;
  }
`
export const Nav = styled.nav`
  display: flex;
  align-self: stretch;
  gap: ${space(6)};
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
  color: ${SteamColors.accent};
  transition: color 150ms ease, border-color 150ms ease;

  &:hover {
    color: ${SteamColors.textBright};
  }
  &.active {
    color: ${SteamColors.secondary};
    border-bottom-color: ${SteamColors.secondary};
  }
`
