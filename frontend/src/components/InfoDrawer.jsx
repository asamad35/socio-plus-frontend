import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { motion } from "framer-motion";
import ClickAnimation from "./ClickAnimation";

const InfoDrawer = () => {
  const dispatch = useDispatch();
  const infoDrawer = useSelector((state) => state.chatReducer.infoDrawer);

  return (
    <>
      <div
        onClick={(e) => {}}
        className={`info-drawer ${infoDrawer === true ? "active" : ""}`}
      >
        <div className="profile-pic">
          <img
            src={
              "https://www.muscleandfitness.com/wp-content/uploads/2015/08/what_makes_a_man_more_manly_main0.jpg?quality=86&strip=all"
            }
            alt="profile-img"
          />
          <ClickAnimation className="edit-pic">
            <ModeEditOutlineOutlinedIcon className="edit-icon" />
          </ClickAnimation>
        </div>
        <div className="profile-detail">
          <div className="name-box">
            <div className="icon">
              <AccountCircleOutlinedIcon />
            </div>
            <div className="name">
              <h4>Name</h4>
              <p>Abdus Samad</p>
            </div>
            <ClickAnimation className="edit-pic">
              <ModeEditOutlineOutlinedIcon className="edit-profile-detail" />
            </ClickAnimation>
          </div>
          <div className="status-box">
            <div className="icon">
              <InfoOutlinedIcon />
            </div>
            <div className="name">
              <h4>Status</h4>
              <p>No limits, till i collapse knn ojoj okoko okk</p>
            </div>
            <ClickAnimation className="edit-pic">
              <ModeEditOutlineOutlinedIcon className="edit-profile-detail" />
            </ClickAnimation>
          </div>
        </div>
      </div>

      <div
        onClick={(e) => {
          dispatch(actions.setInfoDrawer(false));
        }}
        className={`back-drop ${infoDrawer === true ? "active" : ""} `}
      ></div>
    </>
  );
};

export default InfoDrawer;
