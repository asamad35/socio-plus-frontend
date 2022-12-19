import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "../../thunks";
const initialState = {
  count: 0,
  audioPreviewUrl: "",
  recordingState: false,
  showKeyboard: true,
  showMic: false,
  status: null,
  prevPage: "login",
  nextPage: "signup",
};
const testReducer = createSlice({
  name: "testReducer",
  initialState,
  reducers: {
    increment(state, action) {
      state.count++;
    },
    decrement(state, action) {
      state.count--;
    },
    incrementByValue(state, action) {
      state.count = action.payload.count;
    },
    setAudioPreviewUrl(state, action) {
      state.audioPreviewUrl = action.payload;
    },
    setRecordingState(state, action) {
      state.recordingState = action.payload;
    },
    setShowKeyboard(state, action) {
      state.showKeyboard = action.payload;
    },
    setShowMic(state, action) {
      state.showMic = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setPrevPage(state, action) {
      state.prevPage = action.payload;
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.getAllTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(thunks.getAllTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      })
      .addCase(thunks.getTodoById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(thunks.getTodoById.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = action.payload;
      });
  },
});

export const {
  increment,
  decrement,
  incrementByValue,
  setAudioPreviewUrl,
  setRecordingState,
  setPrevPage,
  setNextPage,
  setShowKeyboard,
  setShowMic,
  setStatus,
} = testReducer.actions;
export default testReducer.reducer;
