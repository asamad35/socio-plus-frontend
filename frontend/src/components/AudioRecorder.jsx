import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/index";
import { useStopwatch } from "react-use-stopwatch";

// return (
//   <div>
//     // Stopwatch Outputs
//     <strong>{time}</strong>
//     <strong>{format}</strong>
//     // Stopwatch Inputs
//     <button onClick={() => start()}>Start</button>
//     <button onClick={() => stop()}>Stop</button>
//     <button onClick={() => reset()}>Reset</button>
//   </div>
// );
const AudioRecorder = () => {
  const [{ time, format }, startTimer, stopTimer, resetTimer] = useStopwatch();
  console.log(time, "timetimetime", format);

  const dispatch = useDispatch();
  const recordingState = useSelector(
    (state) => state.chatReducer.recordingState
  );
  const showMic = useSelector((state) => state.chatReducer.showMic);

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
          dispatch(actions.setStatus("recording"));
          resetTimer();
          startTimer();
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
        dispatch(actions.setShowMic(false));
        dispatch(actions.setAudioPreviewUrl(blobURL));
        dispatch(actions.setStatus(null));
        dispatch(actions.setShowKeyboard(false));
        stopTimer();
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (showMic) {
      dispatch(actions.setRecordingState(!recordingState));
      if (audioDetail.isBlocked) getPermission();
      if (recordingState) {
        stop();
      } else {
        start();
      }
    }
  }, [showMic]);

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
        dispatch(actions.setRecordingState(!recordingState));
        if (audioDetail.isBlocked) getPermission();
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
      initial={"hide"}
      animate={showMic ? "show" : "hide"}
      transition={{ duration: 0.3 }}
      style={{
        display: "flex",
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "2rem",
        backgroundColor: "red",
      }}
    >
      <MicOutlinedIcon fontSize="small" />
      <div className="timer">
        {format.split(":")[1]}:{format.split(":")[2].slice(0, 2)}
      </div>
    </motion.div>
  );
};

export default AudioRecorder;
