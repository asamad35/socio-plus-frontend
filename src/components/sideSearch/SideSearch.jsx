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
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useSwipeable } from "react-swipeable";

const SideSearch = () => {
  const dispatch = useDispatch();

  const sideSearch = useSelector((state) => state.authReducer.sideSearch);
  const [searchList, setSearchList] = useState(false);
  const callbackFn = useCallback((args) => {
    console.log({ args }, "in debounce");
    dispatch(getSearchUsers({ query: args[0] }));
  }, []);
  const debounceClosure = useCallback(debounce(callbackFn, 700), []);
  const handlers = useSwipeable({
    onSwipedLeft: () => dispatch(actions.setSideSearch(!sideSearch)),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <section
      {...handlers}
      className={`bg-primary flex flex-col justify-start items-start absolute w-4/5 h-full z-[101] pt-6 transition-all duration-300 ${
        sideSearch ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }  md:translate-x-0 md:relative md:w-1/3 md:min-w-[250px] md:opacity-100 md:rounded-l-2xl `}
    >
      {/* title  */}
      <div className="mb-6 px-4 md:px-8">
        <h1 className="text-2xl text-white font-medium">
          <span
            className="md:hidden cursor-pointer"
            onClick={() => {
              dispatch(actions.setSideSearch(!sideSearch));
            }}
          >
            {<ArrowBackOutlinedIcon />}
          </span>{" "}
          Socio Plus
        </h1>
      </div>

      {/* search bar */}

      <div className="px-4 flex mb-6 mx-8 gap-2 bg-secondary rounded-xl w-4/5 justify-start items-center py-1 bg-[#7ea0ff]  ">
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

      <div className="w-full h-full overflow-y-auto mb-4 overflow-x-hidden relative  ">
        {<ChatList searchList={searchList} />}
        {<SearchList setSearchList={setSearchList} searchList={searchList} />}
      </div>
    </section>
  );
};

export default SideSearch;
