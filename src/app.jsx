import { Navigate, Route, Routes } from 'react-router'
import NavBar from './components/navBar'
import Dashboard from './containers/dashboard'
import Statistics from './containers/statistics'

const App = () => (
  <>
    <NavBar />
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/statistics' element={<Statistics />} />
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  </>
)
export default App
