import { useState, useCallback, useRef, useEffect, useMemo } from "react";

import { Box, Tooltip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { debounce, getFormData, getOtherUserInfo } from "../../helper";
import { motion, AnimatePresence } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
// import AudioRecorder from "../AudioRecorder";
import AudioMessagePreview from "../AudioMessagePreview";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import useLongPress from "../../customHooks/useLongPress";
import ClickAnimation from "../ClickAnimation";
import { postSendMessage } from "../../thunks";
import ImageUploadButton from "../ImageUploadButton";
import PreviewImages from "../PreviewImages";
import FooterReplyMessage from "../sideSearch/FooterReplyMessage";

const ChatFooter = ({ socket, selectedFiles, setSelectedFiles }) => {
  const dispatch = useDispatch();
  const recordingState = useSelector(
    (state) => state.chatReducer.recordingState
  );
  const status = useSelector((state) => state.chatReducer.status);
  const showMic = useSelector((state) => state.chatReducer.showMic);
  const showKeyboard = useSelector((state) => state.chatReducer.showKeyboard);

  const [emojiPicker, setEmojiPicker] = useState(false);
  const [text, setText] = useState("");
  const [emojiButtonHover, setEmojiButtonHover] = useState(false);

  const loggedUser = useSelector((state) => state.authReducer.user);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const allMessages = useSelector((state) => state.chatReducer.allMessages);
  const replyMessage = useSelector((state) => state.chatReducer.replyMessage);

  const emojiContainer = useRef(null);

  const otherUser = useMemo(
    () => getOtherUserInfo(selectedChat?.users, loggedUser),
    [selectedChat]
  );

  useEffect(() => {
    if (!selectedChat) return;
    selectedChat && socket.emit("chatSelected", { loggedUser, selectedChat });
    dispatch(actions.setStatus(null));

    return () => {
      selectedChat && socket.emit("leaveRoom", { loggedUser, selectedChat });
    };
  }, [selectedChat]);

  useEffect(() => {
    // update chats
    socket.on("updateMessages", (message) => {
      console.log("updating messages", { message });
      if (message.selectedChat._id === selectedChat._id)
        dispatch(actions.pushSendMessage({ ...message, received: true }));
    });
    return () => {
      socket.off("updateMessages");
    };
  }, [allMessages]);

  useEffect(() => {
    // update chats

    socket.on("updateLatestMessage", (message) => {
      if (message._id === selectedChat?._id) return;

      dispatch(actions.prependInChatList(message));
    });
    return () => {
      socket.off("updateLatestMessage");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("userIsTyping", () => {
      console.log("user typing : started");
      dispatch(actions.setStatus("typing"));
    });
    socket.on("userStoppedTyping", () => {
      console.log("user typing : stopped");
      dispatch(actions.setStatus(null));
    });
    return () => {
      socket.off("userIsTyping");
      socket.off("userStoppedTyping");
    };
  });

  const callbackFn = useCallback((args) => {
    args[1].emit("stoppedTyping", args[0]);
    dispatch(actions.setStatus(null));
  }, []);
  const debounceClosure = useCallback(debounce(callbackFn, 1000), []);

  ////////////////////////////////////////////////////// long press code starts
  const onLongPress = () => {
    if (!showMic) {
      dispatch(actions?.setShowKeyboard(true));
      dispatch(actions.setShowMic(true));
    }
  };

  const onClick = () => {
    if (text.trim() === "" && selectedFiles.length === 0) return;
    const uuid = uuidv4();
    const content = text.trim();
    const fileArray = selectedFiles.map((el) => {
      if (el.file.type.includes("image")) {
        return {
          url: URL.createObjectURL(el.file),
          isImage: true,
          name: el.file.name,
          uuid: el.uuid,
        };
      } else {
        return {
          name: el.file.name,
          url: false,
          isImage: false,
          uuid: el.uuid,
        };
      }
    });

    let payload = { content, chatID: selectedChat._id, uuid };
    if (selectedFiles.length) {
      payload = getFormData(
        {
          content,
          chatID: selectedChat._id,
          uuids: selectedFiles.map((el) => el.uuid),
          uuid,
        },
        selectedFiles,
        "filesToUpload"
      );
    }
    dispatch(
      postSendMessage({
        payload,
        socket,
        sender: { ...loggedUser },
        otherUserId: otherUser._id,
        selectedChat,
      })
    );
    dispatch(
      actions.pushSendMessage({
        chat: selectedChat._id,
        content,
        sender: { ...loggedUser },
        messageStatus: "sending",
        otherUserId: otherUser._id,
        files: fileArray,
        uuid,
      })
    );
    setText("");
    setSelectedFiles([]);

    if (payload instanceof FormData) return;

    socket.emit("newMessage", {
      chat: selectedChat._id,
      content,
      sender: { ...loggedUser },
      otherUserId: otherUser._id,
      selectedChat,
      files: [],
    });
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  ////////////////////////////////////////////////////// long press code ends

  return (
    <div
      className="bg-[#dcdddc] w-full flex justify-start items-center relative mt-auto "
      style={{ boxShadow: "0px 1px 7px rgb(50 50 50 / 56%)" }}
    >
      <PreviewImages
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      <div className="flex flex-col items-start w-[70%] ml-6">
        <AnimatePresence>
          {replyMessage?.uuid && <FooterReplyMessage />}
        </AnimatePresence>
        {!showKeyboard && <AudioMessagePreview />}
        {showKeyboard && (
          <textarea
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                onClick();
                return;
              }
              if (e.key === "Enter" && e.shiftKey) {
                setText(e.target.value);
              }
            }}
            onChange={(e) => {
              if (!selectedChat || e.target.value.toString() == "\n") return;
              setText(e.target.value);
              // if (status === null) {
              selectedChat && socket.emit("typing", selectedChat);
              // }
              debounceClosure(selectedChat, socket);
            }}
            value={text}
            id="textbox"
            className="outline-0 border-0 bg-inherit text-base resize-none h-16 my-2 w-full"
            placeholder="Type your message here..."
          />
        )}
      </div>
      <div
        className="flex relative justify-center items-center gap-2 mt-0 mr-4 mb-0 ml-auto"
        sx={{
          margin: "0 1rem 0 auto",
        }}
      >
        <div
          ref={emojiContainer}
          style={{
            position: "absolute",
            bottom: "150%",
            right: "50%",
            boxShadow: emojiPicker
              ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              : "0 4px 8px 0 rgba(0, 0, 0, 0), 0 6px 20px 0 rgba(0, 0, 0, 0)",
            borderRadius: "1rem",
            transition: emojiPicker ? "1s all" : "0.1s all",
            zIndex: -10,
          }}
        >
          <motion.div
            key="emojiPickerPopup"
            variants={{
              open: {
                opacity: 1,
                scale: 1,
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                pointerEvents: "all",
                transition: {
                  delay: 0.2,
                },
              },
              closed: {
                pointerEvents: "none",
                opacity: 0.7,
                scale: 1,
                clipPath: "inset(100% 0% 0% 100% round 10px)",
              },
            }}
            initial={false}
            animate={emojiPicker ? "open" : "closed"}
            transition={{ duration: 0.3 }}
          >
            <Picker
              onClickOutside={(e) => {
                if (emojiPicker) {
                  setEmojiPicker(false);
                }
              }}
              onEmojiSelect={(e) => {
                if (!selectedChat) return;

                setText(text + e.native);
                if (status === null)
                  selectedChat && socket.emit("typing", selectedChat);
                debounceClosure("abcd", "efgh");
              }}
              data={data}
              // theme="light"
              theme="light"
              navPosition="bottom"
              perLine="7"
              previewPosition="none"
            />
          </motion.div>
        </div>
        <ClickAnimation className="hidden md:block">
          <Tooltip title="Add emoji">
            <Box
              onMouseEnter={() => {
                setEmojiButtonHover(true);
                emojiContainer.current.style.zIndex = 10;
              }}
              onMouseLeave={() => {
                setEmojiButtonHover(false);
                if (emojiPicker) return;
                emojiContainer.current.style.zIndex = -10;
              }}
              onClick={() => {
                setEmojiPicker(!emojiPicker);
              }}
              sx={{
                backgroundColor: "#848584",
                borderRadius: "2rem",
                height: "30px",
                width: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
              }}
            >
              <EmojiEmotionsOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>
        </ClickAnimation>

        <ImageUploadButton
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />

        <ClickAnimation>
          <Tooltip
            title={`${
              showMic
                ? recordingState
                  ? "Stop Recording"
                  : "Start Recording"
                : "Send Message"
            }`}
          >
            <Box
              {...longPressEvent}
              sx={{
                backgroundColor: "#2962ff",
                borderRadius: "2rem",
                height: "35px",
                width: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <motion.div
                variants={{
                  show: { opacity: 1, scale: 1 },
                  hide: { opacity: 0, scale: 0 },
                }}
                initial={"show"}
                animate={!showMic ? "show" : "hide"}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", translateX: "5%" }}
              >
                <SendOutlinedIcon fontSize="small" />
              </motion.div>

              {/* <AudioRecorder /> */}
            </Box>
          </Tooltip>
        </ClickAnimation>
      </div>
    </div>
  );
};

export default ChatFooter;
