import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['text', 'voice'],
    default: 'text'
  }
}, { timestamps: true });

const ServerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    default: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  channels: [ChannelSchema],
  inviteCode: {
    type: String,
    unique: true
  }
}, { timestamps: true });

// Generate a random invite code before saving
ServerSchema.pre('save', function(next) {
  if (!this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2, 8);
  }
  next();
});

const Server = mongoose.model('Server', ServerSchema);

export default Server;