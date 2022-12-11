import { useState, useCallback } from "react";

import { AnimatePresence, motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { Box } from "@mui/material";

const ChatWindow = () => {
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

      <ChatFooter />
    </Box>
  );
};

export default ChatWindow;
