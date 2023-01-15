import { useState, useCallback, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ChatWindow = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.authReducer.token);

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
        width: "100%",
      }}
    >
      <ChatHeader />

      <ChatBody />
      {/* <div className="chat-loader">
        <CircularProgress size={150} />
      </div> */}
      <ChatFooter />
    </Box>
  );
};

export default ChatWindow;
