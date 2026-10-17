import styled from 'styled-components'
import { Link } from 'react-router'
import { SteamColors, maxContentWidth, radius, skeleton, space } from '../../globalStyles'

export const Hero = styled.header`
  position: relative;
  min-height: 300px;
  display: flex;
  align-items: flex-end;
  background-color: ${SteamColors.primaryDark};
  background-image:
    linear-gradient(to bottom, rgba(27, 40, 56, 0.1) 0%, rgba(27, 40, 56, 0.6) 55%, ${SteamColors.primary} 100%),
    ${({ $image }) => $image ? `url("${$image}")` : 'none'};
  background-size: cover;
  background-position: center top;

  @media (max-width: 560px) {
    min-height: 220px;
  }
`
export const HeroSkeleton = styled.div`
  height: 300px;
  ${skeleton}
`
export const HeroInner = styled.div`
  width: 100%;
  max-width: ${maxContentWidth};
  margin: 0 auto;
  padding: ${space(6)} ${space(4)} ${space(5)};
`
export const BackLink = styled(Link)`
  position: absolute;
  top: ${space(4)};
  left: max(${space(4)}, calc((100% - ${maxContentWidth}) / 2 + ${space(4)}));
  padding: ${space(1)} ${space(3)};
  border-radius: ${radius};
  font-size: 13px;
  color: ${SteamColors.textBright};
  text-decoration: none;
  background: rgba(23, 26, 33, 0.75);

  &:hover {
    background: ${SteamColors.primaryDark};
  }
`
export const GameTitle = styled.h1`
  font-size: clamp(26px, 5vw, 40px);
  font-weight: 600;
  line-height: 1.15;
  color: ${SteamColors.textBright};
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
`
export const Tags = styled.div`
  margin-top: ${space(2)};
`
export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  grid-template-areas: 'main aside';
  gap: ${space(4)};
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'aside' 'main';
  }
`
export const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  gap: ${space(4)};
  min-width: 0;
`
export const Aside = styled.aside`
  grid-area: aside;
  display: flex;
  flex-direction: column;
  gap: ${space(4)};
  padding: ${space(5)};
  border-radius: ${radius};
  background: ${SteamColors.surface};
`
export const PriceArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${space(1.5)};
`
export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(2)};
`
export const ActionLink = styled.a`
  display: block;
  padding: ${space(2.5)} ${space(4)};
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: ${SteamColors.textBright};
  background: ${({ $primary }) => $primary ? SteamColors.play : SteamColors.surfaceHover};

  &:hover {
    background: ${({ $primary }) => $primary ? SteamColors.playHover : SteamColors.secondary};
    color: ${({ $primary }) => $primary ? SteamColors.textBright : SteamColors.primaryDark};
  }
`
export const Facts = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${space(1.5)} ${space(3)};
  margin: 0;
  font-size: 13px;

  dt {
    color: ${SteamColors.textMuted};
  }
  dd {
    margin: 0;
    color: ${SteamColors.accent};
  }
`
export const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${SteamColors.accent};
`
export const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${space(3)};
`
export const SectionNote = styled.p`
  font-size: 12px;
  color: ${SteamColors.textMuted};
`
export const PanelBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(4)};
`
export const SkeletonBlock = styled.div`
  height: ${({ $height }) => $height}px;
  border-radius: 2px;
  ${skeleton}
`
