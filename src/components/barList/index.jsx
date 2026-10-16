import styled from 'styled-components'
import { SteamColors, space } from '../../globalStyles'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${space(1)};
`
const Row = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  align-items: center;
  gap: ${space(3)};
  padding: ${space(1.5)} ${space(2)};
  border-radius: 2px;
  cursor: default;

  &:hover, &:focus-visible {
    background: rgba(255, 255, 255, 0.04);
  }
`
const RowLabel = styled.span`
  font-size: 13px;
  color: ${SteamColors.accent};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const BarArea = styled.span`
  display: flex;
  align-items: center;
  gap: ${space(2)};
`
// Grows from the left baseline: square at the start, 4px rounded data-end
const Bar = styled.span`
  flex: none;
  height: 16px;
  min-width: 2px;
  border-radius: 0 4px 4px 0;
  background: ${SteamColors.chart};
`
const BarValue = styled.span`
  font-size: 13px;
  color: ${SteamColors.textBright};
  white-space: nowrap;
`
const Tooltip = styled.span`
  position: absolute;
  bottom: calc(100% - 2px);
  right: ${space(2)};
  z-index: 2;
  padding: ${space(1)} ${space(2)};
  border-radius: 3px;
  font-size: 12px;
  white-space: nowrap;
  color: ${SteamColors.textBright};
  background: ${SteamColors.primaryDark};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  opacity: 0;
  transition: opacity 100ms ease;

  ${Row}:hover &, ${Row}:focus-visible & {
    opacity: 1;
  }
`

// Single-series horizontal bar chart: [{ key, label, value, valueLabel, tooltip }]
const BarList = ({ items, label }) => {
  const max = Math.max(...items.map(item => item.value), 0)
  // Leaves room for the value label at the bar's tip
  const widthOf = (value) => max > 0 ? `${(value / max) * 75}%` : '0%'

  return (
    <List aria-label={label}>
      {items.map(item => (
        <Row key={item.key} tabIndex={0} aria-label={`${item.label}: ${item.tooltip ?? item.valueLabel}`}>
          <RowLabel title={item.label}>{item.label}</RowLabel>
          <BarArea aria-hidden='true'>
            <Bar style={{ width: widthOf(item.value) }} />
            <BarValue>{item.valueLabel}</BarValue>
          </BarArea>
          {item.tooltip && <Tooltip aria-hidden='true'>{item.tooltip}</Tooltip>}
        </Row>
      ))}
    </List>
  )
}
export default BarList
