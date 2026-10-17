import { Navigate, Route, Routes } from 'react-router'
import NavBar from './components/navBar'
import LibraryPage from './pages/library'
import StatisticsPage from './pages/statistics'
import WishlistPage from './pages/wishlist'
import GamePage from './pages/game'

const App = () => (
  <>
    <NavBar />
    <Routes>
      <Route path='/dashboard' element={<LibraryPage />} />
      <Route path='/statistics' element={<StatisticsPage />} />
      <Route path='/wishlist' element={<WishlistPage />} />
      <Route path='/game/:appId' element={<GamePage />} />
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  </>
)
export default App
