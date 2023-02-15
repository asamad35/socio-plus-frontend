import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import * as actions from "../../redux/actions/index";

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

  // socket
  useEffect(() => {
    if (!token) {
      setSmoothScroll(true);
      navigate("/login");
    }

    socket = io("http://localhost:5000/");
    socket.on("connect", () => {
      console.log("Connected to socket");
      socket.emit("new-user", loggedUser);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    socket.on("onlinUsersList", (onlineUsers) => {
      const otherOnlineUsers = onlineUsers.filter(
        (el) => el._id !== loggedUser._id
      );
      console.log({ otherOnlineUsers });

      const updatedOnlineChatList = chatList.map((el) => {
        if (
          el.users.find((chatUser) =>
            otherOnlineUsers.find(
              (onlineUser) => chatUser._id === onlineUser._id
            )
          )
        ) {
          return { ...el, active: true };
        } else return { ...el, active: false };
      });

      dispatch(actions.updateOnlineChatList(updatedOnlineChatList));
    });
    return () => {
      socket.off("onlinUsersList");
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        width: "75%",
      }}
    >
      <ChatHeader />
      {chatLoader ? (
        <div className="chat-loader">
          <CircularProgress size={130} />
        </div>
      ) : selectedChat ? (
        <ChatBody
          smoothScroll={smoothScroll}
          setSmoothScroll={setSmoothScroll}
        />
      ) : (
        <div></div>
      )}

      {socket && <ChatFooter socket={socket} />}
    </Box>
  );
};

export default ChatWindow;
