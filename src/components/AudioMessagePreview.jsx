import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { secondsToMinutes } from "../helper";
import CloseIcon from "@mui/icons-material/Close";
import * as actions from "../redux/actions/index";

const AudioMessagePreview = () => {
  const dispatch = useDispatch();
  const audioPreviewUrl = useSelector(
    (state) => state.testReducer.audioPreviewUrl
  );

  const wavesurfer = useRef(null);
  const [play, setPlay] = useState(false);

  const [audioLength, setAudioLength] = useState("00:00");

  useEffect(() => {
    if (!audioPreviewUrl) return;
    wavesurfer.current = WaveSurfer.create({
      container: `#wavesurfer-preview`,
      waveColor: "#7EA0FF",
      progressColor: "#2962FF",
      height: 30,
      cursorWidth: 1,
      cursorColor: "lightgray",
      barWidth: 2,
      normalize: true,
      responsive: true,
      fillParent: true,
    });

    // console.log("wav", wav);
    wavesurfer.current.load(audioPreviewUrl);
    wavesurfer.current.on("ready", () => {
      const totalSeconds = +wavesurfer.current
        .getDuration()
        .toString()
        .split(".")[0];
      const result = secondsToMinutes(totalSeconds);
      setAudioLength(result);
    });

    const handleResize = wavesurfer.current.util.debounce(() => {
      wavesurfer.current.empty();
      wavesurfer.current.drawBuffer();
    }, 150);
    wavesurfer.current.on("finish", () => setPlay(false));
    window.addEventListener("resize", handleResize, false);
  }, [audioPreviewUrl]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "10px",
        margin: "0 10px",
      }}
    >
      <div style={{ fontSize: "14px", marginRight: "5px", width: "40px" }}>
        {audioLength}
      </div>
      <Box
        onClick={() => {
          setPlay(!play);
          wavesurfer.current.playPause();
        }}
        sx={{
          backgroundColor: "#2962ff",
          borderRadius: "2rem",
          height: "28px",
          width: "28px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <motion.div
          variants={{
            show: { opacity: 1, scale: 1 },
            hide: { opacity: 0, scale: 0 },
          }}
          initial={"show"}
          animate={!play ? "show" : "hide"}
          transition={{ duration: 0.3 }}
        >
          <PlayArrowIcon style={{ display: "flex", fontSize: "20px" }} />
        </motion.div>

        <motion.div
          variants={{
            show: { opacity: 1, scale: 1 },
            hide: { opacity: 0, scale: 0 },
          }}
          initial={"show"}
          animate={play ? "show" : "hide"}
          transition={{ duration: 0.2 }}
          style={{ position: "absolute" }}
        >
          <PauseOutlinedIcon style={{ display: "flex", fontSize: "20px" }} />
        </motion.div>
      </Box>

      <div
        style={{
          display: "flex",
          width: "60%",
          // marginRight: "20px",
          flexDirection: "column",
        }}
      >
        <div id={`wavesurfer-preview`} />
      </div>
      <motion.div
        whileHover={{ scale: 1.1, backgroundColor: "red" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          dispatch(actions.setShowKeyboard(true));
        }}
        style={{
          backgroundColor: "#2962ff",
          borderRadius: "2rem",
          height: "28px",
          width: "28px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          cursor: "pointer",
          position: "relative",
          transition: "0.2",
        }}
      >
        <CloseIcon style={{ display: "flex", fontSize: "20px" }} />
      </motion.div>
    </div>
  );
};

export default AudioMessagePreview;
