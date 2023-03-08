import React from "react";
import { useDispatch } from "react-redux";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

const MessageErrorComp = ({ messageObj }) => {
  const dispatch = useDispatch();
  return (
    <>
      {messageObj.messageStatus === "error" &&
        (messageObj.files.length > 0 ? (
          <p className="text-white bg-red-600 px-4 rounded-full text-sm py-1 self-center ">
            Failed
          </p>
        ) : (
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
        ))}
    </>
  );
};

export default MessageErrorComp;
