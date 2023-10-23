
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        accessToken: null,
        refreshToken: null
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefrestToken: (state, action) => {
            state.refreshToken = action.payload
        }
    },
});

export const { setAccessToken, setRefrestToken } = tokenSlice.actions;
export default tokenSlice.reducer;
