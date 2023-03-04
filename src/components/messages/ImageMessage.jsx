import React from "react";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { useDispatch, useSelector } from "react-redux";
import { postSendMessage } from "../../thunks";
import { CircularProgress } from "@mui/material";

const ImageMessage = ({ messageObj }) => {
  return (
    <div
      className={`flex gap-2 m-4 items-end ${
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
      <div className=" flex flex-col items-end gap-1">
        {messageObj.files.map((file) => (
          <img
            className="rounded-lg object-contain w-[200px] h-[200px] cursor-pointer bg-secondary border-4 rounded-lg border-primary sm:w-[250px] sm:h-[250px]  "
            src={file.url}
            alt=""
          />
        ))}
        <p className="text-base p-2 rounded-2xl break-words w-fit bg-[#dcdddc] max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
          {messageObj.content ?? " no text"}
        </p>
      </div>
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

export default ImageMessage;
