import { useState, useCallback, useRef, useEffect } from "react";

import { Box, Tooltip } from "@mui/material";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { debounce } from "../../helper";
import { motion } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import AudioRecorder from "../AudioRecorder";
import AudioMessagePreview from "../AudioMessagePreview";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import useLongPress from "../../customHooks/useLongPress";
import ClickAnimation from "../ClickAnimation";

const ChatFooter = () => {
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

  const emojiContainer = useRef(null);

  const callbackFn = useCallback((args) => {
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
    console.log("click is triggered");
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  ////////////////////////////////////////////////////// long press code ends

  return (
    <Box
      sx={{
        backgroundColor: "#dcdddc",
        width: "100%",
        minHeight: "4rem",
        marginTop: "auto",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        boxShadow: " 0px 1px 7px rgb(50 50 50 / 56%);",
      }}
    >
      {!showKeyboard && <AudioMessagePreview />}
      {showKeyboard && (
        <textarea
          onChange={(e) => {
            setText(e.target.value);
            if (status === null) dispatch(actions.setStatus("typing"));
            debounceClosure("abcd", "efgh");
          }}
          value={text}
          id="textbox"
          style={{
            marginLeft: "1.5rem",
            width: "70%",
            outline: "none",
            border: "none",
            backgroundColor: "inherit",
            fontSize: "1rem",
            resize: "none",
          }}
          placeholder="Type your message here..."
        />
      )}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 1rem 0 auto",
          gap: "0.8rem",
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
                  // setTimeout(() => {
                  //   if (!emojiButtonHover)
                  //     emojiContainer.current.style.zIndex = -10;
                  // }, 100);
                }
              }}
              onEmojiSelect={(e) => {
                setText(text + e.native);
                if (status === null) dispatch(actions.setStatus("typing"));
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
        <ClickAnimation>
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

        <ClickAnimation>
          <Tooltip title="Add attachment">
            <Box
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
              <AttachFileOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>
        </ClickAnimation>

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

              <AudioRecorder />
            </Box>
          </Tooltip>
        </ClickAnimation>
      </Box>
    </Box>
  );
};

export default ChatFooter;
