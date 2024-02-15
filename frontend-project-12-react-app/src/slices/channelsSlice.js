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
    addNewChannel: (state, action) => {
      state.channels.push(action.payload);
    },
  },
});

export const { setChannels, setActiveChannel, addNewChannel } =
  channelsSlice.actions;

export default channelsSlice.reducer;
