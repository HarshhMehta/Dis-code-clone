import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UsersState {
  currentUser: User;
  onlineUsers: User[];
  offlineUsers: User[];
  isMicMuted: boolean;
  isDeafened: boolean;
}

const initialState: UsersState = {
  currentUser: {
    id: 'user1',
    username: 'Haarrsshh',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80',
    status: 'online',
    tag: 'Idle',
  },
  onlineUsers: [
    {
      id: 'user2',
      username: 'FredBoat♪',
      avatar: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80',
      status: 'online',
      isBot: true,
      tag: 'Playing music | /help',
    },
    {
      id: 'user3',
      username: 'Groovy',
      avatar: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80',
      status: 'online',
      isBot: true,
    },
    {
      id: 'user4',
      username: 'Haarrsshh',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80',
      status: 'online',
      tag: '👑',
    },
    {
      id: 'user5',
      username: 'Dhilu',
      avatar: 'https://avatars.githubusercontent.com/u/63575417?v=4',
      status: 'online',

      tag: 'Listening',
    },
    {
      id: 'user6',
      username: 'Mirror',
      avatar: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80',
      status: 'online',
      isBot: true,
    },
    {
      id: 'user7',
      username: 'Movie Night Bot',
      avatar: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80',
      status: 'online',
      isBot: true,
      tag: 'Watching Premium command...',
    },
    {
      id: 'user8',
      username: 'SEB',
      avatar: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80',
      status: 'online',
      isBot: true,
    },
  ],
  offlineUsers: [
    {
      id: 'user9',
      username: 'GROOVY MUSIC',
      avatar: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80',
      status: 'offline',
      isBot: true,
    },
    {
      id: 'user10',
      username: 'Shriyanshhh  ',
      avatar: 'https://avatars.githubusercontent.com/u/63575417?v=4',
      status: 'offline',
    },
    {
      id: 'user11',
      username: 'Movie Advisor',
      avatar: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80',
      status: 'offline',
      isBot: true,
    },
  ],
  isMicMuted: false,
  isDeafened: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserStatus: (state, action: PayloadAction<{ userId: string; status: 'online' | 'offline' | 'idle' | 'dnd' }>) => {
      const { userId, status } = action.payload;
      
      // Update in current user
      if (state.currentUser.id === userId) {
        state.currentUser.status = status;
      }
      
      // Update in online users
      const onlineUser = state.onlineUsers.find(user => user.id === userId);
      if (onlineUser) {
        onlineUser.status = status;
      }
      
      // Update in offline users
      const offlineUser = state.offlineUsers.find(user => user.id === userId);
      if (offlineUser) {
        offlineUser.status = status;
      }
    },
    addUser: (state, action: PayloadAction<User>) => {
      const newUser = action.payload;
      if (newUser.status === 'online') {
        state.onlineUsers.push(newUser);
      } else {
        state.offlineUsers.push(newUser);
      }
    },
    toggleMicMute: (state) => {
      state.isMicMuted = !state.isMicMuted;
    },
    toggleDeafen: (state) => {
      state.isDeafened = !state.isDeafened;
      // If undeafening, make sure mic is not muted
      if (!state.isDeafened) {
        state.isMicMuted = false;
      }
      // If deafening, make sure mic is muted
      if (state.isDeafened) {
        state.isMicMuted = true;
      }
    }
  },
});

export const { setUserStatus, addUser, toggleMicMute, toggleDeafen } = usersSlice.actions;

export default usersSlice.reducer;