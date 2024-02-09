import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

export const store = configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
  },
});
