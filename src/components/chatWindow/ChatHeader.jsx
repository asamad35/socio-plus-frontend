import { AnimatePresence, motion } from "framer-motion";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Badge, Box, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useState } from "react";
import { useEffect } from "react";
import ClickAnimation from "../ClickAnimation";
import { toast } from "react-toastify";
import { getFullName, getOtherUserInfo } from "../../helper";
import { useMemo } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useCallback } from "react";
import { styled } from "@mui/material/styles";
import { setInCall, setCallDetails } from "../../redux/actions";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallEndIcon from "@mui/icons-material/CallEnd";

const ChatHeader = ({ socket }) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const sideSearch = useSelector((state) => state.authReducer.sideSearch);
  const status = useSelector((state) => state.chatReducer.status);
  const loggedUser = useSelector((state) => state.authReducer.user);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const chatList = useSelector((state) => state.chatReducer.chatList);
  const inCall = useSelector((state) => state.chatReducer.inCall);
  const callDetails = useSelector((state) => state.chatReducer.callDetails);

  const otherUser = useMemo(
    () => getOtherUserInfo(selectedChat?.users, loggedUser),
    [selectedChat]
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const checkOtherUserActive = useCallback(() => {
    return !!chatList.find((el) => {
      return el?._id === selectedChat?._id;
    })?.active;
  }, [selectedChat, chatList]);

  useEffect(() => {
    // hide menu on outside click
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu-parent")) {
        setMenuOpen(false);
      }
    });
    console.log("registering socket");
    socket.on("callInvitation", ({ selectedChatId, from, to }) => {
      console.log("listening to invitation");
      dispatch(
        setCallDetails({
          partnerDetails: from,
          roomId: selectedChatId,
          showInvitation: true,
        })
      );
    });

    socket.on("cantConnect", ({ calledUser, message }) => {
      console.log("cant connect");
      toast.error(getFullName(calledUser) + " " + message);
      dispatch(
        setCallDetails({
          partnerDetails: null,
          roomId: null,
          showInvitation: false,
        })
      );
      dispatch(setInCall(false));
    });
    socket.on("canConnect", () => {
      console.log("hello");
      dispatch(setInCall(true));
    });
  }, [socket]);

  useEffect(() => {
    socket.on("callEnded", ({ from, to }) => {
      console.log("in call ended");
      dispatch(
        setCallDetails({
          partnerDetails: null,
          roomId: null,
          showInvitation: false,
        })
      );
      dispatch(setInCall(false));

      if (!callDetails.partnerDetails) return;
      toast(getFullName(from) + " ended the call.");
    });

    socket.on("callRejected", ({ from, to }) => {
      console.log("listening rejection");
      toast.error(getFullName(from) + " rejected the call");
      dispatch(
        setCallDetails({
          partnerDetails: null,
          roomId: null,
          showInvitation: false,
        })
      );
      dispatch(setInCall(false));
    });

    return () => {
      socket.off("callEnded");
      socket.off("callRejected");
    };
  }, [callDetails, socket]);

  return (
    <section className="flex relative w-full justify-center items-center  shadow-xl">
      <div className="flex bg-white w-full justify-center z-[100] items-center p-6 shadow-xl">
        <h2
          className="block mr-4 cursor-pointer md:hidden"
          onClick={() => {
            dispatch(actions.setSideSearch(!sideSearch));
          }}
        >
          <SearchOutlinedIcon />
        </h2>

        {checkOtherUserActive() && (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          ></StyledBadge>
        )}

        <h1
          onClick={() => {
            dispatch(actions.setIsUserProfile(false));
            dispatch(actions.setInfoDrawer(true));
          }}
          className="text-lg cursor-pointer relative leading-none font-medium text-[#333333] mx-4 md:text-2xl"
        >
          {otherUser
            ? otherUser.firstName + " " + otherUser.lastName
            : "Select a chat"}
          <AnimatePresence>
            {!!status && (
              <motion.div
                className=" absolute top-5 text-xs md:hidden"
                key="modal"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                {" "}
                {status === "typing" ? "Typing..." : "Recording..."}
              </motion.div>
            )}
          </AnimatePresence>
        </h1>

        {/* typing animation */}
        <AnimatePresence>
          {!!status && (
            <motion.div
              className="hidden md:flex"
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

        <div className="flex justify-center items-center gap-2 ml-auto md:gap-3">
          <ClickAnimation onClick={() => {}}>
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

          <ClickAnimation
            onClick={() => {
              if (!selectedChat) {
                toast.error("Select a chat");
                return;
              }
              if (!inCall) {
                dispatch(
                  setCallDetails({
                    ...callDetails,
                    partnerDetails: otherUser,
                    showInvitation: false,
                  })
                );
                socket.emit("callInvitation", {
                  selectedChatId: selectedChat._id,
                  from: loggedUser,
                  to: otherUser,
                });
              } else {
                toast.error("Already in call");
              }
            }}
          >
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
            className="hidden md:flex"
            onClick={() => {
              dispatch(actions.setIsUserProfile(false));
              dispatch(actions.setInfoDrawer(true));
            }}
          >
            <Tooltip title="Info">
              <Box className="items-center justify-center cursor-pointer bg-primary text-white rounded-full h-[30px] w-[30px] md:flex">
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
            <div className={`menu ${menuOpen ? "active" : ""} z-[100]`}>
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
                  if (inCall) {
                    toast.error("Disconnect call, then logout");
                    return;
                  }
                  dispatch(actions.setSelectedChat(null));
                  dispatch(actions.logout());
                  dispatch(actions.resetAuthReducer());
                  dispatch(actions.resetChatReducer());
                }}
                className="menu-items"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {callDetails.partnerDetails && callDetails.showInvitation && (
          <motion.div
            initial={{}}
            animate={{
              transform: "translateY(115%)",
            }}
            exit={{ transform: "translateY(0%)" }}
            transition={{ duration: 0.3 }}
            className="bg-secondary p-2 px-4 rounded-xl absolute bottom-0 cursor-pointer flex items-center justify-center z-50"
          >
            <p className="mr-4">
              Call from Abdus Samad
              {/* {getFullName(callDetails.partnerDetails)} */}
            </p>

            <ClickAnimation
              onClick={() => {
                console.log("rejection", {
                  from: loggedUser,
                  to: callDetails.partnerDetails,
                });
                socket.emit("callRejected", {
                  from: loggedUser,
                  to: callDetails.partnerDetails,
                });

                dispatch(
                  setCallDetails({
                    ...callDetails,
                    partnerDetails: null,
                    showInvitation: false,
                  })
                );
              }}
              className="bg-red-600 text-white p-[6px] inline-flex rounded-full mr-2"
            >
              <CallEndIcon fontSize="small" />
            </ClickAnimation>
            <ClickAnimation
              onClick={() => {
                console.log(
                  {
                    from: loggedUser,
                    to: callDetails.partnerDetails,
                  },
                  "kkkkkkkkkkkkkkkkk"
                );
                socket.emit("callAccepted", {
                  from: loggedUser,
                  to: callDetails.partnerDetails,
                });
                dispatch(setInCall(true));
                dispatch(
                  setCallDetails({
                    ...callDetails,
                    showInvitation: false,
                  })
                );
              }}
              className="bg-primary text-white p-[6px] inline-flex rounded-full"
            >
              <VideocamIcon fontSize="small" />
            </ClickAnimation>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ChatHeader;
