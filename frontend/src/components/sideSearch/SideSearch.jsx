import { useCallback, useEffect, useState } from "react";
import { Box, Typography, InputBase } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import { AnimatePresence, motion } from "framer-motion";
import ChatList from "./ChatList";
import SearchList from "./SearchList";
import { debounce } from "../../helper";
import { getSearchUsers } from "../../thunks";

const SideSearch = () => {
  const [searchList, setSearchList] = useState(false);
  const dispatch = useDispatch();

  const callbackFn = useCallback((args) => {
    console.log({ args }, "in debounce");
    dispatch(getSearchUsers({ query: args[0] }));
  }, []);
  const debounceClosure = useCallback(debounce(callbackFn, 1000), []);

  return (
    <Box
      sx={{
        backgroundColor: "#2962ff",
        // backgroundColor: "#fff",
        height: "100%",
        width: "40%",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* title  */}
      <Box
        onClick={() => {
          dispatch(actions.logout());
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

      <div className="search-box">
        <SearchOutlinedIcon sx={{ color: "white" }} />
        <InputBase
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setSearchList(false);
            } else {
              console.log("debounce here");
              debounceClosure(e.target.value);
              setSearchList(true);
            }
          }}
          sx={{ color: "white", fontSize: "0.9rem" }}
          placeholder="Add user to chat"
        ></InputBase>
      </div>

      {/* chats list */}
      {/* {!searchList && <ChatList />} */}
      <div className="chat-search-list-container">
        {<ChatList searchList={searchList} />}
        {<SearchList searchList={searchList} />}
      </div>
      {/* search List */}
      {/* {searchList && <SearchList />} */}
    </Box>
  );
};

export default SideSearch;
