import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  url: string | null;
  name: string;
  duration: number;
  isUploading: boolean;
  progress: number;
  thumbnail: string | null;
}

const initialState: VideoState = {
  url: null,
  name: '',
  duration: 0,
  isUploading: false,
  progress: 0,
  thumbnail: null,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<{ url: string; name: string; duration: number }>) => {
      state.url = action.payload.url;
      state.name = action.payload.name;
      state.duration = action.payload.duration;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
    setThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    resetVideo: (state) => {
      state.url = null;
      state.name = '';
      state.duration = 0;
      state.isUploading = false;
      state.progress = 0;
      state.thumbnail = null;
    },
  },
});

export const { setVideo, setUploadProgress, setUploading, setThumbnail, resetVideo } = videoSlice.actions;
export default videoSlice.reducer;