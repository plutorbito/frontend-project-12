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
      const { name, currentId } = action.payload;
      const channelToRename = state.channels.find(({ id }) => id === currentId);
      channelToRename.name = name;
    },
  },
});

export const { setChannels, setActiveChannel, addNewChannel, renameChannel } =
  channelsSlice.actions;

export default channelsSlice.reducer;
