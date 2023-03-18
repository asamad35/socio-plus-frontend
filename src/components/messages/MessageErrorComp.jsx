import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
// import { postSendMessage } from "../../thunks";

const MessageErrorComp = ({ messageObj }) => {
  // const dispatch = useDispatch();
  // const loggedUser = useSelector((state) => state.authReducer.user);
  return (
    <>
      {
        messageObj.messageStatus === "error" && (
          // (messageObj.files.length > 0 ? (
          <p className="text-white bg-red-600 px-4 rounded-full text-sm py-1 self-center  ">
            Failed
          </p>
        )
        // ) : (
        //   <ReplayOutlinedIcon
        //     sx={{ fill: "red" }}
        //     className="cursor-pointer"
        //     onClick={() => {
        //       console.log({ messageObj }, "dwwwwwwwwwwwwwwwwwww");

        //       dispatch(
        //         postSendMessage({
        //           content: messageObj.content,
        //           chatID: messageObj.chat,
        //           messageStatus: "sending",
        //           uuid: messageObj.uuid,
        //           sender: { ...loggedUser },
        //         })
        //       );
        //     }}
        //   />
        // ))
      }
    </>
  );
};

export default MessageErrorComp;
