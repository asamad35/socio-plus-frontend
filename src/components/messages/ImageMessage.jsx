import React from "react";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { useDispatch, useSelector } from "react-redux";
import { postSendMessage } from "../../thunks";
import { CircularProgress, Tooltip } from "@mui/material";
import { downloadMedia, getFileIcon } from "../../helper";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
const ImageMessage = ({ messageObj }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`flex gap-2 m-4 items-end ${
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
      <div
        className={`flex flex-col ${
          messageObj.sendOrReceived === "received" ? "items-start" : "items-end"
        }  gap-1`}
      >
        {messageObj.files.map((file) =>
          file.isImage ? (
            <div className="relative">
              {messageObj.sendOrReceived === "received" && (
                <Tooltip title="Download">
                  <DownloadForOfflineOutlinedIcon
                    fontSize="medium"
                    className="absolute bottom-2 right-2 bg-white rounded-full text-2xl cursor-pointer text-primary"
                    onClick={(e) => {
                      console.log("hiiiiiiii");
                      downloadMedia(e, file.url);
                    }}
                  />
                </Tooltip>
              )}
              <img
                className="rounded-lg object-cover object-top w-[200px] min-h-[100px] h-fit max-h-[200px] cursor-pointer bg-secondary border-4 rounded-lg border-primary sm:w-[250px] sm:max-h-[250px]  "
                src={file.url}
                alt={file.name}
              />
            </div>
          ) : (
            <div className="rounded-lg relative p-4 break-words flex justify-center items-center gap-4 w-[200px] h-[100px] cursor-pointer bg-secondary border-4 rounded-lg border-primary sm:w-[250px]   ">
              {messageObj.sendOrReceived === "received" && (
                <Tooltip title="Download">
                  <DownloadForOfflineOutlinedIcon
                    fontSize="medium"
                    className="absolute bottom-2 right-2 bg-white rounded-full text-2xl cursor-pointer text-primary"
                    onClick={() => {
                      console.log("hiiiiiiii", file.url);
                      downloadMedia(e, file.url);
                    }}
                  />
                </Tooltip>
              )}

              <img
                src={getFileIcon(file.name)}
                alt="fileIcon"
                className=" w-[50px]"
              />

              <div className="break-all">{file.name}</div>
              {console.log({ file }, "hhhhhhhhhhhhhh")}
            </div>
          )
        )}
        {!!messageObj.content && (
          <p
            className={` ${
              messageObj.sendOrReceived === "received"
                ? ""
                : "bg-primary text-white"
            } text-base p-2 whitespace-pre-wrap rounded-2xl break-words w-fit bg-[#dcdddc] max-w-[200px] sm:max-w-[250px] md:max-w-[300px]`}
          >
            {messageObj.content}
          </p>
        )}
      </div>
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
    </div>
  );
};

export default ImageMessage;
