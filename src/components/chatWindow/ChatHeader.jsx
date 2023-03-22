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
import {
  setCallingScreen,
  setIncomingCall,
  setSelectedChat,
} from "../../redux/actions";

const ChatHeader = ({
  myVideoRef,
  partnerVideoRef,
  myStream,
  setMyStream,
  socket,
  peer,
  setPeer,
  partnerDetails,
  setPartnerDetails,
}) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const sideSearch = useSelector((state) => state.authReducer.sideSearch);
  const status = useSelector((state) => state.chatReducer.status);
  const loggedUser = useSelector((state) => state.authReducer.user);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const chatList = useSelector((state) => state.chatReducer.chatList);
  const callingScreen = useSelector((state) => state.chatReducer.callingScreen);
  const incomingCall = useSelector((state) => state.chatReducer.incomingCall);

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
    socket.on("callEnded", () => {
      dispatch(setIncomingCall(false));
    });
  }, []);

  useEffect(() => {
    socket.on("incomingOffer", handleIncomingOffer);
    socket.on("offerAccepted", handleOfferAccepted);
    socket.on("ice-candidate", handleNewICECandidateMsg);

    return () => {
      socket.off("incomingOffer", handleIncomingOffer);
      socket.off("offerAccepted", handleOfferAccepted);
      socket.off("ice-candidate", handleNewICECandidateMsg);
    };
  }, [peer]);

  //-  webrtc part start
  const createPeer = () => {
    const peer = new RTCPeerConnection({
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

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = async () => {
      console.log("in negotiation");
      // create offer
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      // send offer to another user via socket
      socket.emit("sendOffer", {
        userToCall: otherUser,
        offer,
        from: loggedUser,
        selectedChat,
      });
    };
    setPeer(peer);
    return peer;
  };

  function handleICECandidateEvent(e) {
    console.log("handleICECandidateEvent", partnerDetails);
    if (e.candidate) {
      const payload = {
        target: partnerDetails?.from ?? otherUser,
        candidate: e.candidate,
      };
      socket.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);
    if (!peer) return;
    peer.addIceCandidate(candidate).catch((e) => console.log(e));
  }
  const handleTrackEvent = (e) => {
    console.log("listening to stream");
    const streams = e.streams;
    console.log(
      streams,
      streams[0],
      partnerVideoRef.current,
      "llllllllllllllllmmmmmm"
    );
    partnerVideoRef.current.srcObject = streams[0];
  };
  // define offer
  const callUser = useCallback(async () => {
    const peer = createPeer();
    console.log({ peer });

    await getOwnVideoAudio(peer, myVideoRef, setMyStream);
  }, [otherUser, loggedUser]);

  // handle incoming offer
  const handleIncomingOffer = useCallback((data) => {
    console.log(data, "incoming offer");
    setPartnerDetails(data);
    dispatch(setIncomingCall(true));
  }, []);

  // handle accept offer
  const handleOfferAccepted = async (data) => {
    console.log(data, peer, "accept offer");
    await peer.setRemoteDescription(new RTCSessionDescription(data.answer));
  };

  const acceptOffer = async (data) => {
    // create Peer
    const peer = createPeer();
    // start and send tracks
    await getOwnVideoAudio(peer, myVideoRef, setMyStream);
    await peer.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    dispatch(setIncomingCall(false));

    socket.emit("callAccepted", { to: data.from, answer });
  };

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
            if (!partnerDetails) {
              setPartnerDetails(otherUser);
              dispatch(setCallingScreen(true));
              callUser();
            } else {
              toast.error("you are already in a call");
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
                if (callingScreen) {
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

      {incomingCall && (
        <div
          onClick={async () => {
            console.log(partnerDetails);
            // if (selectedChat._id !== partnerDetails.selectedChat._id) {
            //   setSelectedChat
            // }
            dispatch(setCallingScreen(true));
            acceptOffer(partnerDetails);
          }}
          className="bg-secondary p-2 rounded-2xl absolute bottom-[-60%] cursor-pointer z-50"
        >
          Call from {partnerDetails.from && getFullName(partnerDetails.from)}
        </div>
      )}
    </section>
  );
};

export default ChatHeader;
