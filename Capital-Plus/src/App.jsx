// ============================================
// MAIN APP COMPONENT
// ============================================
// This is the root component that sets up routing
// - Defines all the pages/routes in the app
// - Wraps everything in a Router so navigation works
// ============================================

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './components/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import BankManager from './pages/BankManager'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes - all accessible */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bank-manager" element={<BankManager />} />
      </Routes>
    </Router>
  )
}

export default App
