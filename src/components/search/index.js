import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Label, SteamColors } from '../../globalStyles'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${SteamColors.primaryDark};
  padding: 22px;
`
const Input = styled.input`
  height: 30px;
  font-size: 14px;
`
const Search = props => {
  return (
    <Container>
      <Label>Filtros de Busca: </Label>
      <Label>Ordenar por: </Label>
      <Input
        type='text'
        placeholder='Nome do Jogo'
        onChange={event => props.onQuery(event.target.value)} />
    </Container>
  )
}
Search.defaultProps = {
  onQuery: (query) => console.warn('onQuery function was not set for Search')
}
Search.propTypes = {
  onQuery: PropTypes.func.isRequired
}
export default Search
