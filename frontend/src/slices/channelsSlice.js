/* eslint-disable no-param-reassign */
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
    renameChannel: (state, action) => {
      const { channels } = state;
      const { name, id } = action.payload;
      console.log(action.payload);
      const newChannels = channels.map((channel) => (
        channel.id === id ? { ...channel, name } : channel));
      console.log('newChannels', newChannels);
      state.channels = newChannels;
    },
    removeChannel: (state, action) => {
      const { channels } = state;
      const id = action.payload;
      const newChannels = channels.filter((channel) => channel.id !== id);
      state.channels = newChannels;
    },
  },
});

export const {
  setChannels,
  setActiveChannel,
  addNewChannel,
  renameChannel,
  removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
