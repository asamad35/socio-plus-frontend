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
import { setSearchUserListLoader } from "../../redux/actions/index";

const SideSearch = () => {
  const [searchList, setSearchList] = useState(false);
  const dispatch = useDispatch();

  const callbackFn = useCallback((args) => {
    console.log({ args }, "in debounce");
    dispatch(getSearchUsers({ query: args[0] }));
  }, []);
  const debounceClosure = useCallback(debounce(callbackFn, 700), []);

  return (
    <section className="bg-primary flex flex-col justify-start items-start absolute w-4/5 h-full z-50 pt-6 ">
      {/* title  */}
      <div
        className="mb-6 px-8"
        onClick={() => {
          dispatch(actions.logout());
        }}
      >
        <h1 className="text-2xl text-white font-medium">Socio Plus</h1>
      </div>

      {/* search bar */}

      <div className="px-4 flex mb-6 mx-8 gap-2 bg-secondary rounded-xl w-4/5 justify-start items-center p-2 bg-[#7ea0ff]  ">
        <SearchOutlinedIcon sx={{ color: "white" }} />
        <InputBase
          className="searchInput"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              dispatch(setSearchUserListLoader(true));
              setSearchList(false);
            } else {
              debounceClosure(e.target.value);
              setSearchList(true);
            }
          }}
          sx={{ color: "white", fontSize: "0.9rem" }}
          placeholder="Add user to chat"
        ></InputBase>
      </div>

      <div className="w-full flex overflow-y-scroll ">
        {<ChatList searchList={searchList} />}
        {/* {<SearchList setSearchList={setSearchList} searchList={searchList} />} */}
      </div>
    </section>
  );
};

export default SideSearch;
