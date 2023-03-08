import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import goku from "../assets/goku-avatar.png";
import AudioComponent from "./AudioComponent";
import TextMessage from "./messages/TextMessage";
import AudioMessage from "./messages/AudioMessage";
import { useSelector } from "react-redux";
import Message from "./messages/Message";

const AllMessages = () => {
  const allMessages = useSelector((state) => state.chatReducer.allMessages);
  const loggedUser = useSelector((state) => state.authReducer.user);

  function getMessageUserInfo(message, loggedUser) {
    return {
      ...message,
      sendOrReceived:
        message.sender._id === loggedUser._id ? "send" : "received",
    };
  }

  // <>

  //    <AudioMessage sendOrReceived={"send"} />

  //   <TextMessage sendOrReceived={"send"} />
  //   <AudioMessage sendOrReceived={"received"} />
  //   <Typography
  //     sx={{
  //       fontSize: "14px",
  //       margin: "auto",
  //       color: "#fff",
  //       backgroundColor: "#2962ff",
  //       width: "fit-content",
  //       padding: "0.2rem 0.8rem",
  //       borderRadius: "1rem",
  //     }}
  //   >
  //     {" "}
  //     19 November 2022
  //   </Typography>
  // </>

  return allMessages.map((message) => (
    <Message messageObj={getMessageUserInfo(message, loggedUser)} />
  ));
};

export default AllMessages;
