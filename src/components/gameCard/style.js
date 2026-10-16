import styled from 'styled-components'
import { SteamColors, radius, reducedMotion, skeleton, space } from '../../globalStyles'

const imageWidth = 230
const mobileImageWidth = 120

export const Card = styled.article`
  display: grid;
  grid-template-columns: ${imageWidth}px 1fr auto;
  grid-template-areas: 'image info price';
  align-items: center;
  gap: ${space(4)};
  padding-right: ${space(4)};
  background: ${SteamColors.surface};
  border-radius: ${radius};
  overflow: hidden;
  transition: background 150ms ease;

  &:hover, &:focus-within {
    background: ${SteamColors.cardHover};
  }

  @media (max-width: 560px) {
    grid-template-columns: ${mobileImageWidth}px 1fr;
    grid-template-areas: 'image info' 'image price';
    row-gap: ${space(1)};
    padding: 0 ${space(3)} 0 0;
  }
`
export const ImageContainer = styled.div`
  grid-area: image;
  position: relative;
  align-self: stretch;
  aspect-ratio: 460 / 215;
  background: ${SteamColors.primaryDark};

  @media (max-width: 560px) {
    align-self: center;
    width: 100%;
  }
`
export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
export const ImageFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: ${space(2)};
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: ${SteamColors.textMuted};
  background: ${SteamColors.gradientLight};
`
export const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  opacity: 0;
  transition: opacity 150ms ease;
  ${reducedMotion('transition: none;')}

  ${Card}:hover &, ${Card}:focus-within &, &:focus-within {
    opacity: 1;
  }
  @media (hover: none) {
    opacity: 1;
    background: none;
    align-items: flex-end;
    justify-content: flex-end;
    padding: ${space(1)};
  }
`
export const PlayButton = styled.a`
  padding: ${space(1.5)} ${space(4)};
  border-radius: 2px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${SteamColors.textBright};
  background: ${SteamColors.play};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);

  &:hover {
    background: ${SteamColors.playHover};
  }
  @media (hover: none) {
    padding: ${space(1)} ${space(2)};
    font-size: 11px;
  }
`
export const GameInfo = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  gap: ${space(1)};
  min-width: 0;
  padding: ${space(3)} 0;

  @media (max-width: 560px) {
    align-self: end;
    padding: ${space(2)} 0 0;
  }
`
export const Title = styled.h3`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.3;
`
export const TitleLink = styled.a`
  color: ${SteamColors.textBright};
  text-decoration: none;

  &:hover {
    color: ${SteamColors.secondary};
    text-decoration: underline;
  }
`
export const Playtime = styled.p`
  font-size: 13px;
  color: ${SteamColors.textMuted};
`
export const PriceBlock = styled.div`
  grid-area: price;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${space(1)};
  white-space: nowrap;

  @media (max-width: 560px) {
    align-self: start;
    flex-direction: row;
    align-items: baseline;
    gap: ${space(2)};
    padding-bottom: ${space(2)};
  }
`
export const Price = styled.p`
  font-size: 15px;
  color: ${SteamColors.accent};
  font-variant-numeric: tabular-nums;
`
export const Lowest = styled.p`
  font-size: 12px;
  color: ${SteamColors.textMuted};
  font-variant-numeric: tabular-nums;
`
export const CostPerHour = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${SteamColors.secondary};
  font-variant-numeric: tabular-nums;
`
export const LowestBadge = styled.p`
  font-size: 11px;
  font-weight: 600;
  padding: 2px ${space(1.5)};
  border-radius: 2px;
  color: ${SteamColors.discount};
  background: ${SteamColors.discountBg};
`
export const SkeletonCard = styled.div`
  display: grid;
  grid-template-columns: ${imageWidth}px 1fr;
  grid-template-areas: 'image info';
  align-items: center;
  gap: ${space(4)};
  background: ${SteamColors.surface};
  border-radius: ${radius};
  overflow: hidden;

  @media (max-width: 560px) {
    grid-template-columns: ${mobileImageWidth}px 1fr;
  }
`
export const SkeletonImage = styled.div`
  grid-area: image;
  aspect-ratio: 460 / 215;
  ${skeleton}
`
export const SkeletonLine = styled.div`
  width: ${({ $width }) => $width};
  height: 14px;
  border-radius: 2px;
  ${skeleton}
`
