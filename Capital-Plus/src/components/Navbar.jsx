// ============================================
// NAVBAR COMPONENT
// ============================================
// Navigation bar without Auth0
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
      </div>
      
      {/* ============================================
          RIGHT SIDE: Auth Buttons
          ============================================ */}
      <div className="flex items-center gap-4">
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
        <Link to="/login" className="btn-primary">
          Login
        </Link>
      </div>
    </nav>
  );
}
