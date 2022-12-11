import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import testAudio from "../assets/Tumbling.mp3";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@mui/material";

const AudioComponent = () => {
  const wavesurfer = useRef(null);
  const [play, setPlay] = useState(false);
  console.log(testAudio, "testAudio", new Audio(testAudio));

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: `#wavesurfer-ID`,
      waveColor: "#7EA0FF",
      progressColor: "#2962FF",
      height: 70,
      cursorWidth: 1,
      cursorColor: "lightgray",
      barWidth: 2,
      normalize: true,
      responsive: true,
      fillParent: true,
    });

    // console.log("wav", wav);
    wavesurfer.current.load(testAudio);
    const handleResize = wavesurfer.current.util.debounce(() => {
      wavesurfer.current.empty();
      wavesurfer.current.drawBuffer();
    }, 150);
    // wavesurfer.current.on("play", () => setIsPlaying(true));
    // wavesurfer.current.on("pause", () => setIsPlaying(false));
    window.addEventListener("resize", handleResize, false);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "8px",
      }}
    >
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
          width: "50%",
          flexDirection: "column",
        }}
      >
        <div id="wavesurfer-ID" />
      </div>
    </div>
  );
};

export default AudioComponent;
