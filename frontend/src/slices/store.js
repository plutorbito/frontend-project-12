import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import ModalsReducer from './modalsSlice';
import { backendApi } from '../api.js';

export const store = configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    ModalsReducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
});
