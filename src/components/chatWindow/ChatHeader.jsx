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
import { getFullName, getOtherUserInfo, getOwnVideoAudio } from "../../helper";
import { useMemo } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useCallback } from "react";
import { styled } from "@mui/material/styles";
import Peer from "simple-peer";

const ChatHeader = ({
  myVideoRef,
  partnerVideoRef,
  myStream,
  setMyStream,
  setCallingScreen,
  callingScreen,
  socket,
}) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const sideSearch = useSelector((state) => state.authReducer.sideSearch);
  const status = useSelector((state) => state.chatReducer.status);
  const loggedUser = useSelector((state) => state.authReducer.user);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const chatList = useSelector((state) => state.chatReducer.chatList);

  // calling states
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [callerDetails, setCallerDetails] = useState({});

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

  // initialise peer
  const peer = useMemo(() => {
    return new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });
  }, []);

  useEffect(() => {
    // hide menu on outside click
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu-parent")) {
        setMenuOpen(false);
      }
    });

    peer.addEventListener("track", (e) => {
      console.log("listening to stream");
      const streams = e.streams;
      // console.log(streams, streams[0], "llllllllllllllllmmmmmm");
      if (partnerVideoRef.current)
        partnerVideoRef.current.srcObject = streams[0];
    });

    socket.on("incomingOffer", handleIncomingOffer);
    socket.on("incomingNegotiationOffer", (data) => {
      setCallerDetails(data);
      acceptOffer(data);
    });
    socket.on("offerAccepted", handleOfferAccepted);
  }, []);

  useEffect(() => {
    peer.addEventListener("negotiationneeded", callUserNegotiation);
    return () => {
      peer.removeEventListener("negotiationneeded", callUserNegotiation);
    };
  }, [otherUser]);

  //-  webrtc part start

  // define offer
  const callUser = useCallback(async () => {
    // create offer
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    //  send offer to another user via socket
    socket.emit("callUser", { userToCall: otherUser, offer, from: loggedUser });
  }, [otherUser, loggedUser]);

  // call user negotiation
  const callUserNegotiation = useCallback(async () => {
    const offer = peer.localDescription;
    // const offer = await peer.createOffer();

    console.log(
      {
        userToCall: otherUser,
        offer,
        from: loggedUser,
      },
      "xxxxxxxxxxxxxxxxxxx"
    );
    socket.emit("callUserNegotiation", {
      userToCall: otherUser,
      offer,
      from: loggedUser,
    });
  }, [otherUser, loggedUser]);

  // handle incoming offer
  const handleIncomingOffer = useCallback((data) => {
    console.log(data, "incoming offer");
    setCallerDetails(data);
    setShowIncomingCall(true);
  }, []);

  // handle accept offer
  const handleOfferAccepted = useCallback(async (data) => {
    console.log(data, "accept offer");
    // await peer.setRemoteDescription(data.answer);
    await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
  }, []);

  const acceptOffer = useCallback(
    async (data) => {
      // await peer.setRemoteDescription(data.offer);
      await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      setShowIncomingCall(false);

      socket.emit("callAccepted", { to: data.from, answer });
    },
    [callerDetails]
  );

  //-  webrtc part ends

  return (
    <section className="flex relative w-full justify-center items-center p-6 shadow-xl">
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
          onClick={async () => {
            callUser();
            await getOwnVideoAudio(peer, myVideoRef, setMyStream);
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

      {showIncomingCall && (
        <div
          onClick={async () => {
            await getOwnVideoAudio(peer, myVideoRef, setMyStream);
            acceptOffer(callerDetails);
          }}
          className="bg-secondary p-2 rounded-2xl absolute bottom-[-60%] cursor-pointer z-50"
        >
          Call from {getFullName(callerDetails.from)}
        </div>
      )}
    </section>
  );
};

export default ChatHeader;
