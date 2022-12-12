import React, { useRef, useState, useEffect, useMemo } from "react";
import WaveSurfer from "wavesurfer.js";
import testAudio from "../assets/Tumbling.mp3";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const AudioComponent = ({ sendOrReceived }) => {
  const wavesurfer = useRef(null);
  const waveDiv = useRef(null);
  const [play, setPlay] = useState(false);
  console.log(testAudio, "testAudio", new Audio(testAudio));
  const uniqueID = useMemo(() => uuidv4(), []);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: `#wavesurfer-${uniqueID}`,
      waveColor: "#7EA0FF",
      progressColor: "#2962FF",
      height: 40,
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
    wavesurfer.current.on("finish", () => setPlay(false));
    window.addEventListener("resize", handleResize, false);
  }, []);

  // useEffect(() => {
  //   console.log(
  //     waveDiv.current.style,
  //     "aaaaaaaaaaaaaaaaaaaaaa",
  //     waveDiv.current
  //   );
  //   if (sendOrReceived === "send")
  //     waveDiv.current.style.transform = "rotateY(180deg)";
  // }, [waveDiv]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "2px",
        backgroundColor: "#dcdddc",
        padding: "0.5rem",
        paddingTop: "0.7rem",
        borderRadius: "1rem",
        maxWidth: "50%",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: "8px",
          flexDirection: ` ${
            sendOrReceived === "received" ? "row" : "row-reverse"
          } `,
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
            minWidth: "28px",
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
            width: "100%",
            flexDirection: "column",
          }}
        >
          <div ref={waveDiv} id={`wavesurfer-${uniqueID}`} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // padding: "0 2rem",
          flexDirection: ` ${
            sendOrReceived === "received" ? "row" : "row-reverse"
          } `,
        }}
      >
        <p style={{ fontSize: "12px", color: "#585858" }}>01:58</p>
        <p style={{ fontSize: "12px", color: "#585858" }}>10:00 pm</p>
      </div>
    </div>
  );
};

export default AudioComponent;
