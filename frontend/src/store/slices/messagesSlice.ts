import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types';

interface MessagesState {
  messages: Record<string, Message[]>; // channelId -> messages
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: {
    channel1: [
      {
        id: 'msg1',
        content: 'https://youtu.be/YLoYt8H7kjM?si=GPUVdldUUxiXrQF',
        timestamp: '1/3/25, 4:34 AM',
        author: {
          id: 'user4',
          username: 'Haarrsshh',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80',
          status: 'online',
        },
      },
      {
        id: 'msg2',
        content: 'Song Added to Queue #2',
        timestamp: '1/3/25, 4:34 AM',
        author: {
          id: 'user5',
          username: 'Lara',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80',
          status: 'online',
          isBot: true,
        },
        attachments: [
          {
            id: 'att1',
            type: 'link',
            url: 'https://youtu.be/YLoYt8H7kjM?si=GPUVdldUUxiXrQF',
            title: 'Arijit Singh with his soulful performance | 6th Royal Stag Mirchi Music Awards | Radio Mirchi [9m 16s]',
          },
        ],
      },
      {
        id: 'msg3',
        content: 'Original message was deleted',
        timestamp: '1/3/25, 4:34 AM',
        author: {
          id: 'system',
          username: 'System',
          avatar: '',
          status: 'online',
        },
        isDeleted: true,
      },
      {
        id: 'msg4',
        content: '@Haarrsshh Skipped How To Create Music Bot in 2024 | Deploy your bot on Vps',
        timestamp: '1/3/25, 4:34 AM',
        author: {
          id: 'user5',
          username: 'Lara',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80',
          status: 'online',
          isBot: true,
        },
      },
    ],
  },
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<{ channelId: string; message: Message }>) => {
      const { channelId, message } = action.payload;
      if (!state.messages[channelId]) {
        state.messages[channelId] = [];
      }
      state.messages[channelId].push(message);
    },
    deleteMessage: (state, action: PayloadAction<{ channelId: string; messageId: string }>) => {
      const { channelId, messageId } = action.payload;
      if (state.messages[channelId]) {
        const messageIndex = state.messages[channelId].findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
          state.messages[channelId][messageIndex].isDeleted = true;
          state.messages[channelId][messageIndex].content = 'Original message was deleted';
        }
      }
    },
  },
});

export const { addMessage, deleteMessage } = messagesSlice.actions;

export default messagesSlice.reducer;