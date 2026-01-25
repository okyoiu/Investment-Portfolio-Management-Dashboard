// ============================================
// API ROUTES
// ============================================
// Main API route file that:
// - Registers all API endpoints
// - Applies authentication middleware
// - Connects controllers to routes
// ============================================

import express from 'express';
import { checkJwt } from '../middleware/auth.js';
import { verifyToken } from '../middleware/jwtAuth.js';
import { 
  signUp, 
  login, 
  loginSync, 
  getUserProfile 
} from '../controllers/authController.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// POST /api/auth/signup
// Create new account with email and password
router.post('/auth/signup', signUp);

// POST /api/auth/login
// Login with email and password
router.post('/auth/login', login);

// ============================================
// PROTECTED ROUTES (Require authentication)
// ============================================

// POST /api/login-sync (Auth0 only)
// Login/Sync endpoint for Auth0 users
// - Receives Auth0 JWT from frontend
// - Decodes JWT to get sub, email, name
// - Finds user by auth0Id or creates new one
router.post('/login-sync', checkJwt, loginSync);

// GET /api/user/profile
// Get current authenticated user's profile
// Works with JWT tokens (email/password authentication)
router.get('/user/profile', verifyToken, getUserProfile);

// ============================================
// EXPORT ROUTER
// ============================================

export default router;
