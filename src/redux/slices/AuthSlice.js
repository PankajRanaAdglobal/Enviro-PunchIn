// slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginUser: null,
    profileData: null,
    isLoggedIn: false,
    empLoyeLogin: null,
    dbToken: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.loginUser = action.payload;
      state.isLoggedIn = true;
    },
    EmployeloginSuccess: (state, action) => {
      state.empLoyeLogin = action.payload;
    },
    userProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setDbToken: (state, action) => {
      state.dbToken = action.payload;
    },
    isLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.loginUser = {};
      state.profileData = {};
      state.isLoggedIn = false;
      state.dbToken = null;
    },
  },
});

export const {
  loginSuccess,
  userProfileData,
  logoutSuccess,
  isLoggedI,
  EmployeloginSuccess,
  setDbToken,
} = authSlice.actions;
export default authSlice.reducer;
