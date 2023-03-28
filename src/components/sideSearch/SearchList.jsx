import { Avatar, CircularProgress, Skeleton, Typography } from "@mui/material";
import React from "react";
import ClickAnimation from "../ClickAnimation";
import { useDispatch, useSelector } from "react-redux";
import { postAccessChat } from "../../thunks";
import { setSideSearch } from "../../redux/actions";

const SearchList = ({ searchList, setSearchList }) => {
  const dispatch = useDispatch();
  const searchUserList = useSelector(
    (state) => state.chatReducer.searchUserList
  );
  const searchUserListLoader = useSelector(
    (state) => state.chatReducer.searchUserListLoader
  );

  return (
    <div
      className={` search-list-container w-full absolute top-0 left-0 flex flex-col h-full transition-all duration-300 ${
        searchList ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <h2 className="text-white text-xl mb-4 ml-8">Search List</h2>
      {searchUserListLoader ? (
        <div className="search-loader">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div
          className={`h-full flex flex-col justify-start items-center gap-4`}
        >
          {searchUserList.length ? (
            searchUserList.map((el, idx) => (
              <ClickAnimation
                className={"search-result"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setSideSearch(false));

                  dispatch(
                    postAccessChat({
                      otherUserID: el._id,
                      setSearchList,
                    })
                  );
                }}
              >
                {idx + 1}
                <img
                  className="rounded-full object-top object-cover w-12 h-12 "
                  src={el.photoUrl}
                />
                <div className="search-user-info">
                  <Typography
                    sx={{
                      color: "#2962ff",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                    }}
                  >
                    {el.firstName + " " + el.lastName}
                  </Typography>
                  <div className="text-wrapper">
                    <p className="search-list-email textflow-animation ">
                      {el.email}
                    </p>
                  </div>
                </div>
              </ClickAnimation>
            ))
          ) : (
            <h2 style={{ color: "white", fontWeight: "300" }}>
              No users found
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchList;
