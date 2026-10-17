import styled from 'styled-components'
import { colors, space, media } from '../../styles'
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

  /* Fade the right edge on narrow screens to hint that the chips scroll */
  ${media.tablet} {
    padding-right: ${space(8)};
    mask-image: linear-gradient(to right, black calc(100% - ${space(8)}), transparent);
  }
`
const Chip = styled.button`
  flex: none;
  display: flex;
  align-items: center;
  gap: ${space(1.5)};
  height: 28px;
  padding: 0 ${space(3)};
  border: 1px solid ${({ $active }) => $active ? colors.brand : colors.border};
  border-radius: 14px;
  font: inherit;
  font-size: 12px;
  color: ${({ $active }) => $active ? colors.backgroundDeep : colors.text};
  background: ${({ $active }) => $active ? colors.brand : 'transparent'};
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease, color 150ms ease;

  &:hover {
    border-color: ${colors.brand};
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
