// ============================================
// LOGIN PAGE COMPONENT
// ============================================
// Login page with Auth0 authentication
// Redirects to backend Auth0 login endpoint (matching Python implementation)
// ============================================

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function Login() {
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/user`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.authenticated) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = () => {
    // Redirect to backend Auth0 login endpoint (matching Python implementation)
    window.location.href = `${API_URL}/auth/login`;
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
              Log In with Auth0
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