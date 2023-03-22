import React, { useEffect, useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";

import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { getOwnVideoAudio } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { setCallingScreen } from "../../redux/actions";
import { motion } from "framer-motion";

const Calling = ({
  myVideoRef,
  partnerVideoRef,
  setMyStream,
  myStream,
  peer,
  setPeer,
  partnerDetails,
  setPartnerDetails,
  socket,
}) => {
  const dispatch = useDispatch();
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const callingScreen = useSelector((state) => state.chatReducer.callingScreen);

  useEffect(() => {
    socket.on("callEnded", () => {
      // revoking camera and mic access
      console.log("in call ended");
      myStream.getTracks().forEach((track) => {
        track.stop();
      });
      peer.close();
      setPeer(null);
      myVideoRef.current.srcObject = null;
      partnerVideoRef.current.srcObject = null;
      setMyStream(null);
      setPartnerDetails(null);
      dispatch(setCallingScreen(false));
    });
    return () => {
      socket.off("callEnded");
    };
  }, [myStream]);

  return (
    <motion.div
      className="absolute z-50 w-full h-full bg-black"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.6 }}
    >
      <video
        ref={partnerVideoRef}
        autoPlay
        className="relative w-full h-full object-cover"
      />
      <div className="flex gap-8 justify-center relative -top-[50px] ">
        {/* video toggle button */}
        <button
          className=" bg-secondary rounded-full cursor-pointer p-1 z-50"
          onClick={() => {
            const videoTrack = myStream
              .getTracks()
              .find((track) => track.kind === "video");
            console.log(videoTrack.enabled, "lllllllllllllll");
            if (videoTrack.enabled) {
              setVideo(!video);
              videoTrack.enabled = false;
            } else {
              setVideo(!video);
              videoTrack.enabled = true;
            }
          }}
        >
          {video ? (
            <VideocamIcon className="text-primary" fontSize="medium" />
          ) : (
            <VideocamOffIcon className="text-red-600" fontSize="medium" />
          )}
        </button>

        {/* end call button */}
        <button
          className=" bg-secondary rounded-full cursor-pointer p-1 z-50"
          onClick={() => {
            // revoking camera and mic access
            myStream.getTracks().forEach((track) => {
              track.stop();
            });
            //   stop both audio and video
            peer.close();
            setPeer(null);
            socket.emit("callEnded", partnerDetails);
            myVideoRef.current.srcObject = null;
            partnerVideoRef.current.srcObject = null;
            setMyStream(null);
            setPartnerDetails(null);
            dispatch(setCallingScreen(false));
          }}
        >
          <PhoneEnabledIcon className="text-red-600" fontSize="medium" />
        </button>

        {/* audio toggle button */}
        <button
          className=" bg-secondary rounded-full cursor-pointer p-1 z-50"
          onClick={() => {
            const audioTrack = myStream
              .getTracks()
              .find((track) => track.kind === "audio");
            console.log(audioTrack.enabled, "lllllllllllllll");
            if (audioTrack.enabled) {
              setAudio(!audio);
              audioTrack.enabled = false;
            } else {
              setAudio(!audio);
              audioTrack.enabled = true;
            }
          }}
        >
          {audio ? (
            <MicIcon className="text-primary" fontSize="medium" />
          ) : (
            <MicOffIcon className="text-red-600" fontSize="medium" />
          )}
        </button>
      </div>

      <video
        ref={myVideoRef}
        autoPlay
        muted
        className="absolute top-0 right-0 w-[120px] h-[120px] object-cover md:w-[200px] md:h-[150px]"
      />
    </motion.div>
  );
};

export default Calling;
