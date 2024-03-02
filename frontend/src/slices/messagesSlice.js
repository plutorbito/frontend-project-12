import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { removeChannel } from './channelsSlice';

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const currentChannelId = action.payload;
      _.remove(
        state.messages,
        ({ channelId }) => channelId === currentChannelId,
      );
    });
  },
});

export const { setMessages, addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
