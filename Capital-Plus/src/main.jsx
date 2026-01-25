// ============================================
// MAIN ENTRY POINT
// ============================================
// Simple React app setup without Auth0
// ============================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Verify root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

// Render the app
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)