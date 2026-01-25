import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-cyan-500/30 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-lime-400 rounded flex items-center justify-center shadow-lg shadow-lime-400/20">
          <div className="w-4 h-4 border-2 border-gray-900 rounded"></div>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">YourBank</span>
      </div>
      
      {/* Navigation Links */}
      <div className="hidden md:flex gap-8">
        <Link to="/" className="text-gray-300 hover:text-lime-400 transition-colors duration-200 font-medium">Home</Link>
        <Link to="/budg_p" className="text-gray-300 hover:text-lime-400 transition-colors duration-200 font-medium">Budget Plan</Link>
        <a href="#" className="text-gray-300 hover:text-lime-400 transition-colors duration-200 font-medium">About</a>
        <a href="#" className="text-gray-300 hover:text-lime-400 transition-colors duration-200 font-medium">Security</a>
      </div>
      
      {/* Auth Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-2 text-gray-300 hover:text-lime-400 transition-colors duration-200 font-medium">
          Sign Up
        </button>
        <button className="px-6 py-2 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-300 transition-all duration-200 shadow-lg shadow-lime-400/20 hover:shadow-lime-400/30">
          Login
        </button>
      </div>
    </nav>
  );
}