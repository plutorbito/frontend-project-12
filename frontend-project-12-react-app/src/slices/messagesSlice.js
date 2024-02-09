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
  },
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
