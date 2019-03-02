import React from 'react'
import { tab, useTabSelector } from './hooks'
import { Container, Tab, Label } from './style'

const HeaderView = (props) => {
  console.log(props)
  const [dashColor, statsColor, setTab] = useTabSelector(props.selectedTab)
  return (
    <Container>
      <Tab style={{ borderColor: dashColor }} onClick={() => setTab(tab.dashboard)}>
        <Label style={{ color: dashColor }}>
          Meus Jogos
        </Label>
      </Tab>
      <Tab style={{ borderColor: statsColor }} onClick={() => setTab(tab.statistics)}>
        <Label style={{ color: statsColor }}>
          Estastísticas
        </Label>
      </Tab>
    </Container>
  )
}
HeaderView.defaultProps = {
  selectedTab: tab.dashboard
}
export default HeaderView
