import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  currentServerId: string | null;
  currentChannelId: string | null;
  isMemberListVisible: boolean;
  isUserSettingsOpen: boolean;
  theme: 'dark' | 'light';
  connectedToVoice: boolean;
  currentVoiceChannelId: string | null;
  currentVoiceChannelName: string | null;
}

const initialState: UiState = {
  currentServerId: 'server1',
  currentChannelId: 'channel1',
  isMemberListVisible: true,
  isUserSettingsOpen: false,
  theme: 'dark',
  connectedToVoice: false,
  currentVoiceChannelId: null,
  currentVoiceChannelName: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentServer: (state, action: PayloadAction<string>) => {
      state.currentServerId = action.payload;
    },
    setCurrentChannel: (state, action: PayloadAction<string>) => {
      state.currentChannelId = action.payload;
    },
    toggleMemberList: (state) => {
      state.isMemberListVisible = !state.isMemberListVisible;
    },
    toggleUserSettings: (state) => {
      state.isUserSettingsOpen = !state.isUserSettingsOpen;
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
    },
    connectToVoiceChannel: (state, action: PayloadAction<{ channelId: string; channelName: string }>) => {
      state.connectedToVoice = true;
      state.currentVoiceChannelId = action.payload.channelId;
      state.currentVoiceChannelName = action.payload.channelName;
    },
    disconnectFromVoiceChannel: (state) => {
      state.connectedToVoice = false;
      state.currentVoiceChannelId = null;
      state.currentVoiceChannelName = null;
    },
  },
});

export const {
  setCurrentServer,
  setCurrentChannel,
  toggleMemberList,
  toggleUserSettings,
  setTheme,
  connectToVoiceChannel,
  disconnectFromVoiceChannel,
} = uiSlice.actions;

export default uiSlice.reducer;