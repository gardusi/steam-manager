import { Bar, Inner, Brand, Logo, BrandName, Nav, NavItem, LongLabel, ShortLabel } from './style'
import SyncStatus from '../syncStatus'
import { useOwnedGames } from '../../state/ownedGames'
import { useWishlist } from '../../state/wishlist'
import logo from '../../assets/logo.png'

// Short labels keep the three tabs on one line on phones
const navItems = [
  { to: '/dashboard', label: 'Meus jogos', short: 'Jogos' },
  { to: '/statistics', label: 'Estatísticas', short: 'Estatísticas' },
  { to: '/wishlist', label: 'Lista de desejos', short: 'Desejos' }
]

const NavBar = () => {
  const library = useOwnedGames()
  const wishlist = useWishlist()

  // One status for both data sources: oldest update, refreshing/failed if either is
  const updates = [library.updatedAt, wishlist.updatedAt].filter(Boolean)
  const failed = (Boolean(library.error) && library.games.length > 0) ||
    (Boolean(wishlist.error) && wishlist.items.length > 0)
  const refreshAll = () => {
    library.reload()
    wishlist.reload()
  }

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
          updatedAt={updates.length ? Math.min(...updates) : null}
          refreshing={library.refreshing || wishlist.refreshing}
          failed={failed}
          onRefresh={refreshAll}
        />
      </Inner>
    </Bar>
  )
}
export default NavBar
