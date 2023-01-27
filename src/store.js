import { configureStore } from '@reduxjs/toolkit';
import snackbarMessagesReducer from './snackbarMessagesSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    snackbarMessages: snackbarMessagesReducer,
    auth: authReducer,
  },
})

export default store;
