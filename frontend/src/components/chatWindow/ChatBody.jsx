import { Badge, Box, duration, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";

const ChatBody = () => {
  const allMessages = useSelector((state) => state.chatReducer.allMessages);
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
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
