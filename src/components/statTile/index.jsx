import styled from 'styled-components'
import { colors, radius, skeleton, space, media } from '../../styles'

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(1)};
  min-width: 0;
  padding: ${space(4)} ${space(5)};
  background: ${colors.surface};
  border-radius: ${radius};

  ${media.phone} {
    padding: ${space(3)} ${space(4)};
  }
`
const TileLabel = styled.p`
  font-size: 13px;
  color: ${colors.textMuted};
`
const Value = styled.p`
  font-size: 26px;

  ${media.phone} {
    font-size: 20px;
  }
  font-weight: 600;
  line-height: 1.2;
  color: ${colors.textStrong};
`
const Hint = styled.p`
  font-size: 12px;
  color: ${colors.textMuted};
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

  /* Two per row on phones so the tiles don't push the content off screen */
  ${media.phone} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${space(2)};
  }
`

const StatTile = ({ label, value, hint, loading }) => (
  <Tile>
    <TileLabel>{label}</TileLabel>
    {loading ? <SkeletonValue /> : <Value>{value}</Value>}
    {hint && !loading && <Hint>{hint}</Hint>}
  </Tile>
)
export default StatTile
