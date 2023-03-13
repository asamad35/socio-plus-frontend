import React, { useState } from "react";
import {
  downloadMedia,
  getFileIcon,
  getFullName,
  isInViewport,
} from "../../helper";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { Tooltip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { setImageGallery, setReplyMessage } from "../../redux/actions/index";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

const MessageImgComp = ({ messageObj }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.authReducer.user);
  const [dragStartCoords, setDragStartCoords] = useState(null);
  const [replyIconArr, setReplyIconArr] = useState(
    Array(messageObj.files.length).fill(false)
  );
  const setImageGalleryArr = useCallback((targetIdx) => {
    const res = [];
    const filesLen = messageObj.files.length;
    console.log("setImageGalleryArr is rendering xxxxxxxxxxxxxx");

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

    dispatch(setImageGallery(res));
  }, []);

  const updateReplyIconArr = useCallback((idx, val) => {
    setReplyIconArr(
      replyIconArr.map((el, i) => {
        if (idx === i) return val;
        else return el;
      })
    );
  }, []);

  console.log("MessageImgComp is rendering xxxxxxxxxxxxxxxxx");

  return (
    <>
      {messageObj.files.map((file, idx) =>
        file.isImage ? (
          <div
            id={file.uuid}
            className="transition-all duration-700 p-2 -m-2  rounded-2xl w-full"
          >
            <motion.div
              drag="x"
              onMouseDown={(event, info) => {
                console.log(event.pageX, "start", "dddddddd");
                setDragStartCoords(event.pageX);
              }}
              onDragEnd={(event, info) => {
                updateReplyIconArr(idx, false);
                console.log(info.point.x, "end", "dddddd");

                if (
                  Math.abs(Math.round(dragStartCoords - info.point.x)) >= 100
                ) {
                  console.log("message reply successful");
                  dispatch(
                    setReplyMessage({
                      uuid: file.uuid,
                      url: file.url.startsWith("blob:")
                        ? file.serverImageUrl
                        : file.url,
                      parentUuid: messageObj.uuid,
                      image: true,
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
              className={`flex gap-2 items-center cursor-pointer relative ${
                messageObj.sendOrReceived === "received"
                  ? "flex-row"
                  : "flex-row-reverse"
              }`}
            >
              <div
                onClick={(event) => {
                  // if below condition true then only trigger click event
                  if (event.pageX - dragStartCoords === 0) {
                    setImageGalleryArr(idx);
                  }
                }}
                className="relative"
              >
                {messageObj.sendOrReceived === "received" && (
                  <Tooltip title="Download">
                    <DownloadForOfflineOutlinedIcon
                      fontSize="medium"
                      className="absolute bottom-2 right-2 bg-white rounded-full text-2xl cursor-pointer text-primary"
                      onClick={(e) => {
                        downloadMedia(file.url);
                        console.log("downloadddddd");
                        e.stopPropagation();
                      }}
                    />
                  </Tooltip>
                )}
                <img
                  className="pointer-events-none rounded-lg object-cover object-top w-[200px] min-h-[100px] h-fit max-h-[200px] bg-secondary border-4 rounded-lg border-primary sm:w-[250px] sm:max-h-[250px]  "
                  src={file.url}
                  alt={file.name}
                />
              </div>
              <AnimatePresence>
                {replyIconArr[idx] && (
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
        ) : (
          <div
            id={file.uuid}
            className="transition-all duration-700 p-2 -m-2 rounded-2xl w-full"
          >
            <motion.div
              drag="x"
              onDragStart={(event, info) => {
                updateReplyIconArr(idx, true);
                setDragStartCoords(info.point.x);
              }}
              onDragEnd={(event, info) => {
                updateReplyIconArr(idx, false);
                if (info.point.x === 0) return;

                if (
                  Math.abs(Math.round(dragStartCoords - info.point.x)) >= 100
                ) {
                  console.log("message reply successful");
                  dispatch(
                    setReplyMessage({
                      uuid: file.uuid,
                      parentUuid: messageObj.uuid,
                      docName: file.name,
                      image: false,
                      sendOrReceived: messageObj.sendOrReceived,
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
              className={`flex gap-2 items-center cursor-pointer ${
                messageObj.sendOrReceived === "received"
                  ? "flex-row"
                  : "flex-row-reverse"
              }`}
            >
              <div>
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
                    className="pointer-events-none w-[50px]"
                  />

                  <div className="break-all overflow-y-auto h-full">
                    {file.name}
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {replyIconArr[idx] && (
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
        )
      )}
    </>
  );
};

export default MessageImgComp;
