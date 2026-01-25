// ============================================
// SERVER ENTRY POINT
// ============================================
// This is the main server file that:
// - Connects to MongoDB
// - Sets up Express middleware
// - Registers routes
// - Starts the server
// ============================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config(); // Load environment variables from .env file

// Access the secret via process.env
const secretKey = process.env.APP_SECRET;

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS (allow frontend to make requests)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// DATABASE CONNECTION
// ============================================

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/capital-plus';
    
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit if database connection fails
  }
};

// Connect to database
connectDB();

// ============================================
// ROUTES
// ============================================

// Health check route (no auth required)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Capital Plus API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes (protected with Auth0)
app.use('/api', apiRoutes);

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // If response already sent, delegate to default handler
  if (res.headersSent) {
    return next(err);
  }

  // Send error response
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// START SERVER
// ============================================

const config = {
  authRequired: true,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'z64XMFb4ZA0At5kdHT2je0bR8p76Pdch',
  issuerBaseURL: 'dev-qf6vehdgcboq5pd2.us.auth0.com',
  secret: 'LONG_RANDOM_STRING'
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});


app.get('/dashboard', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await mongoose.connection.close();
  process.exit(0);
});


