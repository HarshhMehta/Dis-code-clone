import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Create error utility
const createError = (status, message) => {
  const error = new Error(message);
  error.statusCode = status;
  return error;
};

// Register a new user
export const register = async (req, res, next) => {
  try {
    const { email, username, displayName, password, dateOfBirth } = req.body;
    
    // Check if user already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(createError(400, 'Email already in use'));
    }
    
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return next(createError(400, 'Username already taken'));
    }
    
    // Create new user
    const newUser = new User({
      email,
      username,
      displayName,
      password,
      dateOfBirth: new Date(dateOfBirth)
    });
    
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove password from response
    const { password: pass, ...userData } = newUser._doc;
    
    // Set cookie and send response
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'strict'
    }).status(201).json({
      success: true,
      user: userData
    });
    
  } catch (error) {
    next(error);
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(createError(401, 'Invalid credentials'));
    }
    
    // Update user status to online
    user.status = 'online';
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove password from response
    const { password: pass, ...userData } = user._doc;
    
    // Set cookie and send response
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'strict'
    }).status(200).json({
      success: true,
      user: userData
    });
    
  } catch (error) {
    next(error);
  }
};

// Logout user
export const logout = async (req, res, next) => {
  try {
    // Update user status to offline if authenticated
    if (req.user) {
      const user = await User.findById(req.user.id);
      if (user) {
        user.status = 'offline';
        await user.save();
      }
    }
    
    // Clear cookie
    res.clearCookie('token').status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
    
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    
    res.status(200).json({
      success: true,
      user
    });
    
  } catch (error) {
    next(error);
  }
};