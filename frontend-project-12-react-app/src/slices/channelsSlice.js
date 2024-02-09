import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
});

export const { setChannels, setActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
