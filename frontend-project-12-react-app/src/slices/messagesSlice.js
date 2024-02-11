import { createSlice } from '@reduxjs/toolkit';

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
});

export const { setMessages, addNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
