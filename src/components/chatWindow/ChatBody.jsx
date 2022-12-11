import { Badge, Box, duration, Tooltip, Typography } from "@mui/material";
import Message from "../Message";

const ChatBody = () => {
  return (
    <Box style={{ overflowY: "auto" }}>
      <Message />
    </Box>
  );
};

export default ChatBody;
