import { Navigate, Route, Routes } from 'react-router'
import Header from './components/newHeader'
import Dashboard from './containers/dashboard'
import Statistics from './containers/statistics'

const App = () => (
  <div>
    <Header />
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/statistics' element={<Statistics />} />
      <Route path='*' element={<Navigate to='/dashboard' replace />} />
    </Routes>
  </div>
)
export default App
