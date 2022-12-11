import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import testAudio from "../assets/Tumbling.mp3";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const AudioMessagePreview = () => {
  const audioPreviewUrl = useSelector(
    (state) => state.testReducer.audioPreviewUrl
  );

  const wavesurfer = useRef(null);
  const [play, setPlay] = useState(false);
  const [audioLength, setAudioLength] = useState(0);

  useEffect(() => {
    if (!audioPreviewUrl) return;
    wavesurfer.current = WaveSurfer.create({
      container: `#wavesurfer-preview`,
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
    wavesurfer.current.load(audioPreviewUrl);
    wavesurfer.current.on("ready", () => {
      const totalSeconds = wavesurfer.current.getDuration();
      const minutes = Math.floor(totalSeconds / 60);
      const remainingSeconds = totalSeconds % 60;

      const result = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .slice(0, 1)
        .padStart(2, "0")} `;
      setAudioLength(result);
    });

    const handleResize = wavesurfer.current.util.debounce(() => {
      wavesurfer.current.empty();
      wavesurfer.current.drawBuffer();
    }, 150);
    // wavesurfer.current.on("play", () => setIsPlaying(true));
    // wavesurfer.current.on("pause", () => setIsPlaying(false));
    window.addEventListener("resize", handleResize, false);
  }, [audioPreviewUrl]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "5px",
      }}
    >
      {audioLength}
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
          marginLeft: "20px",
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
          width: "90%",
          marginRight: "20px",
          flexDirection: "column",
        }}
      >
        <div id={`wavesurfer-preview`} />
      </div>
    </div>
  );
};

export default AudioMessagePreview;
