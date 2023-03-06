import React from "react";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { useDispatch, useSelector } from "react-redux";
import { postSendMessage } from "../../thunks";
import { CircularProgress, Tooltip } from "@mui/material";
import { downloadMedia, getFileIcon } from "../../helper";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { setImageGallery } from "../../redux/actions";

const ImageMessage = ({ messageObj }) => {
  console.log({ messageObj });
  const dispatch = useDispatch();

  function setImageGalleryArr(targetIdx) {
    const res = [];
    const filesLen = messageObj.files.length;

    messageObj.files.forEach((el, idx) => {
      if (el.isImage && idx < targetIdx) {
        res.push({
          original: el.url,
          thumbnail: el.url,
          idx,
        });
      }
    });

    messageObj.files.forEach((el, idx, arr) => {
      if (arr[filesLen - 1 - idx].isImage && targetIdx <= filesLen - 1 - idx) {
        res.unshift({
          original: arr[filesLen - 1 - idx].url,
          thumbnail: arr[filesLen - 1 - idx].url,
          idx,
        });
      }
    });

    console.log({ messageObj, res });
    dispatch(setImageGallery(res));
  }

  return (
    <div
      onClick={() => {
        console.log("aaaaaaaaaaaddddddddddddd");
        // setImageGalleryArr();
      }}
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
        {messageObj.files.map((file, idx) =>
          file.isImage ? (
            <div className="relative">
              {messageObj.sendOrReceived === "received" && (
                <Tooltip title="Download">
                  <DownloadForOfflineOutlinedIcon
                    fontSize="medium"
                    className="absolute bottom-2 right-2 bg-white rounded-full text-2xl cursor-pointer text-primary"
                    onClick={() => {
                      downloadMedia(file.url);
                    }}
                  />
                </Tooltip>
              )}
              <img
                onClick={() => {
                  setImageGalleryArr(idx);
                }}
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
                      downloadMedia(file.url);
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
        <p className="text-white bg-red-600 px-4 rounded-full text-sm py-1 self-center ">
          Failed
        </p>
      )}
      {messageObj.messageStatus === "sending" && <CircularProgress size={20} />}
    </div>
  );
};

export default ImageMessage;
