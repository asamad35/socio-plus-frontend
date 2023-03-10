import React, { useState } from "react";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { useDispatch, useSelector } from "react-redux";
import { postSendMessage } from "../../thunks";
import { CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { setReplyMessage } from "../../redux/actions";

const TextMessage = ({ messageObj }) => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const loggedUser = useSelector((state) => state.authReducer.user);
  const [replyIcon, setReplyIcon] = useState(false);
  const [dragStartCoords, setDragStartCoords] = useState(0);

  return (
    <motion.div
      drag="x"
      onDragStart={(event, info) => {
        setReplyIcon(true);
        setDragStartCoords(info.point.x);
        console.log(
          info.point.x,
          info.point.y,
          info,
          "start lllllllllllllllllll"
        );
      }}
      onDragEnd={(event, info) => {
        setReplyIcon(false);
        if (Math.abs(Math.round(dragStartCoords - info.point.x)) >= 100) {
          console.log(
            { dragStartCoords, end: info.point.x },
            "message reply successful"
          );
          dispatch(
            setReplyMessage({
              uuid: messageObj.uuid,
              content: messageObj.content,
              image: false,
              sendOrReceived: messageObj.sendOrReceived,
            })
          );
        }
        console.log(info.point.x, info.point.y, "end lllllllllllllllllll");
      }}
      dragConstraints={{ left: 0, right: 0 }}
      style={{ touchAction: "none" }}
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
      <p
        className={` ${
          messageObj.sendOrReceived === "received"
            ? ""
            : "bg-primary text-white"
        } text-base whitespace-pre-wrap p-2 cursor-pointer rounded-2xl break-words w-fit bg-[#dcdddc] max-w-[200px] sm:max-w-[250px] md:max-w-[300px]`}
      >
        {messageObj.content ?? " no text"}
      </p>
      <AnimatePresence>
        {replyIcon && (
          <motion.div
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ReplyOutlinedIcon />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="reply"></div>
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
    </motion.div>
  );
};

export default TextMessage;
