import { Navigate, Route, Routes } from 'react-router'
import NavBar from './components/navBar'
import Dashboard from './containers/dashboard'
import Statistics from './containers/statistics'
import Wishlist from './containers/wishlist'
import Game from './containers/game'

const App = () => (
  <>
    <NavBar />
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/statistics' element={<Statistics />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/game/:appId' element={<Game />} />
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  </>
)
export default App
