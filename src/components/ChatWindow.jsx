import React from "react";
import { Badge, Box, Tooltip, Typography } from "@mui/material";

import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import Message from "./Message";

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
      {/* title header */}
      <Box
        sx={{
          display: "flex",
          justfyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "1.5rem",

          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <Badge
          badgeContent={""}
          sx={{ marginRight: "15px" }}
          variant={"dot"}
          color="success"
        ></Badge>
        <Typography
          variant="h1"
          sx={{
            fontSize: "26px",
            color: "#323232",
            fontWeight: "500",
            marginRight: "15px",
          }}
        >
          Elizabeth Nelson
        </Typography>
        <span>Typing...</span>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            marginLeft: "auto",
          }}
        >
          <Tooltip title="Voice Call">
            <Box
              sx={{
                backgroundColor: "#2962ff",
                borderRadius: "2rem",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              <CallOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>
          <Tooltip title="Video Call">
            <Box
              sx={{
                backgroundColor: "#2962ff",
                borderRadius: "2rem",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              <VideocamOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>
        </Box>
      </Box>

      {/* messages */}

      <Box>
        <Message />
      </Box>

      {/* message input */}
      <Box
        sx={{
          backgroundColor: "#dcdddc",
          width: "100%",
          height: "4rem",
          marginTop: "auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <textarea
          id="textbox"
          style={{
            marginLeft: "1.5rem",
            width: "70%",
            outline: "none",
            border: "none",
            backgroundColor: "inherit",
            fontSize: "1rem",
            resize: "none",
          }}
          placeholder="Type your message here..."
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 1rem 0 auto",
            gap: "0.8rem",
          }}
        >
          <Tooltip title="Add emoji">
            <Box
              sx={{
                backgroundColor: "#848584",
                borderRadius: "2rem",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              <EmojiEmotionsOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>

          <Tooltip title="Add attachment">
            <Box
              sx={{
                backgroundColor: "#848584",
                borderRadius: "2rem",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              <AttachFileOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>

          <Tooltip title="Send Message">
            <Box
              sx={{
                backgroundColor: "#2962ff",
                borderRadius: "2rem",
                height: "35px",
                width: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              <SendOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWindow;
