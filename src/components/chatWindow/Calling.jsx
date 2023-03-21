import React, { useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";

import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { getOwnVideoAudio } from "../../helper";

const Calling = ({
  myVideoRef,
  partnerVideoRef,
  setMyStream,
  myStream,
  setCallingScreen,
  callingScreen,
}) => {
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);

  //   console.log(
  //     partnerVideoRef.current.srcObject,
  //     myVideoRef.current.srcObject,
  //     "cdcdcdcdcdcdcdcdc"
  //   );

  return (
    <div className="absolute z-50 w-full h-full bg-black">
      <video
        ref={partnerVideoRef}
        autoPlay
        className="relative w-full h-full "
      />
      <div className="flex gap-8 justify-center relative -top-[50px]">
        <button
          className=" bg-secondary rounded-full cursor-pointer p-1 z-50"
          onClick={() => {
            if (video) {
              setVideo(!video);
              myStream.getVideoTracks()[0].stop();
            } else {
              setVideo(!video);
              getOwnVideoAudio(myVideoRef, setMyStream, true, audio);
            }
          }}
        >
          {video ? (
            <VideocamIcon className="text-primary" fontSize="medium" />
          ) : (
            <VideocamOffIcon className="text-red-600" fontSize="medium" />
          )}
        </button>
        <button
          className=" bg-secondary rounded-full cursor-pointer p-1 z-50"
          onClick={() => {
            //   stop both audio and video
            myStream.getTracks().forEach((track) => {
              track.stop();
            });
            setCallingScreen(false);
          }}
        >
          <PhoneEnabledIcon className="text-red-600" fontSize="medium" />
        </button>
        <button
          className=" bg-secondary rounded-full cursor-pointer p-1 z-50"
          onClick={() => {
            if (audio) {
              setAudio(!audio);
              myStream.getAudioTracks()[0].stop();
            } else {
              setAudio(!audio);
              getOwnVideoAudio(myVideoRef, setMyStream, video, true);
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
        className="absolute top-0 right-0 w-[200px] h-[150px] "
      />
    </div>
  );
};

export default Calling;
