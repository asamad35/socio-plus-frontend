import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import * as actions from "../../redux/actions/index";
import { useSwipeable } from "react-swipeable";
import { SOCKET_CONNECTION_URL } from "../../config/apiUrls";
import ImageSlides from "../ImageSlides";

var socket = null;
const ChatWindow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const loggedUser = useSelector((state) => state.authReducer.user);
  const chatLoader = useSelector((state) => state.chatReducer.chatLoader);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const chatList = useSelector((state) => state.chatReducer.chatList);
  const [smoothScroll, setSmoothScroll] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const chatListLoader = useSelector(
    (state) => state.chatReducer.chatListLoader
  );

  const onlineUsers = useSelector((state) => state.chatReducer.onlineUsers);
  useEffect(() => {
    const updatedOnlineChatList = chatList.map((el) => {
      if (
        el.users.find((chatUser) =>
          onlineUsers.find((onlineUser) => chatUser._id === onlineUser._id)
        )
      ) {
        return { ...el, active: true };
      } else return { ...el, active: false };
    });

    dispatch(actions.updateOnlineChatList(updatedOnlineChatList));

    // update selectedChat active status because if the selectedChat gets online from offline then it must reflect in the selectedChat state.

    //      check if the selectedChat user is present in onlineUsers array. Then conditionally update the selected chat active status

    const selectedChatHasOnlineUser = !!selectedChat?.users?.find(
      (selectedChatUser) =>
        onlineUsers.find(
          (otherOnlineUser) => otherOnlineUser._id === selectedChatUser._id
        )
    );

    selectedChat &&
      dispatch(
        actions.setSelectedChat({
          ...selectedChat,
          active: selectedChatHasOnlineUser,
        })
      );
  }, [chatListLoader, onlineUsers]);

  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch(actions.setSideSearch(false)),

    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // socket
  useEffect(() => {
    if (!token) {
      setSmoothScroll(true);
      navigate("/");
    }

    socket = io(SOCKET_CONNECTION_URL);
    socket.on("connect", () => {
      console.log("Connected to socket");
      socket.emit("new-user", loggedUser);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    dispatch(actions.setSelectedChat(null));

    socket.on("onlinUsersList", (onlineUsers) => {
      const otherOnlineUsers = onlineUsers.filter(
        (el) => el._id !== loggedUser._id
      );

      dispatch(actions.setOnlineUsers(otherOnlineUsers));
    });
    return () => {
      socket.off("onlinUsersList");
    };
  }, []);

  return (
    <div
      {...handlers}
      className="flex relative md:rounded-r-2xl overflow-hidden justify-start flex-col items-center h-full w-full"
    >
      <ImageSlides />
      <ChatHeader />
      {chatLoader ? (
        <div className="chat-loader">
          <CircularProgress size={130} />
        </div>
      ) : selectedChat ? (
        <ChatBody
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          smoothScroll={smoothScroll}
          setSmoothScroll={setSmoothScroll}
        />
      ) : (
        <div></div>
      )}

      {socket && (
        <ChatFooter
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          socket={socket}
        />
      )}
    </div>
  );
};

export default ChatWindow;
