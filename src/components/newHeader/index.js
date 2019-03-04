import React from 'react'
import { tab, useTabSelector } from './hooks'
import { Container, Tab, Label } from './style'
import { RouterLink } from '../../globalStyles'

const HeaderView = (props) => {
  const [dashColor, statsColor, setTab] = useTabSelector(props.selectedTab)
  return (
    <Container>
      <Tab style={{ borderColor: dashColor }} onClick={() => setTab(tab.dashboard)}>
        <RouterLink to={tab.dashboard}>
          <Label style={{ color: dashColor }}>
            Meus Jogos
          </Label>
        </RouterLink>
      </Tab>
      <Tab style={{ borderColor: statsColor }} onClick={() => setTab(tab.statistics)}>
        <RouterLink to={tab.statistics}>
          <Label style={{ color: statsColor }}>
            Estastísticas
          </Label>
        </RouterLink>
      </Tab>
    </Container>
  )
}
HeaderView.defaultProps = {
  selectedTab: tab.dashboard
}
export default HeaderView
