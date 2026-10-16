import styled from 'styled-components'
import { SteamColors, radius, skeleton, space } from '../../globalStyles'

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(1)};
  padding: ${space(4)} ${space(5)};
  background: ${SteamColors.surface};
  border-radius: ${radius};
`
const TileLabel = styled.p`
  font-size: 13px;
  color: ${SteamColors.textMuted};
`
const Value = styled.p`
  font-size: 26px;
  font-weight: 600;
  line-height: 1.2;
  color: ${SteamColors.textBright};
`
const Hint = styled.p`
  font-size: 12px;
  color: ${SteamColors.textMuted};
`
const SkeletonValue = styled.div`
  width: 60%;
  height: 31px;
  border-radius: 2px;
  ${skeleton}
`

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: ${space(3)};
`

const StatTile = ({ label, value, hint, loading }) => (
  <Tile>
    <TileLabel>{label}</TileLabel>
    {loading ? <SkeletonValue /> : <Value>{value}</Value>}
    {hint && !loading && <Hint>{hint}</Hint>}
  </Tile>
)
export default StatTile
