import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Scene {
  id: string;
  start: number;
  end: number;
}

interface TimelineState {
  scenes: Scene[];
  currentTime: number;
}

const initialState: TimelineState = {
  scenes: [],
  currentTime: 0,
};

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    addScene: (state, action: PayloadAction<Scene>) => {
      state.scenes.push(action.payload);
    },
    removeScene: (state, action: PayloadAction<string>) => {
      state.scenes = state.scenes.filter(scene => scene.id !== action.payload);
    },
    updateScene: (state, action: PayloadAction<Scene>) => {
      const index = state.scenes.findIndex(scene => scene.id === action.payload.id);
      if (index !== -1) {
        state.scenes[index] = action.payload;
      }
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    rearrangeScenes: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const result = Array.from(state.scenes);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      state.scenes = result;
    },
  },
});

export const { addScene, removeScene, updateScene, setCurrentTime, rearrangeScenes } = timelineSlice.actions;
export default timelineSlice.reducer;