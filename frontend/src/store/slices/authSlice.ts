import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// 🔹 Check Auth Status (Uses Token)
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue('No token found');

      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.user;
    } catch (error) {
      return rejectWithValue('Not authenticated');
    }
  }
);

// 🔹 Logout (Removes Token)
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      localStorage.removeItem("token"); // Clear token after logout
      return null;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ user: User, token: string }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("token", action.payload.token); // Store token
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { loginUser, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
