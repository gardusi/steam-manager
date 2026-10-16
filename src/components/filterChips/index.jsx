import styled from 'styled-components'
import { SteamColors, space } from '../../globalStyles'
import { formatNumber } from '../../utils/format'

const Group = styled.div`
  display: flex;
  gap: ${space(2)};
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  /* Room for the focus outline inside the scroll container */
  padding: 2px;
  margin: -2px;
`
const Chip = styled.button`
  flex: none;
  display: flex;
  align-items: center;
  gap: ${space(1.5)};
  height: 28px;
  padding: 0 ${space(3)};
  border: 1px solid ${({ $active }) => $active ? SteamColors.secondary : SteamColors.border};
  border-radius: 14px;
  font: inherit;
  font-size: 12px;
  color: ${({ $active }) => $active ? SteamColors.primaryDark : SteamColors.accent};
  background: ${({ $active }) => $active ? SteamColors.secondary : 'transparent'};
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease, color 150ms ease;

  &:hover {
    border-color: ${SteamColors.secondary};
  }
`
const ChipCount = styled.span`
  font-weight: 600;
  opacity: 0.8;
`

// Single-choice filter: [{ key, label, count }]; `null` key means "all"
const FilterChips = ({ label, options, active, onChange }) => (
  <Group role='group' aria-label={label}>
    {options.map(option => {
      const isActive = option.key === active
      return (
        <Chip
          key={option.key ?? 'all'}
          type='button'
          $active={isActive}
          aria-pressed={isActive}
          onClick={() => onChange(option.key)}
        >
          {option.label}
          {option.count != null && <ChipCount>{formatNumber(option.count)}</ChipCount>}
        </Chip>
      )
    })}
  </Group>
)
export default FilterChips
