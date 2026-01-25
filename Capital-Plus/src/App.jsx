// ============================================
// MAIN APP COMPONENT
// ============================================
// This is the root component that sets up routing
// - Defines all the pages/routes in the app
// - Wraps everything in a Router so navigation works
// ============================================

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page - shows dashboard */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Sign up page */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
