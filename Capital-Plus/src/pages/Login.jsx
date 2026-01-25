// ============================================
// LOGIN PAGE COMPONENT
// ============================================
// Simple login page - redirects to dashboard
// ============================================

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  // const navigate = useAuth0();

  const handleLogin = () => {
    return (
      <button 
        onClick={() => useAuth0()} 
        className="button login"
      >
        Log In
      </button>
    );
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
              {/* {req.oidc.isAuthenticated() ?*/ 'Continue to Dashboard'/* : 'Log in'} */}
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


