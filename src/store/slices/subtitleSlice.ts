"use client";

import { createSlice } from '@reduxjs/toolkit';

interface Subtitle {
  id: string;
  text: string;
}

const subtitleSlice = createSlice({
  name: 'subtitles',
  initialState: [] as Subtitle[],
  reducers: {
    addSubtitle: (state, action: { payload: Subtitle }) => {
      state.push(action.payload);
    },
    removeSubtitle: (state, action: { payload: { id: string } }) => {
      return state.filter(subtitle => subtitle.id !== action.payload.id);
    },
  },
});

export const { addSubtitle, removeSubtitle } = subtitleSlice.actions;
export default subtitleSlice.reducer;