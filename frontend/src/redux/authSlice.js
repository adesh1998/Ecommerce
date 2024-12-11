import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Stores user data
  token: null, // Stores authentication token
  isLoggedIn: false, // Tracks login status
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
