import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Server, Channel } from '../../types';

interface ServersState {
  servers: Server[];
  loading: boolean;
  error: string | null;
}

const initialState: ServersState = {
  servers: [
    {
      id: 'server1',
      name: 'Dis-code Server',
      icon: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=74&q=80',
      channels: [
        {
          id: 'channel1',
          name: 'general',
          type: 'text',
          messages: [],
          unreadCount: 0,
        },
        {
          id: 'channel2',
          name: 'games',
          type: 'text',
          messages: [],
        },
        {
          id: 'channel3',
          name: 'music',
          type: 'text',
          messages: [],
        },
        {
          id: 'channel4',
          name: 'Movies',
          type: 'voice',
          messages: [],
        },
        {
          id: 'channel5',
          name: 'Songs',
          type: 'voice',
          messages: [],
        },
      ],
      members: [],
    },
  ],
  loading: false,
  error: null,
};

const serversSlice = createSlice({
  name: 'servers',
  initialState,
  reducers: {
    addServer: (state, action: PayloadAction<Server>) => {
      state.servers.push(action.payload);
    },
    removeServer: (state, action: PayloadAction<string>) => {
      state.servers = state.servers.filter(server => server.id !== action.payload);
    },
    addChannel: (state, action: PayloadAction<{ serverId: string; channel: Channel }>) => {
      const { serverId, channel } = action.payload;
      const server = state.servers.find(s => s.id === serverId);
      if (server) {
        server.channels.push(channel);
      }
    },
    removeChannel: (state, action: PayloadAction<{ serverId: string; channelId: string }>) => {
      const { serverId, channelId } = action.payload;
      const server = state.servers.find(s => s.id === serverId);
      if (server) {
        server.channels = server.channels.filter(channel => channel.id !== channelId);
      }
    },
  },
});

export const { addServer, removeServer, addChannel, removeChannel } = serversSlice.actions;

export default serversSlice.reducer;