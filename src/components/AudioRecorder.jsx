import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions/index";

const AudioRecorder = () => {
  const dispatch = useDispatch();
  const recordingState = useSelector(
    (state) => state.testReducer.recordingState
  );
  const showMic = useSelector((state) => state.testReducer.showMic);

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
          dispatch(actions.setShowKeyboard(false));
          dispatch(actions.setStatus("recording"));
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
      initial={"show"}
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
        backgroundColor: recordingState ? "red" : "#2962ff",
      }}
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
