import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Label, Value } from '../../globalStyles'

const Container = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: row;
`
const Row = props => (
  <Container>
    <Label>{props.label}&nbsp;</Label>
    <Value>{props.value}</Value>
  </Container>
)
Row.defaultProps = { label: '', value: '' }
Row.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
}
export default Row
