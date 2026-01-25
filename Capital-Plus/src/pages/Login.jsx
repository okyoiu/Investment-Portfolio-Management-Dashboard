// ============================================
// LOGIN PAGE COMPONENT
// ============================================
// This page allows users to sign in to their account
// - Takes email and password
// - Sends data to backend
// - Saves login token if successful
// - Redirects to dashboard after login
// ============================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { login } from '../services/api';

export default function Login() {
  // ============================================
  // STATE VARIABLES
  // ============================================
  
  // Store what user types in email field
  const [email, setEmail] = useState('');
  
  // Store what user types in password field
  const [password, setPassword] = useState('');
  
  // Track if we're waiting for backend response (shows loading spinner)
  const [isLoading, setIsLoading] = useState(false);
  
  // Store error message to show user if login fails
  const [error, setError] = useState('');

  // Used to redirect user to another page after login
  const navigate = useNavigate();

  // ============================================
  // FUNCTIONS
  // ============================================
  
  // This runs when user clicks "Sign In" button
  const submitForm = async (event) => {
    // Prevent page from refreshing when form is submitted
    event.preventDefault();
    
    // Clear any previous error messages
    setError('');
    
    // Show loading state (button will say "Signing In...")
    setIsLoading(true);

    try {
      // Send email and password to backend
      const response = await login({ email, password });
      
      // If backend returns a token, save it for future requests
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      // Success! Redirect to dashboard/home page
      navigate('/');
      
    } catch (error) {
      // If login fails, show error message to user
      setError(error.message || 'Invalid email or password. Please try again.');
    } finally {
      // Always stop loading, whether login succeeded or failed
      setIsLoading(false);
    }
  };

  // ============================================
  // RENDER (What shows on screen)
  // ============================================
  return (
    <div className="page-bg">
      {/* Top navigation bar */}
      <Navbar />
      
      {/* Main content container */}
      <div className="page-container">
        <div className="content-center">
          
          {/* Login form card */}
          <div className="card-form">
            <h1 className="title-page">Welcome Back</h1>
            <p className="text-gray-400 mb-8">Sign in to your account</p>

            {/* Show error message if login failed */}
            {error && (
              <div className={`
                mb-4 p-3 
                bg-red-500/20 
                border border-red-500/50 
                rounded-lg 
                text-red-400 text-sm
              `}>
                {error}
              </div>
            )}

            {/* Login form */}
            <form onSubmit={submitForm} className="space-y-6">
              
              {/* Email input field */}
              <div>
                <label htmlFor="email" className={`
                  block 
                  text-sm font-medium 
                  text-gray-300 mb-2
                `}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password input field */}
              <div>
                <label htmlFor="password" className={`
                  block 
                  text-sm font-medium 
                  text-gray-300 mb-2
                `}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Remember me checkbox and forgot password link */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="input-checkbox" />
                  <span className="ml-2 text-sm text-gray-400">Remember me</span>
                </label>
                <a href="#" className={`
                  text-sm 
                  text-lime-400 
                  hover:text-lime-300 
                  transition-colors
                `}>
                  Forgot password?
                </a>
              </div>

              {/* Submit button */}
              <button 
                type="submit" 
                className={`
                  btn-primary w-full 
                  hover:scale-105 
                  disabled:opacity-50 
                  disabled:cursor-not-allowed
                `}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Link to sign up page */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className={`
                  text-lime-400 
                  hover:text-lime-300 
                  font-medium 
                  transition-colors
                `}>
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
