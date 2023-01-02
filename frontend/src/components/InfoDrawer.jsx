import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";

const InfoDrawer = () => {
  const dispatch = useDispatch();
  const infoDrawer = useSelector((state) => state.chatReducer.infoDrawer);
  return (
    <>
      <div
        onClick={(e) => {}}
        className={`info-drawer ${infoDrawer === true ? "active" : ""}`}
      >
        InfoDrawer
      </div>

      <div
        onClick={(e) => {
          console.log(e.target);
          dispatch(actions.setInfoDrawer(false));
        }}
        className={`back-drop ${infoDrawer === true ? "active" : ""} `}
      ></div>
    </>
  );
};

export default InfoDrawer;
