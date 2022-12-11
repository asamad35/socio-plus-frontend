import { useState, useCallback } from "react";

import { Badge, Box, duration, Tooltip, Typography } from "@mui/material";

import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { debounce } from "../../helper";
import { AnimatePresence, motion } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
const ChatFooter = ({ typing, setTyping }) => {
  const [micStart, setMicStart] = useState(true);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [text, setText] = useState("");

  const callbackFn = useCallback((args) => {
    console.log(args);
    setTyping(false);
  }, []);
  const debounceClosure = useCallback(debounce(callbackFn, 1000), []);
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
      }}
    >
      <textarea
        onChange={(e) => {
          setText(e.target.value);
          if (typing === false) setTyping(true);
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
          style={{
            position: "absolute",
            bottom: "150%",
            right: "50%",
            boxShadow: emojiPicker
              ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              : "0 4px 8px 0 rgba(0, 0, 0, 0), 0 6px 20px 0 rgba(0, 0, 0, 0)",
            borderRadius: "1rem",
            transition: emojiPicker ? "1s all" : "0.1s all",
          }}
        >
          <motion.div
            key="emojiPickerPopup"
            variants={{
              open: {
                opacity: 1,
                scale: 1,
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                transition: {
                  delay: 0.2,
                },
              },
              closed: {
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
              onClickOutside={() => {
                if (emojiPicker) setEmojiPicker(false);
              }}
              onEmojiSelect={(e) => {
                setText(text + e.native);
                if (typing === false) setTyping(true);
                debounceClosure("abcd", "efgh");
              }}
              data={data}
              // theme="light"
              theme="light"
              navPosition="bottom"
              perLine="7"
              previewPosition="none"
            />

            {/* <EmojiPicker
          previewConfig={{ showPreview: false }}
          width="100%"
          height="100%"
        /> */}
          </motion.div>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Tooltip title="Add emoji">
            <Box
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
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Tooltip title={`Send ${micStart ? "Audio" : "Message"}`}>
            <Box
              onDoubleClick={() => {
                setMicStart(!micStart);
              }}
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
                initial={"hide"}
                animate={!micStart ? "show" : "hide"}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", translateX: "5%" }}
              >
                <SendOutlinedIcon fontSize="small" />
              </motion.div>

              <motion.div
                variants={{
                  show: { opacity: 1, scale: 1 },
                  hide: { opacity: 0, scale: 0 },
                }}
                initial={"show"}
                animate={micStart ? "show" : "hide"}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", position: "absolute" }}
              >
                <MicOutlinedIcon fontSize="small" />
              </motion.div>
            </Box>
          </Tooltip>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ChatFooter;
