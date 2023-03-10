import { createSlice, current } from "@reduxjs/toolkit";
import * as thunks from "../../thunks";
import sentAudio from "../../assets/sent-sound.mp3";
import audioReceived from "../../assets/received-sound.mp3";
import { showMessagePic } from "../../helper";
import { getAllMessages } from "../../thunks";

const messageSentAudio = new Audio(sentAudio);
const messageReceivedAudio = new Audio(audioReceived);

const getMessageIdxByUUID = (state, payload) => {
  const payloadUuid =
    payload instanceof FormData ? payload.get("uuid") : payload.uuid;

  return state.allMessages.findIndex((el) => el.uuid === payloadUuid);
};

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
  chatLoader: false,
  onlineUsers: [],
  imageGallery: [],
  replyMessage: { content: "", id: "", image: false },
};
const chatReducer = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {
    resetChatReducer: () => initialState,

    setReplyMessage(state, action) {
      state.replyMessage = action.payload;
    },

    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setImageGallery(state, action) {
      state.imageGallery = action.payload;
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

      // updating unread messages to 0
      const chatIdx = state.chatList.findIndex(
        (el) => el._id === state.selectedChat?._id
      );

      if (chatIdx !== -1) {
        state.chatList[chatIdx].unreadCount = 0;
      }
    },
    pushSendMessage(state, action) {
      // update message list
      if (state.allMessages.length === 0) {
        state.allMessages.push({ ...action.payload, showPic: true });
      } else {
        const lastMssgSenderId =
          state.allMessages[state.allMessages.length - 1].sender._id;

        const newMssgSenderId = action.payload.sender._id;

        if (lastMssgSenderId === newMssgSenderId) {
          state.allMessages[state.allMessages.length - 1].showPic = false;
        }

        state.allMessages.push({ ...action.payload, showPic: true });
      }
      // sound effect
      if (action.payload.received) {
        console.log("received sound played");
        messageReceivedAudio.play();
      }

      // update chat latest message
      state.chatList = state.chatList.map((el) => {
        if (el._id === action.payload.chat) {
          return {
            ...el,
            latestMessage: action.payload,
          };
        } else {
          return el;
        }
      });

      // move the chatList el to the top
      const chatIdx = state.chatList.findIndex(
        (el) => el._id === state.selectedChat._id
      );
      console.log({ chatIdx });
      if (chatIdx === 0) return;
      const chatListEl = state.chatList.splice(chatIdx, 1);
      state.chatList.unshift(chatListEl[0]);
    },
    updateOnlineChatList(state, action) {
      state.chatList = action.payload;
    },
    prependInChatList(state, action) {
      const chatListEl = action.payload;

      const chatIdx = state.chatList.findIndex(
        (el) => el._id === chatListEl._id
      );

      if (chatIdx === -1) {
        state.chatList.unshift(chatListEl);
      } else {
        state.chatList.splice(chatIdx, 1);
        state.chatList.unshift(chatListEl);
      }
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
        state.allMessages = showMessagePic(action.payload);
        state.chatLoader = false;
      })
      .addCase(thunks.getAllMessages.rejected, (state, action) => {
        state.chatLoader = false;
      })
      .addCase(thunks.postSendMessage.pending, (state, action) => {
        const payload = action.meta.arg.payload;
        const messageIdx = getMessageIdxByUUID(state, payload);
        const targetMssg = state.allMessages[messageIdx];
        if (targetMssg) targetMssg.messageStatus = "sending";
      })
      .addCase(thunks.postSendMessage.fulfilled, (state, action) => {
        const payload = action.meta.arg.payload;
        const messageIdx = getMessageIdxByUUID(state, payload);
        state.allMessages[messageIdx].messageStatus = "successful";

        const isPayloadFormData = payload instanceof FormData;

        if (isPayloadFormData) {
          const socket = action.meta.arg.socket;
          const socketPayload = {
            chat: action.payload.chat,
            content: action.payload.content,
            sender: action.meta.arg.sender,
            otherUserId: action.meta.arg.otherUserId,
            selectedChat: action.meta.arg.selectedChat,
            files: action.payload.files,
            replyMessage: action.payload.replyMessage,
          };
          console.log(socketPayload, "zzzzzzzzzzzzzz");

          socket.emit("newMessage", socketPayload);
        }

        messageSentAudio.play();
      })
      .addCase(thunks.postSendMessage.rejected, (state, action) => {
        const payload = action.meta.arg.payload;
        const messageIdx = getMessageIdxByUUID(state, payload);
        state.allMessages[messageIdx].messageStatus = "error";
      })
      .addCase(thunks.postAccessChat.pending, (state, action) => {
        state.chatLoader = true;
      })
      .addCase(thunks.postAccessChat.fulfilled, (state, action) => {
        const chatExist = state.chatList.find(
          (el) => el._id === action.payload._id
        );

        if (!chatExist) {
          const isOtherUserActive = !!state.onlineUsers.find((onlineUser) =>
            action.payload.users.find(
              (chatUser) => chatUser._id === onlineUser._id
            )
          );
          const chatListEl = {
            ...action.payload,
            active: isOtherUserActive,
          };
          state.chatList.unshift(chatListEl);
          state.selectedChat = chatListEl;
        } else {
          state.selectedChat = chatExist;
        }

        const { setSearchList } = action.meta.arg;
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
  setImageGallery,
  setSelectedChat,
  pushSendMessage,
  updateOnlineChatList,
  prependInChatList,
  setOnlineUsers,
  setReplyMessage,
  resetChatReducer,
} = chatReducer.actions;
export default chatReducer.reducer;
