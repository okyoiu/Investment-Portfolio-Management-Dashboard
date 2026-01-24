import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-cyan-500/30">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-lime-400 rounded flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-gray-900 rounded"></div>
        </div>
        <span className="text-xl font-bold">YourBank</span>
      </div>
      
      {/* Navigation Links */}
      <div className="flex gap-8">
        <a href="#" className="hover:text-lime-400 transition">Home</a>
        <a href="#" className="hover:text-lime-400 transition">Careers</a>
        <a href="#" className="hover:text-lime-400 transition">About</a>
        <a href="#" className="hover:text-lime-400 transition">Security</a>
      </div>
      
      {/* Auth Buttons */}
      <div className="flex gap-4">
        <button className="px-6 py-2 hover:text-lime-400 transition">
          Sign Up
        </button>
        <button className="px-6 py-2 bg-lime-400 text-gray-900 rounded-full font-semibold hover:bg-lime-300 transition">
          Login
        </button>
      </div>
    </nav>
  );
}