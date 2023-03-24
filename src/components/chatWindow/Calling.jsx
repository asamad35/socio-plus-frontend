import React, { useEffect, useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";

import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { useDispatch, useSelector } from "react-redux";
import { setCallDetails, setInCall } from "../../redux/actions";
import { motion } from "framer-motion";
import { useClient, useMicrophoneAndCameraTracks, config } from "../../setting";
import { AgoraVideoPlayer } from "agora-rtc-react";
import ClickAnimation from "../ClickAnimation";

const Calling = ({ socket }) => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const callDetails = useSelector((state) => state.chatReducer.callDetails);
  const loggedUser = useSelector((state) => state.authReducer.user);

  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  // controls state
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, config.token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(callDetails.roomId ?? selectedChat._id);
      } catch (error) {
        console.log(error);
      }
    }

    socket.on("leaveChannel", () => {
      console.log("in leave channel");
      leaveChannel();
    });

    return () => {
      socket.off("leaveChannel");
    };
  }, [client, ready, tracks]);

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks?.[0]?.close();
    tracks?.[1]?.close();
    setStart(false);
    dispatch(setInCall(false));
  };

  return (
    <motion.div
      className="absolute z-50 w-full h-full bg-black"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4 }}
    >
      {start && tracks && (
        <>
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
            className="h-full w-full absolute"
          />

          {users.length > 0 &&
            users.map((user) => {
              if (user.videoTrack) {
                return (
                  <AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    key={user.uid}
                    className="h-[120px] w-[120px]  sm:h-[200px] sm:w-[200px] top-0 right-0 absolute"
                  />
                );
              } else return null;
            })}
        </>
      )}

      {/* controls */}

      <div className="flex gap-8 justify-center relative top-[85%] ">
        {/* video toggle button */}
        <ClickAnimation
          className=" bg-secondary rounded-full cursor-pointer p-2 h-[40px] flex z-50"
          onClick={() => {
            mute("video");
          }}
        >
          {trackState.video ? (
            <VideocamIcon className="text-primary" fontSize="medium" />
          ) : (
            <VideocamOffIcon className="text-red-600" fontSize="medium" />
          )}
        </ClickAnimation>

        {/* end call button */}
        <ClickAnimation
          className=" bg-secondary rounded-full cursor-pointer p-2 h-[40px] flex z-50"
          onClick={() => {
            leaveChannel();
            console.log(
              callDetails,
              callDetails.partnerDetails,
              "aaaaaaaaaaaaa"
            );
            if (callDetails.partnerDetails)
              socket.emit("callEnded", {
                from: loggedUser,
                to: callDetails.partnerDetails,
              });
            dispatch(
              setCallDetails({
                partnerDetails: null,
                roomId: null,
                showInvitation: false,
              })
            );
          }}
        >
          <CallEndIcon className="text-red-600" fontSize="medium" />
        </ClickAnimation>

        {/* audio toggle button */}
        <ClickAnimation
          className=" bg-secondary rounded-full cursor-pointer p-2 h-[40px] flex z-50"
          onClick={() => {
            mute("audio");
          }}
        >
          {trackState.audio ? (
            <MicIcon className="text-primary" fontSize="medium" />
          ) : (
            <MicOffIcon className="text-red-600" fontSize="medium" />
          )}
        </ClickAnimation>
      </div>
    </motion.div>
  );
};

export default Calling;
