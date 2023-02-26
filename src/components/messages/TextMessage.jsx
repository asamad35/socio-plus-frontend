import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { postSendMessage } from "../../thunks";
import { CircularProgress } from "@mui/material";

const TextMessage = ({ messageObj }) => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const loggedUser = useSelector((state) => state.authReducer.user);

  return (
    <div
      className={`flex gap-2 m-4 items-center ${
        messageObj.sendOrReceived === "received"
          ? "justify-start flex-row"
          : "flex-row-reverse"
      }`}
    >
      <img
        className={`rounded-full object-top object-cover w-10 h-10 ${
          messageObj.showPic ? "opacity-100" : "opacity-0"
        } `}
        src={messageObj.sender.photoUrl}
      />
      <p className="text-base p-2 rounded-2xl break-words bg-[#dcdddc] max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
        {messageObj.content ?? " no text"}
      </p>

      {messageObj.messageStatus === "error" && (
        <ReplayOutlinedIcon
          sx={{ fill: "red" }}
          onClick={() => {
            dispatch(
              postSendMessage({
                content: content,
                chatID: selectedChat._id,
                messageStatus: "sending",
                uuid: messageObj.uuid,
                sender: { ...loggedUser },
              })
            );
          }}
        />
      )}
      {messageObj.messageStatus === "sending" && <CircularProgress size={20} />}
    </div>
  );
};

export default TextMessage;
