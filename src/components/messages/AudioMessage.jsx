import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import goku from "../../assets/goku-avatar.png";
import AudioComponent from "../AudioComponent";

const AudioMessage = ({ sendOrReceived }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1rem",
        margin: "1.5rem",
        justifyContent: ` ${sendOrReceived === "received" ? "start" : "end"} `,
        flexDirection: ` ${
          sendOrReceived === "received" ? "row" : "row-reverse"
        } `,
        alignItems: "center",
      }}
    >
      <Avatar alt="Remy Sharp" src={goku} />
      <AudioComponent />
    </Box>
  );
};

export default AudioMessage;
