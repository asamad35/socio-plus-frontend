import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";

const ChatBody = ({ smoothScroll, setSmoothScroll }) => {
  const allMessages = useSelector((state) => state.chatReducer.allMessages);
  const bottomRef = useRef(null);
  useEffect(() => {
    if (smoothScroll) {
      console.log("hiii upar", smoothScroll);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setSmoothScroll(false);
      }, 1000);
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [allMessages]);
  return (
    <Box className="chatBody">
      <Message />
      <div ref={bottomRef} className="bottomDiv"></div>
    </Box>
  );
};

export default React.memo(ChatBody);
// export default ChatBody;
