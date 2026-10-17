import styled from 'styled-components'
import { SteamColors, VisuallyHidden, space } from '../../globalStyles'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${space(3)};
`
export const Insights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${space(1)} ${space(6)};
`
export const Insight = styled.p`
  font-size: 13px;
  color: ${SteamColors.textMuted};
`
export const InsightValue = styled.strong`
  font-weight: 600;
  color: ${SteamColors.textBright};
`
export const ChartArea = styled.div`
  position: relative;
  width: 100%;
  border-radius: 2px;
  touch-action: pan-y;
  cursor: crosshair;
`
export const Tooltip = styled.div`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  padding: ${space(1.5)} ${space(2.5)};
  border-radius: 3px;
  background: ${SteamColors.primaryDark};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  white-space: nowrap;
  text-align: center;
`
export const TooltipValue = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${SteamColors.textBright};
`
export const TooltipMeta = styled.p`
  font-size: 11px;
  color: ${SteamColors.textMuted};
`
export const LiveRegion = styled(VisuallyHidden)``

export const TableToggle = styled.details`
  font-size: 13px;

  summary {
    cursor: pointer;
    color: ${SteamColors.secondary};
    width: fit-content;
  }
`
export const Table = styled.table`
  width: 100%;
  max-width: 420px;
  margin-top: ${space(2)};
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;

  th, td {
    padding: ${space(1)} ${space(2)};
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  th {
    font-weight: 600;
    color: ${SteamColors.textMuted};
  }
  td {
    color: ${SteamColors.accent};
  }
`
