import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setReplyMessage } from "../../redux/actions";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { useDispatch, useSelector } from "react-redux";
import { isInViewport } from "../../helper";

const MessageTextComp = ({ messageObj }) => {
  const dispatch = useDispatch();

  const [dragStartCoords, setDragStartCoords] = useState(0);
  const [replyIcon, setReplyIcon] = useState(false);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const loggedUser = useSelector((state) => state.authReducer.user);

  return (
    <motion.div
      drag="x"
      onDragStart={(event, info) => {
        setReplyIcon(true);
        setDragStartCoords(info.point.x);
      }}
      onDragEnd={(event, info) => {
        setReplyIcon(false);
        if (Math.abs(Math.round(dragStartCoords - info.point.x)) >= 100) {
          console.log("message reply successful");
          dispatch(
            setReplyMessage({
              uuid: messageObj.uuid,
              content: messageObj.content,
              image: false,
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
          className={` ${
            messageObj.sendOrReceived === "received"
              ? ""
              : "bg-primary text-white"
          } text-base p-2 whitespace-pre-wrap cursor-pointer rounded-2xl break-words w-fit bg-[#dcdddc] max-w-[200px] sm:max-w-[250px] md:max-w-[300px]`}
        >
          {messageObj.content}
        </div>
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
  );
};

export default MessageTextComp;
