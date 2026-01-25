// ============================================
// USER ROUTES
// ============================================
// Protected routes for user operations
// - /api/user/sync - Sync user data on login
// - All routes require valid Auth0 token
// ============================================

import express from 'express';
import { checkJwt } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// ============================================
// PROTECTED ROUTES
// ============================================
// All routes below require valid Auth0 token
// ============================================

// POST /api/user/sync
// Syncs user data when they log in
// - Creates user if doesn't exist
// - Returns user profile if exists
router.post('/sync', checkJwt, async (req, res) => {
  try {
    // Extract Auth0 user ID from validated JWT token
    // The token is validated by checkJwt middleware
    // req.auth.payload contains the decoded token
    const auth0Id = req.auth.payload.sub;
    
    if (!auth0Id) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'User ID not found in token'
      });
    }

    // Extract additional user info from Auth0 token (if available)
    const email = req.auth.payload.email || null;
    const name = req.auth.payload.name || null;

    // Check if user exists in database
    let user = await User.findByAuth0Id(auth0Id);

    if (!user) {
      // User doesn't exist - create new user
      user = await User.create({
        auth0Id: auth0Id,
        email: email,
        name: name,
        savingsGoals: [] // Start with empty savings goals
      });

      console.log(`✅ New user created: ${auth0Id}`);

      return res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user._id,
          auth0Id: user.auth0Id,
          email: user.email,
          name: user.name,
          savingsGoals: user.savingsGoals,
          financialData: user.financialData,
          budgets: user.budgets,
          createdAt: user.createdAt
        }
      });
    } else {
      // User exists - return their profile
      console.log(`✅ User found: ${auth0Id}`);

      return res.status(200).json({
        message: 'User profile retrieved',
        user: {
          id: user._id,
          auth0Id: user.auth0Id,
          email: user.email,
          name: user.name,
          savingsGoals: user.savingsGoals,
          financialData: user.financialData,
          budgets: user.budgets,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    }

  } catch (error) {
    console.error('❌ Error in /api/user/sync:', error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User already exists'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.message
      });
    }

    // Handle database connection errors
    if (error.name === 'MongoServerError' || error.name === 'MongooseError') {
      return res.status(500).json({
        error: 'Database Error',
        message: 'Failed to connect to database'
      });
    }

    // Generic server error
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred'
    });
  }
});

// GET /api/user/profile
// Get current user's profile
router.get('/profile', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;

    const user = await User.findByAuth0Id(auth0Id);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        auth0Id: user.auth0Id,
        email: user.email,
        name: user.name,
        savingsGoals: user.savingsGoals,
        financialData: user.financialData,
        budgets: user.budgets,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('❌ Error in /api/user/profile:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to retrieve user profile'
    });
  }
});

// Export router
export default router;
