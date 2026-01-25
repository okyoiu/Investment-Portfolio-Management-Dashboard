// ============================================
// LOGIN PAGE COMPONENT
// ============================================
// Simple login page - redirects to dashboard
// ============================================

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple login - just redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="page-bg">
      <Navbar />
      
      <div className="page-container">
        <div className="content-center">
          <div className="card-form">
            <h1 className="title-page">Welcome Back</h1>
            <p className="text-gray-400 mb-8">Sign in to your account</p>

            <button 
              onClick={handleLogin}
              className={`
                btn-primary w-full 
                hover:scale-105 
                mb-4
              `}
            >
              Continue to Dashboard
            </button>

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
