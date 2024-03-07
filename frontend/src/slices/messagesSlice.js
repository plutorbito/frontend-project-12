/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
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
      const { messages } = state;
      const newMessages = messages.filter(
        (message) => message.channelId !== currentChannelId,
      );
      state.messages = newMessages;
    });
  },
});

export const { setMessages, addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
