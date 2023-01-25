import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { postSendMessage } from "../../thunks";
import { CircularProgress } from "@mui/material";

const TextMessage = ({
  sendOrReceived,
  content,
  profilePic,
  messageStatus,
  messageID,
}) => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const loggedUser = useSelector((state) => state.authReducer.user);

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
      <Avatar alt="Remy Sharp" src={profilePic} />
      <Typography
        sx={{
          fontSize: "1rem",
          backgroundColor: "#dcdddc",
          maxWidth: "20rem",
          padding: "0.5rem",
          borderRadius: "1rem",
          wordWrap: "break-word",
        }}
      >
        {content ?? " no text"}
      </Typography>

      {messageStatus === "error" && (
        <ReplayOutlinedIcon
          sx={{ fill: "red" }}
          onClick={() => {
            dispatch(
              postSendMessage({
                content: content,
                chatID: selectedChat._id,
                messageStatus: "sending",
                uuid: messageID,
                sender: { ...loggedUser },
              })
            );
          }}
        />
      )}
      {messageStatus === "sending" && <CircularProgress size={20} />}
    </Box>
  );
};

export default TextMessage;
