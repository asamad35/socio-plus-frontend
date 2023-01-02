import { AnimatePresence, motion } from "framer-motion";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Badge, Box, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.chatReducer.status);
  return (
    <Box
      sx={{
        display: "flex",
        justfyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "1.5rem",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
      }}
      onClick={() => {
        dispatch(actions.setInfoDrawer(true));
      }}
    >
      <Badge
        badgeContent={""}
        sx={{ marginRight: "15px" }}
        variant={"dot"}
        color="success"
      ></Badge>
      <Typography
        variant="h1"
        sx={{
          fontSize: "26px",
          color: "#323232",
          fontWeight: "500",
          marginRight: "15px",
        }}
      >
        Elizabeth Nelson
      </Typography>

      {/* typing animation */}
      <AnimatePresence>
        {!!status && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {" "}
            {status === "typing" ? "Typing..." : "Recording..."}
          </motion.div>
        )}
      </AnimatePresence>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          marginLeft: "auto",
        }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Tooltip title="Voice Call">
            <Box
              sx={{
                backgroundColor: "#2962ff",
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
              <CallOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Tooltip title="Video Call">
            <Box
              sx={{
                backgroundColor: "#2962ff",
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
              <VideocamOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Tooltip title="Info">
            <Box
              sx={{
                backgroundColor: "#2962ff",
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
              <InfoOutlinedIcon fontSize="small" />
            </Box>
          </Tooltip>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ChatHeader;
