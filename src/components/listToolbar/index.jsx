import { useId } from 'react'
import styled from 'styled-components'
import Selector from 'react-select'
import { Label, colors, VisuallyHidden, radius, space, media, layout } from '../../styles'
import { formatNumber, pluralize } from '../../utils/format'

const Select = styled(Selector)`
  width: 220px;
  font-size: 14px;
`

const Container = styled.div`
  position: sticky;
  top: ${layout.navHeight};
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${space(3)} ${space(6)};
  margin: 0 -${space(4)} ${space(4)};
  padding: ${space(3)} ${space(4)};
  background: ${colors.toolbar};
  backdrop-filter: blur(6px);
  border-radius: ${radius};
`
const SearchField = styled.div`
  position: relative;
  flex: 1 1 260px;
  max-width: 360px;
`
const SearchIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: ${space(3)};
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  fill: ${colors.textMuted};
  pointer-events: none;
`
const Input = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 ${space(3)} 0 ${space(9)};
  font-size: 14px;
  color: ${colors.textStrong};
  background: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: ${radius};
  transition: border-color 150ms ease;

  &::placeholder {
    color: ${colors.textMuted};
  }
  &:hover {
    border-color: ${colors.textMuted};
  }
  &:focus {
    border-color: ${colors.brand};
    outline: none;
  }
`
const Count = styled.p`
  font-size: 13px;
  color: ${colors.textMuted};
  white-space: nowrap;
`
const SortGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${space(2)};
  margin-left: auto;

  ${media.phone} {
    width: 100%;

    & > div {
      flex: 1;
    }
  }
`
const selectStyles = {
  control: (base, { isFocused }) => ({
    ...base,
    minHeight: 36,
    cursor: 'pointer',
    background: colors.background,
    borderColor: isFocused ? colors.brand : colors.border,
    boxShadow: 'none',
    '&:hover': { borderColor: isFocused ? colors.brand : colors.textMuted }
  }),
  singleValue: (base) => ({ ...base, color: colors.textStrong }),
  menu: (base) => ({ ...base, background: colors.background, border: `1px solid ${colors.border}`, zIndex: 20 }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    cursor: 'pointer',
    background: isFocused ? colors.surfaceRaised : 'transparent',
    color: isSelected ? colors.brand : colors.text,
    fontWeight: isSelected ? 600 : 400
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, padding: 6, color: colors.textMuted })
}

// Sticky bar above a game list: search, result count, sort and (as children) filters
const ListToolbar = ({ query, onQuery, placeholder, resultCount, totalCount, sortOptions, sortOption, onSort, children }) => {
  const searchId = useId()
  const sortId = useId()
  return (
    <Container>
      <SearchField>
        <VisuallyHidden as='label' htmlFor={searchId}>{placeholder}</VisuallyHidden>
        <SearchIcon viewBox='0 0 24 24' aria-hidden='true'>
          <path d='M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
        </SearchIcon>
        <Input
          id={searchId}
          type='search'
          placeholder={placeholder}
          autoComplete='off'
          value={query}
          onChange={event => onQuery(event.target.value)}
        />
      </SearchField>
      {totalCount > 0 && (
        <Count aria-live='polite'>
          {resultCount === totalCount
            ? pluralize(totalCount, 'jogo', 'jogos')
            : `${formatNumber(resultCount)} de ${pluralize(totalCount, 'jogo', 'jogos')}`}
        </Count>
      )}
      <SortGroup>
        <Label htmlFor={sortId}>Ordenar por</Label>
        <Select
          inputId={sortId}
          options={sortOptions}
          value={sortOption}
          onChange={onSort}
          isSearchable={false}
          styles={selectStyles}
        />
      </SortGroup>
      {children}
    </Container>
  )
}
export default ListToolbar
