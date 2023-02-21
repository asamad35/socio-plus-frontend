import { Avatar, Typography, Box, Stack, Badge } from "@mui/material";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import goku from "../../assets/goku-avatar.png";
import ClickAnimation from "../ClickAnimation";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages, getChatList } from "../../thunks";
import * as actions from "../../redux/actions";
import { getOtherUserInfo } from "../../helper";

const ChatList = ({ searchList }) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.authReducer.user);
  const chatList = useSelector((state) => state.chatReducer.chatList);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  console.log({ chatList });

  useEffect(() => {
    dispatch(getChatList());
  }, []);

  useEffect(() => {
    if (!selectedChat) return;
    dispatch(getAllMessages({ chatID: selectedChat?._id }));
  }, [selectedChat]);

  function textOverflow(text = " ") {
    let overflow = text.length > 20 ? "..." : "";
    return text.slice(0, 21) + overflow;
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
      className={`chat-list-container w-full flex flex-col h-full ${
        searchList ? "search-active" : ""
      }`}
    >
      <h2 className="text-white text-xl mb-4 ml-8">My Chats</h2>
      <div className="h-full">
        {[...chatList, ...chatList, ...chatList, ...chatList]?.map(
          (el, idx) => {
            return (
              <ClickAnimation
                key={idx}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(actions.setSelectedChat(el));
                }}
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
                    backgroundColor: `${
                      selectedChat?._id === el._id ? "#7ea0ff" : ""
                    }`,
                    "&:hover": {
                      backgroundColor: "#7ea0ff",
                    },
                  }}
                >
                  {el?.active ? (
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar alt="Remy Sharp" src={goku} />
                    </StyledBadge>
                  ) : (
                    <Avatar alt="Remy Sharp" src={goku} />
                  )}

                  {/* < alt="Son Goku" src={goku}/> */}
                  <Stack sx={{ maxWidth: "6rem" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        wordBreak: "break-word",
                      }}
                    >
                      {getOtherUserInfo(el.users, loggedUser)?.firstName +
                        " " +
                        getOtherUserInfo(el.users, loggedUser)?.lastName}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "0.8rem",
                        fontWeight: "400",
                        wordBreak: "break-word",
                      }}
                    >
                      {textOverflow(el?.latestMessage?.content)}
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
            );
          }
        )}
      </div>
    </div>
  );
};

export default ChatList;
