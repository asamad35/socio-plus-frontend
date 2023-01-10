import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import goku from "../assets/goku-avatar.png";
import AudioComponent from "./AudioComponent";
import TextMessage from "./messages/TextMessage";
import AudioMessage from "./messages/AudioMessage";
// import store from "../redux/store";

// console.log(store.getState(), "hhhhhhhhhhhhh");
const Message = () => {
  function createMessage() {
    return (
      <>
        <TextMessage sendOrReceived={"received"} />
        <AudioMessage sendOrReceived={"send"} />
        <TextMessage sendOrReceived={"send"} />
        <AudioMessage sendOrReceived={"received"} />

        <Typography
          sx={{
            fontSize: "14px",
            margin: "auto",
            color: "#fff",
            backgroundColor: "#2962ff",
            width: "fit-content",
            padding: "0.2rem 0.8rem",
            borderRadius: "1rem",
          }}
        >
          {" "}
          19 November 2022
        </Typography>
      </>
    );
  }

  return createMessage();
};

export default Message;
