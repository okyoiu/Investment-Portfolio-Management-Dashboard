// ============================================
// SIGN UP PAGE COMPONENT
// ============================================
// This page allows new users to create an account
// - Takes name, email, password, and password confirmation
// - Validates that passwords match
// - Sends data to backend to create account
// - Redirects to login page after successful signup
// ============================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { signUp } from '../services/api';

export default function SignUp() {
  // ============================================
  // STATE VARIABLES
  // ============================================
  
  // Store all the information user types in the form
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '' // User types password twice to make sure it's correct
  });

  // Track if we're waiting for backend response (shows loading spinner)
  const [isLoading, setIsLoading] = useState(false);
  
  // Store error message to show user if signup fails
  const [error, setError] = useState('');

  // Used to redirect user to login page after successful signup
  const navigate = useNavigate();

  // ============================================
  // FUNCTIONS
  // ============================================
  
  // This runs when user types in any input field
  const updateField = (event) => {
    // Update the specific field that changed, keep other fields the same
    setUserInfo({
      ...userInfo, // Keep existing values
      [event.target.name]: event.target.value // Update only the field that changed
    });
    
    // Clear error message when user starts typing again
    if (error) setError('');
  };

  // This runs when user clicks "Create Account" button
  const submitForm = async (event) => {
    // Prevent page from refreshing when form is submitted
    event.preventDefault();
    
    // Clear any previous error messages
    setError('');
    
    // ============================================
    // VALIDATION (Check if data is correct)
    // ============================================
    
    // Check if both passwords match
    if (userInfo.password !== userInfo.passwordConfirm) {
      setError('Passwords do not match!');
      return; // Stop here, don't send to backend
    }

    // Check if password is long enough (at least 6 characters)
    if (userInfo.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return; // Stop here, don't send to backend
    }

    // ============================================
    // SEND DATA TO BACKEND
    // ============================================
    
    // Show loading state (button will say "Creating Account...")
    setIsLoading(true);

    try {
      // Send user data to backend to create account
      const response = await signUp({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
      });

      // Success! Show message and redirect to login page
      alert('Account created successfully! Please log in.');
      navigate('/login');
      
    } catch (error) {
      // If signup fails, show error message to user
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      // Always stop loading, whether signup succeeded or failed
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
          
          {/* Sign up form card */}
          <div className="card-form">
            <h1 className="title-page">Create Account</h1>
            <p className="text-gray-400 mb-8">Start your financial journey today</p>

            {/* Show error message if signup failed */}
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

            {/* Sign up form */}
            <form onSubmit={submitForm} className="space-y-6">
              
              {/* Full name input field */}
              <div>
                <label htmlFor="name" className={`
                  block 
                  text-sm font-medium 
                  text-gray-300 mb-2
                `}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={updateField}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>

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
                  name="email"
                  value={userInfo.email}
                  onChange={updateField}
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
                  name="password"
                  value={userInfo.password}
                  onChange={updateField}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Confirm password input field */}
              <div>
                <label htmlFor="passwordConfirm" className={`
                  block 
                  text-sm font-medium 
                  text-gray-300 mb-2
                `}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={userInfo.passwordConfirm}
                  onChange={updateField}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Terms and conditions checkbox */}
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="input-checkbox" required />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-lime-400 hover:text-lime-300 transition-colors">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn-primary w-full hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Link to login page */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-lime-400 hover:text-lime-300 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
