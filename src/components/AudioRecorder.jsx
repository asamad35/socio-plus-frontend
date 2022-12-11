import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions/index";

const AudioRecorder = ({ showMic }) => {
  const dispatch = useDispatch();

  const [recordingState, setRecordingState] = useState(false);
  const Mp3Recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);
  const [audioDetail, setAudioDetail] = useState({
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });

  const start = () => {
    if (audioDetail.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setAudioDetail({ ...audioDetail, isRecording: true });
          console.log("start");
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setAudioDetail({ ...audioDetail, blobURL, isRecording: false });
        console.log("stop");
        dispatch(actions.setAudioPreviewUrl(blobURL));
      })
      .catch((e) => console.log(e));
  };

  function getPermission() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setAudioDetail({ ...audioDetail, isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        setAudioDetail({ ...audioDetail, isBlocked: true });
      }
    );
  }
  return (
    <motion.div
      onClick={() => {
        console.log("wdwdwwd", recordingState);
        if (audioDetail.isBlocked) getPermission();
        setRecordingState(!recordingState);
        if (recordingState) {
          stop();
        } else {
          start();
        }
      }}
      variants={{
        show: { opacity: 1, scale: 1 },
        hide: { opacity: 0, scale: 0 },
      }}
      initial={"show"}
      animate={showMic ? "show" : "hide"}
      transition={{ duration: 0.3 }}
      style={{ display: "flex", position: "absolute" }}
    >
      {/* <> */}
      <MicOutlinedIcon fontSize="small" />
      {/* <button onClick={() => start()} disabled={audioDetail.isRecording}>
        Record
      </button>
      <button onClick={() => stop()} disabled={!audioDetail.isRecording}>
        Stop
      </button>
      <audio src={audioDetail.blobURL} controls="controls" />
    </> */}
    </motion.div>
  );
};

export default AudioRecorder;
