import { useState, useEffect, useContext, useRef } from "react";
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
import InfoDrawer from "../InfoDrawer";
import { AnimatePresence } from "framer-motion";
import Calling from "./Calling";

var socket = null;
const ChatWindow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const loggedUser = useSelector((state) => state.authReducer.user);
  const chatLoader = useSelector((state) => state.chatReducer.chatLoader);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const sideSearch = useSelector((state) => state.authReducer.sideSearch);
  const chatList = useSelector((state) => state.chatReducer.chatList);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const inCall = useSelector((state) => state.chatReducer.inCall);

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
    onSwipedLeft: () => {
      sideSearch && dispatch(actions.setSideSearch(false));
    },
    onSwipedRight: () => dispatch(actions.setInfoDrawer(false)),

    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // socket
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
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
    dispatch(actions.setReplyMessage({}));
    dispatch(actions.setInCall(false));

    socket.on("onlineUsersList", (onlineUsers) => {
      const otherOnlineUsers = onlineUsers.filter(
        (el) => el._id !== loggedUser._id
      );

      dispatch(actions.setOnlineUsers(otherOnlineUsers));
    });
    return () => {
      socket.off("onlineUsersList");
    };
  }, []);

  return (
    <div
      onClick={() => {
        sideSearch && dispatch(actions.setSideSearch(false));
      }}
      {...handlers}
      className="flex relative md:rounded-r-2xl overflow-hidden justify-start flex-col items-center h-full w-full"
    >
      <ImageSlides />
      {socket && (
        <>
          <ChatHeader socket={socket} />
          {chatLoader ? (
            <div className="chat-loader">
              <CircularProgress size={130} />
            </div>
          ) : (
            <div className=" w-full h-full overflow-hidden z-10 relative ">
              <AnimatePresence>
                {inCall && <Calling socket={socket} />}
              </AnimatePresence>
              {selectedChat ? (
                <ChatBody selectedFiles={selectedFiles} socket={socket} />
              ) : (
                <div></div>
              )}
            </div>
          )}

          {selectedChat && (
            <ChatFooter
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              socket={socket}
            />
          )}
        </>
      )}

      <InfoDrawer />
    </div>
  );
};

export default ChatWindow;
