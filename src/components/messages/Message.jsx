import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSendMessage } from "../../thunks";
import { CircularProgress } from "@mui/material";
import MessageImgComp from "../messages/MessageImgComp";
import MessageTextComp from "../messages/MessageTextComp";
import MessageErrorComp from "../messages/MessageErrorComp";
import MessageProfilePicComp from "../messages/MessageProfilePicComp";

const Message = ({ messageObj }) => {
  return (
    <div
      className={`flex gap-2 m-4 items-end ${
        messageObj.sendOrReceived === "received"
          ? "justify-start flex-row"
          : "flex-row-reverse"
      }`}
    >
      <MessageProfilePicComp messageObj={messageObj} />
      <div
        className={`flex flex-col ${
          messageObj.sendOrReceived === "received" ? "items-start" : "items-end"
        }  gap-1`}
      >
        {messageObj.files.length > 0 && (
          <MessageImgComp messageObj={messageObj} />
        )}
        <MessageTextComp messageObj={messageObj} />
        <MessageErrorComp messageObj={messageObj} />
      </div>

      {messageObj.messageStatus === "sending" && <CircularProgress size={20} />}
    </div>
  );
};

export default Message;
