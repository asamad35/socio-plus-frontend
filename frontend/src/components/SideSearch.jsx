import React from "react";
import {
  Box,
  Container,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
  InputBase,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Badge,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import goku from "../assets/goku-avatar.png";
import { useDispatch } from "react-redux";
import * as actions from "../redux/actions/index";
import { getAllTodos, getTodoById } from "../thunks";
import { motion } from "framer-motion";

const SideSearch = () => {
  const dispatch = useDispatch();
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

  function textOverflow(text) {
    return text.slice(0, 43) + "...";
  }

  return (
    <Box
      sx={{
        backgroundColor: "#2962ff",
        // backgroundColor: "#fff",
        height: "100%",
        width: "40%",
        padding: "2rem 0rem",
      }}
    >
      {/* title  */}
      <Box
        onClick={() => {
          // dispatch(getAllTodos());
          // dispatch(getTodoById({ id: 1 }));
          // console.log(actions.increment(), "pppppppp");
        }}
        sx={{ marginBottom: "1.5rem", padding: "0rem 2rem" }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "22px", color: "white", fontWeight: "500" }}
        >
          Socio Plus
        </Typography>
      </Box>

      {/* search bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderRadius: "0.5rem",
          backgroundColor: "#7ea0ff",
          padding: "0.2rem",
          paddingLeft: "10px",
          margin: "0rem 2rem 2rem 2rem",
        }}
      >
        <SearchOutlinedIcon sx={{ color: "white" }} />
        <InputBase
          sx={{ color: "white", fontSize: "0.9rem" }}
          placeholder="Search…"
        ></InputBase>
      </Box>

      {/* chats list */}
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
      </Box>
    </Box>
  );
};

export default SideSearch;
