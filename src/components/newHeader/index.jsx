import { tab, useTabSelector } from './hooks'
import { Container, Tab, Label } from './style'
import { RouterLink } from '../../globalStyles'

const HeaderView = () => {
  const [dashColor, statsColor] = useTabSelector()
  return (
    <Container>
      <Tab style={{ borderColor: dashColor }}>
        <RouterLink to={tab.dashboard}>
          <Label style={{ color: dashColor }}>
            Meus Jogos
          </Label>
        </RouterLink>
      </Tab>
      <Tab style={{ borderColor: statsColor }}>
        <RouterLink to={tab.statistics}>
          <Label style={{ color: statsColor }}>
            Estastísticas
          </Label>
        </RouterLink>
      </Tab>
    </Container>
  )
}
export default HeaderView
