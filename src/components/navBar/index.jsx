import { Bar, Inner, Brand, Logo, BrandName, Nav, NavItem } from './style'
import SyncStatus from '../syncStatus'
import { useOwnedGames } from '../../state/ownedGames'
import logo from '../../assets/logo.png'

const NavBar = () => {
  const { updatedAt, refreshing, error, games, reload } = useOwnedGames()
  return (
    <Bar>
      <Inner>
        <Brand to='/dashboard'>
          <Logo src={logo} alt='' width={28} height={28} />
          <BrandName>Steam Manager</BrandName>
        </Brand>
        <Nav aria-label='Principal'>
          <NavItem to='/dashboard'>Meus jogos</NavItem>
          <NavItem to='/statistics'>Estatísticas</NavItem>
        </Nav>
        <SyncStatus
          updatedAt={updatedAt}
          refreshing={refreshing}
          failed={Boolean(error) && games.length > 0}
          onRefresh={reload}
        />
      </Inner>
    </Bar>
  )
}
export default NavBar
