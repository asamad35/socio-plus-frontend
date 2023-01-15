import { Avatar, CircularProgress, Skeleton, Typography } from "@mui/material";
import React from "react";
import ClickAnimation from "../ClickAnimation";
import { useSelector } from "react-redux";

const SearchList = ({ searchList }) => {
  const searchUserList = useSelector(
    (state) => state.chatReducer.searchUserList
  );
  const searchUserListLoader = useSelector(
    (state) => state.chatReducer.searchUserListLoader
  );
  console.log({ searchUserList });
  return (
    <div
      className={` search-list-container ${searchList ? "search-active" : ""}`}
    >
      <h2 className="my-chats-heading">Search List</h2>
      {searchUserListLoader ? (
        <div className="search-loader">
          {/* <CircularProgress size={90} /> */}
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className={`search-list`}>
          {searchUserList.length ? (
            searchUserList.map((el, idx) => (
              <ClickAnimation
                className={"search-result"}
                style={{ cursor: "pointer" }}
              >
                {idx + 1}
                <Avatar alt="Remy Sharp" src={el.photoUrl} />
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
