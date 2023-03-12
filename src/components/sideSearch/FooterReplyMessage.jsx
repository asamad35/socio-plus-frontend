import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { setReplyMessage } from "../../redux/actions";
import { motion } from "framer-motion";
import { getFileIcon, getFullName } from "../../helper";

const FooterReplyMessage = () => {
  const replyMessage = useSelector((state) => state.chatReducer.replyMessage);
  const loggedUser = useSelector((state) => state.authReducer.user);
  console.log({ replyMessage });
  const dispatch = useDispatch();

  function getText() {
    return (
      <p className="ml-[10px] text-sm text-white break-all">
        {replyMessage?.content}
      </p>
    );
  }
  function getImage() {
    return (
      <img
        src={replyMessage?.url}
        className="h-[80px] w-[80px] ml-[5px] object-cover object-top rounded-2xl"
      />
    );
  }

  function getDoc() {
    return (
      <div className="ml-[5px]  flex gap-4 items-center">
        <img
          src={getFileIcon(replyMessage?.docName)}
          className="h-[60px] w-[60px] object-cover object-top rounded-2xl"
        />
        <p className="text-white break-all">{replyMessage?.docName}</p>
      </div>
    );
  }

  function getColour(type) {
    return replyMessage.senderName === getFullName(loggedUser)
      ? type + "-lime-700"
      : type + "-fuchsia-600";
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className=" min-w-[100px] sm:min-w-[200px] flex flex-col mt-3 p-2 relative bg-primary rounded-2xl "
    >
      <div className="flex justify-between bg-white/50 mb-2 rounded-2xl p-1 px-2 items-center gap-2">
        <div className="flex items-center gap-1">
          <p
            className={`h-[20px] w-[5px] ${
              replyMessage.senderName === getFullName(loggedUser)
                ? "bg-lime-700"
                : "bg-fuchsia-600"
            } rounded-2xl`}
          >
            {" "}
          </p>
          <p
            className={`${
              replyMessage.senderName === getFullName(loggedUser)
                ? "text-lime-700"
                : "text-fuchsia-600"
            } text-sm font-semibold`}
          >
            {replyMessage.senderName === getFullName(loggedUser)
              ? "You"
              : replyMessage.senderName}
          </p>
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            dispatch(setReplyMessage({ senderName: replyMessage.senderName }))
          }
        >
          <HighlightOffIcon
            className="text-primary -top-2 bg-white rounded-full "
            fontSize="small"
          />
        </div>
      </div>
      {replyMessage?.content && getText()}
      {replyMessage?.image && getImage()}
      {replyMessage?.docName && getDoc()}
    </motion.div>
  );
};

export default FooterReplyMessage;
