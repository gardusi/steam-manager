import styled from 'styled-components'
import { Label, Select, SteamColors } from '../../globalStyles'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  background: ${SteamColors.primaryDark};
  padding: 22px;
`
const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const Input = styled.input`
  height: 30px;
  font-size: 14px;
`
const selectStyles = {
  control: (base) => ({
    ...base,
    minHeight: 30,
    background: SteamColors.primary,
    borderColor: SteamColors.primaryLight,
    boxShadow: 'none'
  }),
  singleValue: (base) => ({ ...base, color: SteamColors.accent }),
  menu: (base) => ({ ...base, background: SteamColors.primary }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    background: isFocused || isSelected ? SteamColors.primaryLight : 'transparent',
    color: isSelected ? SteamColors.secondary : SteamColors.accent
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, padding: 4 })
}

const Search = ({
  onQuery = () => console.warn('onQuery function was not set for Search'),
  sortOptions = [],
  sortOption,
  onSort = () => console.warn('onSort function was not set for Search')
}) => (
  <Container>
    <Group>
      <Label>Buscar:</Label>
      <Input
        type='text'
        placeholder='Nome do Jogo'
        onChange={event => onQuery(event.target.value)}
      />
    </Group>
    <Group>
      <Label>Ordenar por:</Label>
      <Select
        options={sortOptions}
        value={sortOption}
        onChange={onSort}
        isSearchable={false}
        styles={selectStyles}
      />
    </Group>
  </Container>
)
export default Search
