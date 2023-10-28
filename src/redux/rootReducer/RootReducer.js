import { combineReducers } from '@reduxjs/toolkit';
import FcmReducer from '../slices/FcmSlice';
import authReducer from '../slices/VisitorSlice';
import TokenReducer from '../slices/TokenSlice';
import VisitorSlice from '../slices/VisitorSlice';
import verificationSlice from '../slices/verificationSlice';
import AppointmentSlice from '../slices/AppointmentSlice';

export const rootReducer = combineReducers({
  visitor: VisitorSlice,
  verification: verificationSlice,
  appointment: AppointmentSlice
  // fcm: FcmReducer,
  // auth: authReducer,
  // authToken: TokenReducer,
});
