// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginUser: null,
        profileData: null,
        isLoggedIn: false,
        userHobbies: null,
        userSkill: null,
        clickOnIsEditProfile: false
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.loginUser = action.payload;
            state.isLoggedIn = true;
        },
        userProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        clickOnIsEditProfile: (state, action) => {
            state.clickOnIsEditProfile = action.payload
        },
        userSelectedHobbies: (state, action) => {
            state.userHobbies = action.payload;
        },
        userSelectedSkill: (state, action) => {
            state.userSkill = action.payload
        },
        logoutSuccess: (state) => {
            state.loginUser = {};
            state.profileData = {};
            state.isLoggedIn = false;
        },
    },
},
);

export const { loginSuccess, userProfileData, clickOnIsEditProfile, userSelectedHobbies, userSelectedSkill, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
