import { Badge, Box, duration, Tooltip, Typography } from "@mui/material";
import React from "react";
import Message from "../Message";

const ChatBody = () => {
  return (
    <Box className="chatBody">
      <Message />
    </Box>
  );
};

export default React.memo(ChatBody);
// export default ChatBody;
