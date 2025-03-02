import Server from '../models/Server.js';
import User from '../models/User.js';

// Create error utility
const createError = (status, message) => {
  const error = new Error(message);
  error.statusCode = status;
  return error;
};

// Create a new server
export const createServer = async (req, res, next) => {
  try {
    const { name, icon } = req.body;
    const userId = req.user.id;
    
    // Create server with default channels
    const newServer = new Server({
      name,
      icon: icon || undefined,
      owner: userId,
      members: [userId],
      channels: [
        { name: 'general', type: 'text' },
        { name: 'voice-chat', type: 'voice' }
      ]
    });
    
    const savedServer = await newServer.save();
    
    // Add server to user's servers
    await User.findByIdAndUpdate(userId, {
      $push: { servers: savedServer._id }
    });
    
    res.status(201).json({
      success: true,
      server: savedServer
    });
    
  } catch (error) {
    next(error);
  }
};

// Get user's servers
export const getUserServers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const servers = await Server.find({ members: userId })
      .populate('owner', 'username avatar')
      .populate('members', 'username avatar status');
    
    res.status(200).json({
      success: true,
      servers
    });
    
  } catch (error) {
    next(error);
  }
};

// Join a server with invite code
export const joinServer = async (req, res, next) => {
  try {
    const { inviteCode } = req.body;
    const userId = req.user.id;
    
    const server = await Server.findOne({ inviteCode });
    
    if (!server) {
      return next(createError(404, 'Invalid invite code'));
    }
    
    // Check if user is already a member
    if (server.members.includes(userId)) {
      return next(createError(400, 'You are already a member of this server'));
    }
    
    // Add user to server members
    server.members.push(userId);
    await server.save();
    
    // Add server to user's servers
    await User.findByIdAndUpdate(userId, {
      $push: { servers: server._id }
    });
    
    res.status(200).json({
      success: true,
      server
    });
    
  } catch (error) {
    next(error);
  }
};

// Create a new invite code
export const createInviteCode = async (req, res, next) => {
  try {
    const { serverId } = req.params;
    const userId = req.user.id;
    
    const server = await Server.findById(serverId);
    
    if (!server) {
      return next(createError(404, 'Server not found'));
    }
    
    // Check if user is the owner or a member
    if (server.owner.toString() !== userId && !server.members.includes(userId)) {
      return next(createError(403, 'You do not have permission to create an invite'));
    }
    
    // Generate new invite code
    server.inviteCode = Math.random().toString(36).substring(2, 8);
    await server.save();
    
    res.status(200).json({
      success: true,
      inviteCode: server.inviteCode
    });
    
  } catch (error) {
    next(error);
  }
};