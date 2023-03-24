import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { isInViewport } from "../../helper";
import AllMessages from "../AllMessage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AnimatePresence, motion } from "framer-motion";
import useOnScreen from "../../customHooks/useOnScreen";
import Calling from "./Calling";

const ChatBody = ({ selectedFiles, socket }) => {
  const allMessages = useSelector((state) => state.chatReducer.allMessages);
  const bottomRef = useRef(null);
  const replyMessage = useSelector((state) => state.chatReducer.replyMessage);
  const inCall = useSelector((state) => state.chatReducer.inCall);

  console.log("chat body is rendering");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [selectedFiles, allMessages]);

  useEffect(() => {
    if (replyMessage.isBottomDivVisible)
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [replyMessage]);

  return (
    <div className=" w-full h-full overflow-hidden z-10 relative ">
      <AnimatePresence>{inCall && <Calling socket={socket} />}</AnimatePresence>

      <AnimatePresence>
        {!useOnScreen(bottomRef) && (
          <motion.div
            onClick={() =>
              bottomRef.current?.scrollIntoView({ behavior: "auto" })
            }
            className="text-white z-50 bg-primary rounded-full w-[26px] h-[26px] justify-center items-center absolute bottom-4 right-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            <KeyboardArrowDownIcon className="translate-x-[5%]" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="chatBody">
        <AllMessages />
        <div ref={bottomRef} id="bottomDiv" className="bottomDiv h-[2px]"></div>
      </div>
    </div>
  );
};

export default ChatBody;
