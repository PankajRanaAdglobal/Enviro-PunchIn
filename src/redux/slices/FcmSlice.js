import { createSlice } from '@reduxjs/toolkit';

const fcmSlice = createSlice({
  name: 'fcm',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

  },
});

export const { setToken } = fcmSlice.actions;
export default fcmSlice.reducer;
