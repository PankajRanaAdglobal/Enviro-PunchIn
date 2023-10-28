// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const visitorSlice = createSlice({
    name: 'visitorType',
    initialState: {
        data: null,
    },
    reducers: {

        visitorAction: (state, action) => {
            state.data = action.payload;
        },

    },
},
);
export const { visitorAction } = visitorSlice.actions
export default visitorSlice.reducer;
