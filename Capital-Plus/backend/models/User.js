// ============================================
// USER MODEL
// ============================================
// Mongoose schema for User documents
// - Stores Auth0 user ID (sub) as auth0Id (optional for Auth0 users)
// - Stores user email and name
// - Stores hashed password (for email/password auth)
// - Stores account creation date
// - Stores savings goals array
// - Indexed for fast lookups
// ============================================

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Savings Goal sub-schema
const savingsGoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  currentAmount: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  _id: true, // Give each goal a unique ID
  timestamps: true // Add createdAt and updatedAt to each goal
});

// User schema definition
const userSchema = new mongoose.Schema({
  // Auth0 User ID (sub claim from JWT) - optional, unique if provided, indexed
  auth0Id: {
    type: String,
    required: false,
    unique: true,
    sparse: true, // Allow multiple null values
    index: true // Indexed for fast lookups
  },
  
  // User email - required, unique, indexed
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true // Indexed for email lookups
  },
  
  // User name
  name: {
    type: String,
    required: false,
    trim: true
  },
  
  // Hashed password (for email/password authentication)
  password: {
    type: String,
    required: false, // Not required if using Auth0
    select: false // Don't return password in queries by default
  },
  
  // Account creation date - defaults to now
  accountCreated: {
    type: Date,
    default: Date.now,
    required: true
  },
  
  // Savings goals array
  savingsGoals: {
    type: [savingsGoalSchema],
    default: [] // Start with empty array
  }
}, {
  // Automatically add updatedAt field (accountCreated is separate)
  timestamps: true
});

// ============================================
// PRE-SAVE HOOK
// ============================================
// Hash password before saving to database
// ============================================

userSchema.pre('save', async function(next) {
  // Only hash password if it's been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  
  // Hash password with bcrypt
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  next();
});

// ============================================
// STATIC METHODS
// ============================================

// Find user by Auth0 ID (uses index for fast lookup)
userSchema.statics.findByAuth0Id = function(auth0Id) {
  return this.findOne({ auth0Id });
};

// Find user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Compare password (for login)
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(candidatePassword, this.password);
};

// Find or Create user (Find or Create pattern) - for Auth0
userSchema.statics.findOrCreate = async function(userData) {
  const { auth0Id, email, name } = userData;
  
  // Try to find existing user
  let user = await this.findByAuth0Id(auth0Id);
  
  if (!user) {
    // User doesn't exist - create new user
    user = await this.create({
      auth0Id,
      email,
      name,
      accountCreated: new Date(),
      savingsGoals: [] // Start with empty savings goals
    });
  } else {
    // User exists - update email/name if provided
    if (email && user.email !== email) {
      user.email = email;
    }
    if (name && user.name !== name) {
      user.name = name;
    }
    await user.save();
  }
  
  return user;
};

// ============================================
// INSTANCE METHODS
// ============================================

// Add a savings goal
userSchema.methods.addSavingsGoal = function(title, targetAmount) {
  this.savingsGoals.push({
    title,
    currentAmount: 0,
    targetAmount
  });
  return this.save();
};

// Update savings goal progress
userSchema.methods.updateSavingsGoal = function(goalId, currentAmount) {
  const goal = this.savingsGoals.id(goalId);
  if (goal) {
    goal.currentAmount = currentAmount;
    return this.save();
  }
  throw new Error('Savings goal not found');
};

// ============================================
// EXPORT MODEL
// ============================================

const User = mongoose.model('User', userSchema);
export default User;
