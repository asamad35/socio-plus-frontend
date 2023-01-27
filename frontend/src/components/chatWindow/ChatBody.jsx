import { Badge, Box, duration, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";

const ChatBody = () => {
  const allMessages = useSelector((state) => state.chatReducer.allMessages);
  const bottomRef = useRef(null);
  const renderRef = useRef(0);
  useEffect(() => {
    if (renderRef.current === 0) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 1000);
      renderRef.current++;
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
