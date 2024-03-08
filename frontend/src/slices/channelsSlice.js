/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannelId: '1',
};

export const channelsSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
});

export const {
  setActiveChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
