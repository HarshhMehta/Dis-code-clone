import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import serversReducer from './slices/serversSlice';
import usersReducer from './slices/usersSlice';
import messagesReducer from './slices/messagesSlice';
import authReducer from "./slices/authSlice";


export const store = configureStore({
  reducer: {
    ui: uiReducer,
    servers: serversReducer,
    users: usersReducer,
    messages: messagesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;