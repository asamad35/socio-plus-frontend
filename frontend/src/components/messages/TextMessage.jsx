import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import goku from "../../assets/goku-avatar.png";

const TextMessage = ({ sendOrReceived }) => {
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
      <Typography
        sx={{
          fontSize: "1rem",
          backgroundColor: "#dcdddc",
          maxWidth: "50%",
          padding: "0.5rem",
          borderRadius: "1rem",
        }}
      >
        jdnasjdsa djqwdjk qwjdjq djqwdnjqd djqwdqd dqwd d qdidnqwd idnwqidnd
        widqndn iqwdnwqind{" "}
      </Typography>
    </Box>
  );
};

export default TextMessage;
