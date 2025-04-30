import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'images',
  initialState: Array<{ id: string; url: string }>(),
  reducers: {
    addImage: (state, action: { payload: { id: string; url: string } }) => {
      state.push(action.payload);
    },
    removeImage: (state, action: { payload: { id: string } }) => {
      return state.filter(image => image.id !== action.payload.id);
    },
  },
});

export const { addImage, removeImage } = imageSlice.actions;
export default imageSlice.reducer;