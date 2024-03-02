/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
};

export const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalInfo: (state, action) => {
      const { type } = action.payload;
      state.type = type;
    },
  },
});

export const { setModalInfo } = modalsSlice.actions;

export default modalsSlice.reducer;
