import { Avatar, Typography, Box, Stack, Badge } from "@mui/material";

import React from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import goku from "../../assets/goku-avatar.png";
import ClickAnimation from "../ClickAnimation";

const ChatList = ({ searchList }) => {
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
    <div
      className={`chat-list-container  ${searchList ? "search-active" : ""}`}
    >
      <h2 className="my-chats-heading">My Chats</h2>
      <Box sx={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "90%" }}>
        {Array.from(Array(10).keys()).map(() => (
          <ClickAnimation style={{ cursor: "pointer" }}>
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
          </ClickAnimation>
        ))}
      </Box>
    </div>
  );
};

export default ChatList;
