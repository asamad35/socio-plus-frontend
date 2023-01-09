import { createSlice } from "@reduxjs/toolkit";
import * as thunks from "../../thunks";
const initialState = {
  audioPreviewUrl: "",
  recordingState: false,
  showKeyboard: true,
  showMic: false,
  status: null,
  prevPage: "login",
  nextPage: "signup",
  infoDrawer: false,
  isUserProfile: false,
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
    setIsUserProfile(state, action) {
      state.isUserProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(thunks.postChangeStatus.fulfilled, (state, action) => {
    //   state.todos = action.payload;
    // });
  },
});

export const {
  setAudioPreviewUrl,
  setRecordingState,
  setShowKeyboard,
  setShowMic,
  setStatus,
  setInfoDrawer,
  setIsUserProfile,
} = chatReducer.actions;
export default chatReducer.reducer;
