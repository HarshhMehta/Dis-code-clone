import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import serversReducer from './slices/serversSlice';
import usersReducer from './slices/usersSlice';
import messagesReducer from './slices/messagesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    servers: serversReducer,
    users: usersReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;