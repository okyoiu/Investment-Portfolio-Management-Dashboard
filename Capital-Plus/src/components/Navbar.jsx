// ============================================
// NAVBAR COMPONENT
// ============================================
// Navigation bar with Auth0 authentication (backend-based)
// ============================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/user`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.authenticated && data.user) {
          console.log('✅ User authenticated:', data.user);
          console.log('   Profile picture:', data.user.picture);
          setUser(data.user);
        } else {
          console.log('❌ User not authenticated');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
    
    // Refresh user info periodically (every 30 seconds)
    const interval = setInterval(checkAuth, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // Redirect to backend logout endpoint (matching Python implementation)
    window.location.href = `${API_URL}/auth/logout`;
  };

  return (
    <nav className="nav-bar">
      
      {/* ============================================
          LEFT SIDE: Logo
          ============================================ */}
      <Link to="/" className={`
        flex items-center gap-2 
        cursor-pointer 
        hover:opacity-80 
        transition-opacity
      `}>
        <div className="icon-circle">
          <div className="w-4 h-4 border-2 border-gray-900 rounded"></div>
        </div>
        <span className={`
          text-xl font-bold 
          text-gradient
        `}>
          FundMental
        </span>
      </Link>
      
      {/* ============================================
          MIDDLE: Navigation Links
          ============================================ */}
      <div className="hidden md:flex gap-8">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/bank-manager" className="nav-link">Bank Manager</Link>
        {user && (
          <Link to="/settings" className="nav-link">Settings</Link>
        )}
      </div>
      
      {/* ============================================
          RIGHT SIDE: Auth Buttons / User Info
          ============================================ */}
      <div className="flex items-center gap-4">
        {isLoading ? (
          <span className="text-gray-400">Loading...</span>
        ) : user ? (
          <>
            <Link 
              to="/settings" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            >
              {/* Profile Picture - Always visible */}
              <div className="relative">
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name || user.email || 'User'} 
                    className="w-10 h-10 rounded-full border-2 border-lime-400/50 object-cover shadow-lg hover:border-lime-400 transition-all"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = 'none';
                      const parent = e.target.parentElement;
                      if (parent && !parent.querySelector('.fallback-avatar')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-avatar w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-semibold text-sm border-2 border-lime-400/50 shadow-lg';
                        fallback.textContent = (user.name || user.email || 'U')[0].toUpperCase();
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  // Fallback avatar if no picture
                  <div className="w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-semibold text-sm border-2 border-lime-400/50 shadow-lg hover:border-lime-400 transition-all">
                    {(user.name || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                {/* Online indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-lime-400 rounded-full border-2 border-gray-900"></div>
              </div>
              <span className="text-gray-300 text-sm hidden md:block font-medium">
                {user.name || user.email}
              </span>
            </Link>
            <button 
              onClick={handleLogout}
              className="btn-secondary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
