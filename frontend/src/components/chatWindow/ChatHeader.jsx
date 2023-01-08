import { AnimatePresence, motion } from "framer-motion";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Badge, Box, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useState } from "react";
import { useEffect } from "react";
import ClickAnimation from "../ClickAnimation";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  // hide menu on outside click
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu-parent")) {
        setMenuOpen(false);
      }
    });
  }, []);

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
        <ClickAnimation>
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
        </ClickAnimation>

        <ClickAnimation>
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
        </ClickAnimation>

        <ClickAnimation
          onClick={() => {
            dispatch(actions.setIsUserProfile(false));
            dispatch(actions.setInfoDrawer(true));
          }}
        >
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
        </ClickAnimation>

        <div className="menu-parent">
          <ClickAnimation
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            <Tooltip title="Menu">
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
                  position: "relative",
                }}
              >
                <MoreVertIcon fontSize="small" />
              </Box>
            </Tooltip>
          </ClickAnimation>
          <div className={`menu ${menuOpen ? "active" : ""}`}>
            <p
              onClick={() => {
                dispatch(actions.setIsUserProfile(true));
                dispatch(actions.setInfoDrawer(true));
                setMenuOpen(false);
              }}
              className="menu-items"
            >
              Profile
            </p>
            <p
              onClick={() => {
                dispatch(actions.logout());
              }}
              className="menu-items"
            >
              Logout
            </p>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ChatHeader;
