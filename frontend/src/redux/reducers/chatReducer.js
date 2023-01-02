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
  infoDrawer: false,
};
const chatReducer = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {
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
    setInfoDrawer(state, action) {
      state.infoDrawer = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(thunks.getAllTodos.pending, (state, action) => {
  //       state.status = "loading";
  //     })
  //     .addCase(thunks.getAllTodos.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.todos = action.payload;
  //     })
  //     .addCase(thunks.getTodoById.pending, (state, action) => {
  //       state.status = "loading";
  //     })
  //     .addCase(thunks.getTodoById.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.todos = action.payload;
  //     });
  // },
});

export const {
  setAudioPreviewUrl,
  setRecordingState,
  setShowKeyboard,
  setShowMic,
  setStatus,
  setInfoDrawer,
} = chatReducer.actions;
export default chatReducer.reducer;
