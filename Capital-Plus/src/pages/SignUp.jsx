// ============================================
// SIGN UP PAGE COMPONENT
// ============================================
// Simple signup page - redirects to dashboard
// ============================================

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Simple signup - just redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="page-bg">
      <Navbar />
      
      <div className="page-container">
        <div className="content-center">
          <div className="card-form">
            <h1 className="title-page">Create Account</h1>
            <p className="text-gray-400 mb-8">Start your financial journey today</p>

            <button 
              onClick={handleSignUp}
              className={`
                btn-primary w-full 
                hover:scale-105 
                mb-4
              `}
            >
              Get Started
            </button>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className={`
                  text-lime-400 
                  hover:text-lime-300 
                  font-medium 
                  transition-colors
                `}>
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
