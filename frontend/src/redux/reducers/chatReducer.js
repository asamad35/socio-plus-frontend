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
  searchUserList: null,
  searchUserListLoader: true,
  chatList: null,
  chatListLoader: null,
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
    setSearchUserListLoader(state, action) {
      state.searchUserListLoader = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.getSearchUsers.pending, (state, action) => {
        state.searchUserListLoader = true;
      })
      .addCase(thunks.getSearchUsers.fulfilled, (state, action) => {
        state.searchUserList = action.payload;
        state.searchUserListLoader = false;
      })
      .addCase(thunks.getSearchUsers.rejected, (state, action) => {
        state.searchUserListLoader = false;
      })
      .addCase(thunks.getChatList.pending, (state, action) => {
        state.chatListLoader = true;
      })
      .addCase(thunks.getChatList.fulfilled, (state, action) => {
        state.chatList = action.payload;
        state.chatListLoader = false;
      })
      .addCase(thunks.getChatList.rejected, (state, action) => {
        state.chatListLoader = false;
      });
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
  setSearchUserListLoader,
} = chatReducer.actions;
export default chatReducer.reducer;
