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

  const chatListLoader = useSelector(
    (state) => state.chatReducer.chatListLoader
  );

  const onlineUsers = useSelector((state) => state.chatReducer.onlineUsers);

  useEffect(() => {
    console.log({ onlineUsers });
    console.log({ chatList }, "aaaaaaaaaaaaaaaaaa", "11111111111");
    const updatedOnlineChatList = chatList.map((el) => {
      console.log({ chatList }, "aaaaaaaaaaaaaaaaaa", "22222222222");
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

    console.log({ selectedChat }, "88888888888888888888");

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
          // dontReloadMessages: true,
        })
      );
    console.log({ selectedChatHasOnlineUser });
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
      navigate("/login");
    }

    socket = io("https://socio-backend-gvab.onrender.com/");
    // socket = io("http://localhost:5000");
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

      // console.log({ otherOnlineUsers });
      // console.log({ chatList }, "aaaaaaaaaaaaaaaaaa", "11111111111");
      // const updatedOnlineChatList = chatList.map((el) => {
      //   console.log({ chatList }, "aaaaaaaaaaaaaaaaaa", "22222222222");
      //   if (
      //     el.users.find((chatUser) =>
      //       otherOnlineUsers.find(
      //         (onlineUser) => chatUser._id === onlineUser._id
      //       )
      //     )
      //   ) {
      //     return { ...el, active: true };
      //   } else return { ...el, active: false };
      // });

      // dispatch(actions.updateOnlineChatList(updatedOnlineChatList));

      // // update selectedChat active status because if the selectedChat gets online from offline then it must reflect in the selectedChat state.

      // //      check if the selectedChat user is present in onlineUsers array. Then conditionally update the selected chat active status

      // const selectedChatHasOnlineUser = !!selectedChat?.users?.find(
      //   (selectedChatUser) =>
      //     otherOnlineUsers.find(
      //       (otherOnlineUser) => otherOnlineUser._id === selectedChatUser._id
      //     )
      // );

      // selectedChat &&
      //   dispatch(
      //     actions.setSelectedChat({
      //       ...selectedChat,
      //       active: selectedChatHasOnlineUser,
      //     })
      //   );
      // console.log({ selectedChatHasOnlineUser });
    });
    return () => {
      socket.off("onlinUsersList");
    };
  }, []);

  return (
    <div
      {...handlers}
      className="flex rounded-r-2xl overflow-hidden justify-start flex-col items-center h-full w-full"
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
    </div>
  );
};

export default ChatWindow;
