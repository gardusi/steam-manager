import { Bar, Inner, Brand, Logo, BrandName, Nav, NavItem } from './style'
import logo from '../../assets/logo.png'

const NavBar = () => (
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
    </Inner>
  </Bar>
)
export default NavBar
