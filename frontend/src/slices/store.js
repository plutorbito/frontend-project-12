import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import modalsReducer from './modalsSlice';
import { backendApi } from '../api.js';

const store = configureStore({
  reducer: {
    channelsReducer,
    modalsReducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
});

export default store;
