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
  chatList: [],
  chatListLoader: null,
  selectedChat: null,
  allMessages: [],
  chatLoader: false
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
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    pushSendMessage(state, action) {
      state.allMessages.push(action.payload);
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
      })
      .addCase(thunks.getAllMessages.pending, (state, action) => {
        state.chatLoader = true;
      })
      .addCase(thunks.getAllMessages.fulfilled, (state, action) => {
        state.allMessages = action.payload;
        state.chatLoader = false;
      })
      .addCase(thunks.getAllMessages.rejected, (state, action) => {
        state.chatLoader = false;
      })
      .addCase(thunks.postSendMessage.pending, (state, action) => {
        const payload = action.meta.arg;
        const messageIdx = state.allMessages.findIndex(
          (el) => el.uuid === payload.uuid
        );
        const targetMssg = state.allMessages[messageIdx];
        if (targetMssg) targetMssg.messageStatus = "sending";
      })
      .addCase(thunks.postSendMessage.fulfilled, (state, action) => {
        const payload = action.meta.arg;
        const messageIdx = state.allMessages.findIndex(
          (el) => el.uuid === payload.uuid
        );
        state.allMessages[messageIdx].messageStatus = "successful";
      })
      .addCase(thunks.postSendMessage.rejected, (state, action) => {
        const payload = action.meta.arg;
        const messageIdx = state.allMessages.findIndex(
          (el) => el.uuid === payload.uuid
        );
        state.allMessages[messageIdx].messageStatus = "error";
      })
      .addCase(thunks.postAccessChat.pending, (state, action) => {})
      .addCase(thunks.postAccessChat.fulfilled, (state, action) => {
        const chatExist = state.chatList.find(
          (el) => el._id === action.payload._id
        );
        if (!chatExist) {
          state.chatList.unshift(action.payload);
        }
        state.selectedChat = action.payload;

        const { document, setSearchList } = action.meta.arg;
        document.querySelector(".searchInput").firstElementChild.value = "";
        setSearchList("");
      })
      .addCase(thunks.postAccessChat.rejected, (state, action) => {});
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
  setSelectedChat,
  pushSendMessage,
} = chatReducer.actions;
export default chatReducer.reducer;
