import { useState, useCallback, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io("http://localhost:5000/");

const ChatWindow = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer.token);
  const chatLoader = useSelector((state) => state.chatReducer.chatLoader);

  // socket
  useEffect(() => {
    console.log("hi");
    socket.on("connect", () => {
      alert("Connected to socket");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

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
      ) : (
        <ChatBody />
      )}

      <ChatFooter />
    </Box>
  );
};

export default ChatWindow;
