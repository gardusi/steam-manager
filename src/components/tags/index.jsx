import styled from 'styled-components'
import { SteamColors, space } from '../../globalStyles'

export const Tag = styled.span`
  display: inline-block;
  margin-right: ${space(2)};
  padding: 1px ${space(1.5)};
  border-radius: 2px;
  font-size: 11px;
  color: ${SteamColors.accent};
  background: ${SteamColors.surfaceHover};
`

const year = (timestamp) => new Date(timestamp).getFullYear()

// "Lança em 2027" / "Em breve" and "Acesso antecipado" for a game ({ comingSoon, releaseDate, earlyAccess })
export const ReleaseTags = ({ game }) => (
  <>
    {game.comingSoon && <Tag>{game.releaseDate ? `Lança em ${year(game.releaseDate)}` : 'Em breve'}</Tag>}
    {game.earlyAccess && <Tag>Acesso antecipado</Tag>}
  </>
)
