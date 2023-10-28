import { createSlice } from '@reduxjs/toolkit';


const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        appointmentData: null,
    },
    reducers: {
        appointmentAction: (state, action) => {
            state.appointmentData = action.payload
        },
    },

});

export const { appointmentAction } = appointmentSlice.actions
export default appointmentSlice.reducer;