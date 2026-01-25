// ============================================
// MAIN ENTRY POINT
// ============================================
// React app setup with backend Auth0 authentication
// Auth0 is handled by the backend (matching Python capitalPlusPlus)
// ============================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Verify root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Render the app (Auth0 is handled by backend, not frontend SDK)
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);