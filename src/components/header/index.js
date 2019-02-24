import React, { PureComponent } from 'react'
import ManagerLogo from '../../assets/logo.png'
import styled from 'styled-components'

const Container = styled.div`
  background-color: darkblue;
  height: 200px;
  width: 100%;
  position: fixed;
  top: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 10px grey;
  z-index: 100;
`

const Title = styled.h1`
  color: white;
  font-weight: bold;
  text-align: center;
`

export default class Header extends PureComponent {
  render () {
    return (
      <Container>
        <img src={ManagerLogo} alt='Logo Steam' />
        <Title>STEAM MANAGER</Title>
      </Container>
    )
  }
}
