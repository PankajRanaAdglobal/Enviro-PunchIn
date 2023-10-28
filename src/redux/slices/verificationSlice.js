import { createSlice } from '@reduxjs/toolkit';

const verificationSlice = createSlice({
    name: 'verification',
    initialState: {
        verificationData: null,
    },
    reducers: {
        verificationAction: (state, action) => {
            state.verificationData = action.payload
        },
    },
}
);

export const { verificationAction } = verificationSlice.actions
export default verificationSlice.reducer;












