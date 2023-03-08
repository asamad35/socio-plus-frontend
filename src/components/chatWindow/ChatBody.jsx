import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { isInViewport } from "../../helper";
import AllMessages from "../AllMessage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AnimatePresence, motion } from "framer-motion";
import useOnScreen from "../../customHooks/useOnScreen";

const ChatBody = ({
  smoothScroll,
  setSmoothScroll,
  selectedFiles,
  setSelectedFiles,
}) => {
  const allMessages = useSelector((state) => state.chatReducer.allMessages);
  const bottomRef = useRef(null);
  const replyMessage = useSelector((state) => state.chatReducer.replyMessage);

  console.log(useOnScreen(bottomRef), "axxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

  useEffect(() => {
    if (smoothScroll) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setSmoothScroll(false);
      }, 1000);
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [allMessages, selectedFiles]);

  useEffect(() => {
    if (replyMessage.isBottomDivVisible)
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [replyMessage]);

  return (
    <div className=" w-full overflow-hidden relative ">
      <AnimatePresence>
        {!useOnScreen(bottomRef) && (
          <motion.div
            onClick={() =>
              bottomRef.current?.scrollIntoView({ behavior: "auto" })
            }
            className="text-white bg-primary rounded-full w-[26px] h-[26px] justify-center items-center absolute bottom-4 right-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
          >
            <KeyboardArrowDownIcon className="translate-x-[5%]" />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="chatBody"
        // onScroll={() => {
        //   if (isInViewport("bottomDiv") && scrollToBottom)
        //     setScrollToBottom(false);
        //   else if (!scrollToBottom) setScrollToBottom(true);
        // }}
      >
        <AllMessages />
        <div ref={bottomRef} id="bottomDiv" className="bottomDiv h-[2px]"></div>
      </div>
    </div>
  );
};

export default React.memo(ChatBody);
// export default ChatBody;
