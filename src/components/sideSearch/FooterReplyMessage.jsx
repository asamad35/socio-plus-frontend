import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { setReplyMessage } from "../../redux/actions";
import { motion } from "framer-motion";
import { getFileIcon } from "../../helper";

const FooterReplyMessage = () => {
  const replyMessage = useSelector((state) => state.chatReducer.replyMessage);
  console.log({ replyMessage });
  const dispatch = useDispatch();

  function getText() {
    return (
      <p className=" text-sm text-white break-all">{replyMessage?.content}</p>
    );
  }
  console.log(replyMessage?.image, "dwdwwdwdwd");
  function getImage() {
    console.log("dwdwwdwdwd");
    return (
      <img
        src={replyMessage?.imageUrl}
        className="h-[100px] w-[100px] object-cover object-top rounded-2xl"
      />
    );
  }

  function getDoc() {
    return (
      <div className="flex gap-4 items-center">
        <img
          src={getFileIcon(replyMessage?.docName)}
          className="h-[100px] w-[100px] object-cover object-top rounded-2xl"
        />
        <p className="text-white break-all">{replyMessage?.docName}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className=" min-w-[100px] justify-between mt-3 p-2 gap-2 relative bg-primary  flex rounded-2xl "
    >
      {replyMessage?.content && getText()}
      {replyMessage?.image && getImage()}
      {replyMessage?.docName && getDoc()}
      <div
        className="cursor-pointer"
        onClick={() =>
          dispatch(
            setReplyMessage({
              uuid: "",
              content: replyMessage.content,
              image: false,
            })
          )
        }
      >
        <HighlightOffIcon
          className="text-primary -top-2 bg-white rounded-full "
          fontSize="small"
        />
      </div>
    </motion.div>
  );
};

export default FooterReplyMessage;
