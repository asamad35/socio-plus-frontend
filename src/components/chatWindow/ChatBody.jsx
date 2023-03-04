import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../Message";
import PreviewImages from "../PreviewImages";

const ChatBody = ({
  smoothScroll,
  setSmoothScroll,
  selectedFiles,
  setSelectedFiles,
}) => {
  const allMessages = useSelector((state) => state.chatReducer.allMessages);
  const bottomRef = useRef(null);
  useEffect(() => {
    if (smoothScroll) {
      console.log("hiii upar", smoothScroll);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        setSmoothScroll(false);
      }, 1000);
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [allMessages]);
  return (
    <div className="chatBody relative">
      <Message />
      <div ref={bottomRef} className="bottomDiv"></div>
      <PreviewImages
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
    </div>
  );
};

export default React.memo(ChatBody);
// export default ChatBody;
