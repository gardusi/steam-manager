import React, { PureComponent } from 'react'
import styled from 'styled-components'

const DesktopCard = styled.div`
  background-color: white;
  height: 330px;
  width: calc(100% - 40px);
  margin-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 5px 5px 10px grey;
`
DesktopCard.displayName = 'DesktopCard'

const MobileCard = styled.div`
  background-color: white;
  min-height: 330px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 2px 0 0;
  border-color: rgba(0,0,0,0.2);
`
MobileCard.displayName = 'MobileCard'

const Title = styled.p`
  color: black;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`

const Subtitle = styled.p`
  color: darkgray;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 20px;
  font-weight: light;
  text-align: center;
`

export default class Card extends PureComponent {
  render () {
    const {
      viewWidth,
      isActive,
      title,
      subtitle,
      children
    } = this.props
    if (viewWidth >= 500) {
      return (
        <DesktopCard style={{ opacity: isActive ? 1.0 : 0.5 }}>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          {children}
        </DesktopCard>
      )
    } else {
      return (
        <MobileCard style={{ opacity: isActive ? 1.0 : 0.2 }}>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          {children}
        </MobileCard>
      )
    }
  }
}
