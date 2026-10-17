import styled from 'styled-components'
import { colors, VisuallyHidden, space, shadows } from '../../styles'

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
  color: ${colors.textMuted};
`
export const InsightValue = styled.strong`
  font-weight: 600;
  color: ${colors.textStrong};
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
  background: ${colors.backgroundDeep};
  box-shadow: ${shadows.popover};
  pointer-events: none;
  white-space: nowrap;
  text-align: center;
`
export const TooltipValue = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.textStrong};
`
export const TooltipMeta = styled.p`
  font-size: 11px;
  color: ${colors.textMuted};
`
export const LiveRegion = styled(VisuallyHidden)``

export const TableToggle = styled.details`
  font-size: 13px;

  summary {
    cursor: pointer;
    color: ${colors.brand};
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
    border-bottom: 1px solid ${colors.chartGrid};
  }
  th {
    font-weight: 600;
    color: ${colors.textMuted};
  }
  td {
    color: ${colors.text};
  }
`
