// slices/authSlice.js
import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loginUser: null,
    profileData: null,
    isLoggedIn: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.loginUser = action.payload;
      state.isLoggedIn = true;
    },
    userProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    isLoggedIn: state => {
      state.isLoggedIn = true;
    },
    logoutSuccess: state => {
      state.loginUser = {};
      state.profileData = {};
      state.isLoggedIn = false;
    },
  },
});

export const {loginSuccess, userProfileData, logoutSuccess,isLoggedIn} = authSlice.actions;
export default authSlice.reducer;
