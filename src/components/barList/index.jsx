import styled from 'styled-components'
import { Link } from 'react-router'
import { SteamColors, space } from '../../globalStyles'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${space(1)};
`
const Item = styled.li`
  position: relative;
`
const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  align-items: center;
  gap: ${space(3)};
  padding: ${space(1.5)} ${space(2)};
  border-radius: 2px;
  cursor: default;
  color: inherit;
  text-decoration: none;

  &:hover, &:focus-visible {
    background: rgba(255, 255, 255, 0.04);
  }
  &[href] {
    cursor: pointer;
  }
  /* Linked rows: underline the label on hover */
  &[href]:hover > span:first-child {
    color: ${SteamColors.textBright};
    text-decoration: underline;
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

// Fits labels like "R$ 125,80/h" plus the gap after the bar
const valueLabelSpace = 96

// Single-series horizontal bar chart: [{ key, label, value, valueLabel, tooltip, href }]
// Rows with `href` become links.
const BarList = ({ items, label }) => {
  const max = Math.max(...items.map(item => item.value), 0)
  // The longest bar stops short of the edge, leaving room for its value label at the tip
  const widthOf = (value) => max > 0 ? `calc((100% - ${valueLabelSpace}px) * ${value / max})` : '0'

  return (
    <List aria-label={label}>
      {items.map(item => (
        <Item key={item.key}>
          <Row
            {...(item.href ? { as: Link, to: item.href } : { tabIndex: 0 })}
            aria-label={`${item.label}: ${item.tooltip ?? item.valueLabel}`}
          >
            <RowLabel title={item.label}>{item.label}</RowLabel>
            <BarArea aria-hidden='true'>
              <Bar style={{ width: widthOf(item.value) }} />
              <BarValue>{item.valueLabel}</BarValue>
            </BarArea>
            {item.tooltip && <Tooltip aria-hidden='true'>{item.tooltip}</Tooltip>}
          </Row>
        </Item>
      ))}
    </List>
  )
}
export default BarList
