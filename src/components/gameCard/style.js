import { SteamColors } from '../../globalStyles'
import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  background: #1b2838;
  background-image: ${SteamColors.gradientLight};
`
export const GameInfo = styled.div`
  padding: 14px;
`
export const ImageContainer = styled.div`
  position: relative;
`
export const Image = styled.img`
  display: block;
  object-fit: contain;
  width: 200px;
  height: 100%;
`
export const ImageOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: ${SteamColors.gradientOverlay};
  visibility: hidden;
  ${ImageContainer}:hover & {
    visibility: visible;
  };
`
export const Title = styled.h3`
  font-size: 16px;
  color: ${SteamColors.secondary};
  padding-bottom: 5px;
`
export const Hours = styled.p`
  font-size: 15px;
  color: ${SteamColors.accent};
`
export const Link = styled.a`
  text-decoration: none;
`
export const PlayButton = styled.div`
  padding: 4px 16px 4px 16px;
  font-size: 16px;
  background-image: ${SteamColors.gradientSecondary};
  color: ${SteamColors.accent};
`
