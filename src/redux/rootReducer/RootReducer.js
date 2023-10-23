import {combineReducers} from '@reduxjs/toolkit';
import FcmReducer from '../slices/FcmSlice';
import authReducer from '../slices/AuthSlice';
import TokenReducer from '../slices/TokenSlice';

export const rootReducer = combineReducers({
  fcm: FcmReducer,
  auth: authReducer,
  authToken: TokenReducer,
});
