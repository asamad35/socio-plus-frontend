import { Avatar, Typography, Box, Stack, Badge } from "@mui/material";

import React from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import goku from "../../assets/goku-avatar.png";

const ChatList = () => {
  function textOverflow(text) {
    return text.slice(0, 43) + "...";
  }
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <>
      <h2 className="my-chats-heading">My Chats</h2>
      <Box sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "85%" }}>
        <motion.div
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "start",
              padding: "0.5rem 2rem",
              marginBottom: "0.5rem",
              transition: "0.2s ease-in",
              "&:hover": {
                backgroundColor: "#7ea0ff",
              },
            }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt="Remy Sharp" src={goku} />
            </StyledBadge>
            {/* < alt="Son Goku" src={goku}/> */}
            <Stack>
              <Typography
                sx={{ color: "white", fontSize: "0.9rem", fontWeight: "500" }}
              >
                Son Goku
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "0.8rem",
                  fontWeight: "400",
                }}
              >
                {textOverflow(
                  " I will never giveup sa sadda sdad asca as asds"
                )}
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "white",
                marginLeft: "auto",
                color: "#2962ff",
                width: "1.1rem",
                height: "1.1rem",
                fontSize: "0.8rem",
                fontWeight: "400",
              }}
            >
              10
            </Avatar>
          </Box>
        </motion.div>

        <motion.div
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              padding: "0.5rem 2rem",
              transition: "0.2s ease-in",
              marginBottom: "0.5rem",

              "&:hover": {
                backgroundColor: "#7ea0ff",
              },
            }}
          >
            <Avatar alt="Remy Sharp" src={goku} />
            {/* < alt="Son Goku" src={goku}/> */}
            <Stack sx={{ marginLeft: "10px" }}>
              <Typography
                sx={{ color: "white", fontSize: "0.9rem", fontWeight: "500" }}
              >
                Son Goku
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "0.8rem", fontWeight: "400" }}
              >
                I will never giveup
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "white",
                color: "#2962ff",
                width: "1.1rem",
                height: "1.1rem",
                fontSize: "0.8rem",
                fontWeight: "400",
                marginLeft: "auto",
              }}
            >
              1
            </Avatar>
          </Box>
        </motion.div>

        <motion.div
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              padding: "0.5rem 2rem",
              transition: "0.2s ease-in",
              marginBottom: "0.5rem",

              "&:hover": {
                backgroundColor: "#7ea0ff",
              },
            }}
          >
            <Avatar alt="Remy Sharp" src={goku} />
            {/* < alt="Son Goku" src={goku}/> */}
            <Stack sx={{ marginLeft: "10px" }}>
              <Typography
                sx={{ color: "white", fontSize: "0.9rem", fontWeight: "500" }}
              >
                Son Goku
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "0.8rem", fontWeight: "400" }}
              >
                I will never giveup
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "white",
                marginLeft: "auto",
                color: "#2962ff",
                width: "1.1rem",
                height: "1.1rem",
                fontSize: "0.8rem",
                fontWeight: "400",
              }}
            >
              1
            </Avatar>
          </Box>
        </motion.div>

        <motion.div
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              padding: "0.5rem 2rem",
              transition: "0.2s ease-in",
              marginBottom: "0.5rem",

              "&:hover": {
                backgroundColor: "#7ea0ff",
              },
            }}
          >
            <Avatar alt="Remy Sharp" src={goku} />
            {/* < alt="Son Goku" src={goku}/> */}
            <Stack sx={{ marginLeft: "10px" }}>
              <Typography
                sx={{ color: "white", fontSize: "0.9rem", fontWeight: "500" }}
              >
                Son Goku
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "0.8rem", fontWeight: "400" }}
              >
                I will never giveup
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "white",
                marginLeft: "auto",
                color: "#2962ff",
                width: "1.1rem",
                height: "1.1rem",
                fontSize: "0.8rem",
                fontWeight: "400",
              }}
            >
              1
            </Avatar>
          </Box>
        </motion.div>

        <motion.div
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              padding: "0.5rem 2rem",
              transition: "0.2s ease-in",
              marginBottom: "0.5rem",

              "&:hover": {
                backgroundColor: "#7ea0ff",
              },
            }}
          >
            <Avatar alt="Remy Sharp" src={goku} />
            {/* < alt="Son Goku" src={goku}/> */}
            <Stack sx={{ marginLeft: "10px" }}>
              <Typography
                sx={{ color: "white", fontSize: "0.9rem", fontWeight: "500" }}
              >
                Son Goku
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "0.8rem", fontWeight: "400" }}
              >
                I will never giveup
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "white",
                marginLeft: "auto",
                color: "#2962ff",
                width: "1.1rem",
                height: "1.1rem",
                fontSize: "0.8rem",
                fontWeight: "400",
              }}
            >
              1
            </Avatar>
          </Box>
        </motion.div>

        <motion.div
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              padding: "0.5rem 2rem",
              transition: "0.2s ease-in",
              marginBottom: "0.5rem",

              "&:hover": {
                backgroundColor: "#7ea0ff",
              },
            }}
          >
            <Avatar alt="Remy Sharp" src={goku} />
            {/* < alt="Son Goku" src={goku}/> */}
            <Stack sx={{ marginLeft: "10px" }}>
              <Typography
                sx={{ color: "white", fontSize: "0.9rem", fontWeight: "500" }}
              >
                Son Goku
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "0.8rem", fontWeight: "400" }}
              >
                I will never giveup
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "white",
                marginLeft: "auto",
                color: "#2962ff",
                width: "1.1rem",
                height: "1.1rem",
                fontSize: "0.8rem",
                fontWeight: "400",
              }}
            >
              1
            </Avatar>
          </Box>
        </motion.div>

        <motion.div
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              padding: "0.5rem 2rem",
              transition: "0.2s ease-in",
              marginBottom: "0.5rem",

              "&:hover": {
                backgroundColor: "#7ea0ff",
              },
            }}
          >
            <Avatar alt="Remy Sharp" src={goku} />
            {/* < alt="Son Goku" src={goku}/> */}
            <Stack sx={{ marginLeft: "10px" }}>
              <Typography
                sx={{ color: "white", fontSize: "0.9rem", fontWeight: "500" }}
              >
                Son Goku
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "0.8rem", fontWeight: "400" }}
              >
                I will never giveup
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "white",
                marginLeft: "auto",
                color: "#2962ff",
                width: "1.1rem",
                height: "1.1rem",
                fontSize: "0.8rem",
                fontWeight: "400",
              }}
            >
              1
            </Avatar>
          </Box>
        </motion.div>

        <motion.div
          style={{ cursor: "pointer" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              padding: "0.5rem 2rem",
              transition: "0.2s ease-in",
              marginBottom: "0.5rem",

              "&:hover": {
                backgroundColor: "#7ea0ff",
              },
            }}
          >
            <Avatar alt="Remy Sharp" src={goku} />
            {/* < alt="Son Goku" src={goku}/> */}
            <Stack sx={{ marginLeft: "10px" }}>
              <Typography
                sx={{ color: "white", fontSize: "0.9rem", fontWeight: "500" }}
              >
                Son Goku
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "0.8rem", fontWeight: "400" }}
              >
                I will never giveup
              </Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "white",
                marginLeft: "auto",
                color: "#2962ff",
                width: "1.1rem",
                height: "1.1rem",
                fontSize: "0.8rem",
                fontWeight: "400",
              }}
            >
              1
            </Avatar>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default ChatList;
