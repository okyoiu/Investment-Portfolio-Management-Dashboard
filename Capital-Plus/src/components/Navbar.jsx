// ============================================
// NAVBAR COMPONENT
// ============================================
// This is the top navigation bar that appears on every page
// - Shows logo (clickable, goes to home)
// - Shows navigation links (Home, Careers, About, Security)
// - Shows Sign Up and Login buttons
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav-bar">
      
      {/* ============================================
          LEFT SIDE: Logo
          ============================================ */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
        {/* Logo icon */}
        <div className="icon-circle">
          <div className="w-4 h-4 border-2 border-gray-900 rounded"></div>
        </div>
        {/* Logo text */}
        <span className="text-xl font-bold text-gradient">YourBank</span>
      </Link>
      
      {/* ============================================
          MIDDLE: Navigation Links
          ============================================ */}
      <div className="hidden md:flex gap-8">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link">Careers</a>
        <a href="#" className="nav-link">About</a>
        <a href="#" className="nav-link">Security</a>
      </div>
      
      {/* ============================================
          RIGHT SIDE: Auth Buttons
          ============================================ */}
      <div className="flex gap-4">
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
