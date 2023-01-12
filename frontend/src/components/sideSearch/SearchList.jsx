import { Avatar, Typography } from "@mui/material";
import React from "react";
import ClickAnimation from "../ClickAnimation";
import goku from "../../assets/goku-avatar.png";
import { useSelector } from "react-redux";

const SearchList = ({ searchList }) => {
  const searchUserList = useSelector(
    (state) => state.chatReducer.searchUserList
  );
  console.log({ searchUserList });
  return (
    <div
      className={` search-list-container ${searchList ? "search-active" : ""}`}
    >
      <h2 className="my-chats-heading">Search List</h2>
      <div className={`search-list`}>
        {searchUserList.map((el, idx) => (
          <ClickAnimation
            className={"search-result"}
            style={{ cursor: "pointer" }}
          >
            {idx + 1}
            <Avatar alt="Remy Sharp" src={el.photoUrl} />
            <div className="search-user-info">
              <Typography
                sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
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
        ))}
        {/* <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          1
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          2
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          3
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          4
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation>
        <ClickAnimation
          className={"search-result"}
          style={{ cursor: "pointer" }}
        >
          5
          <Avatar alt="Remy Sharp" src={goku} />
          <Typography
            sx={{ color: "#2962ff", fontSize: "0.9rem", fontWeight: "500" }}
          >
            Son Goku
          </Typography>
        </ClickAnimation> */}
      </div>
    </div>
  );
};

export default SearchList;
