import { Bar, Inner, Brand, Logo, BrandName, Nav, NavItem, LongLabel, ShortLabel } from './style'
import SyncStatus from '../syncStatus'
import { useSyncStatus } from '../../state/sync'
import logo from '../../assets/logo.png'

// Short labels keep the three tabs on one line on phones
const navItems = [
  { to: '/dashboard', label: 'Meus jogos', short: 'Jogos' },
  { to: '/statistics', label: 'Estatísticas', short: 'Estatísticas' },
  { to: '/wishlist', label: 'Lista de desejos', short: 'Desejos' }
]

const NavBar = () => {
  const sync = useSyncStatus()
  return (
    <Bar>
      <Inner>
        <Brand to='/dashboard' aria-label='Steam Manager'>
          <Logo src={logo} alt='' width={28} height={28} />
          <BrandName>Steam Manager</BrandName>
        </Brand>
        <Nav aria-label='Principal'>
          {navItems.map(item => (
            <NavItem key={item.to} to={item.to}>
              <LongLabel>{item.label}</LongLabel>
              <ShortLabel aria-hidden='true'>{item.short}</ShortLabel>
            </NavItem>
          ))}
        </Nav>
        <SyncStatus
          updatedAt={sync.updatedAt}
          refreshing={sync.refreshing}
          failed={sync.failed}
          onRefresh={sync.refreshAll}
        />
      </Inner>
    </Bar>
  )
}
export default NavBar
