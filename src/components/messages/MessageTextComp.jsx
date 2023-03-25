import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setReplyMessage } from "../../redux/actions";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getFullName, isInViewport } from "../../helper";
import ReplyMessageAttachment from "./ReplyMessageAttachment";
import { CircularProgress } from "@mui/material";
import MessageErrorComp from "./MessageErrorComp";

const MessageTextComp = ({ messageObj }) => {
  const dispatch = useDispatch();
  const [dragStartCoords, setDragStartCoords] = useState(0);
  const [replyIcon, setReplyIcon] = useState(false);
  // const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const loggedUser = useSelector((state) => state.authReducer.user);

  console.log(messageObj.content, "MessageTextComp is rendering");

  return (
    <div
      id={messageObj.uuid}
      className="transition-all duration-700  rounded-2xl w-full -m-2 p-2"
    >
      <motion.div
        drag="x"
        onDragStart={(event, info) => {
          setReplyIcon(true);
          setDragStartCoords(info.point.x);
        }}
        onDragEnd={(event, info) => {
          setReplyIcon(false);

          if (info.point.x === 0) return;
          if (Math.abs(Math.round(dragStartCoords - info.point.x)) >= 50) {
            dispatch(
              setReplyMessage({
                uuid: messageObj.uuid,
                content: messageObj.content,
                image: false,
                senderName:
                  messageObj.sendOrReceived === "received"
                    ? getFullName(messageObj.sender)
                    : getFullName(loggedUser),
                isBottomDivVisible: isInViewport("bottomDiv"),
              })
            );
          }
        }}
        dragConstraints={{ left: 0, right: 0 }}
        style={{ touchAction: "none" }}
        className={`flex gap-2 items-center ${
          messageObj.sendOrReceived === "received"
            ? "flex-row"
            : "flex-row-reverse"
        }`}
      >
        {!!messageObj.content && (
          <div
            className={`flex flex-col rounded-2xl ${
              messageObj.sendOrReceived === "received"
                ? "items-start bg-[#dcdddc]"
                : "items-end  bg-primary"
            }`}
          >
            {messageObj.replyMessage?.uuid && (
              <ReplyMessageAttachment messageObj={messageObj} />
            )}
            <p
              className={` ${
                messageObj.sendOrReceived === "received"
                  ? ""
                  : "bg-primary text-white"
              } text-base p-2 whitespace-pre-wrap cursor-pointer rounded-2xl break-words w-fit bg-[#dcdddc] max-w-[200px] sm:max-w-[250px] md:max-w-[300px]`}
            >
              {messageObj.content}
            </p>
          </div>
        )}
        {/* {messageObj.messageStatus === "sending" &&
          messageObj.files.length === 0 && <CircularProgress size={20} />} */}
        {messageObj.files.length === 0 && (
          <MessageErrorComp messageObj={messageObj} />
        )}

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
      </motion.div>
    </div>
  );
};

export default MessageTextComp;
