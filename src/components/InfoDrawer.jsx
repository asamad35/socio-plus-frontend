import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ClickAnimation from "./ClickAnimation";
import ScaleDivsAnimation from "./ScaleDivsAnimation";
import { postUpdateName, postUpdatePhoto, postUpdateStatus } from "../thunks";
import { getFormData, getOtherUserInfo } from "../helper";
import { CircularProgress } from "@mui/material";
import { useSwipeable } from "react-swipeable";

const InfoDrawer = () => {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState({ value: "", open: false });
  const [statusInput, setStatusInput] = useState({ value: "", open: false });
  const infoDrawer = useSelector((state) => state.chatReducer.infoDrawer);
  const isUserProfile = useSelector((state) => state.chatReducer.isUserProfile);
  const loggedUser = useSelector((state) => state.authReducer.user);
  const authReducer = useSelector((state) => state.authReducer);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);

  const handlers = useSwipeable({
    onSwipedRight: () => dispatch(actions.setInfoDrawer(false)),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const otherUser = useMemo(
    () => getOtherUserInfo(selectedChat?.users, loggedUser),
    [selectedChat]
  );
  useEffect(() => {
    setStatusInput({ ...statusInput, value: loggedUser.status });
    setNameInput({
      ...nameInput,
      value: loggedUser.firstName + " " + loggedUser.lastName,
    });
  }, [loggedUser]);

  return (
    <>
      <div
        {...handlers}
        onClick={(e) => {}}
        className={`info-drawer w-[90%] md:w-1/3 rounded-r-2xl overflow-hidden ${
          infoDrawer === true ? "active" : ""
        }`}
      >
        <div className="profile-pic w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative">
          <img
            src={isUserProfile ? loggedUser?.photoUrl : otherUser?.photoUrl}
            alt="profile-img"
          />
          {isUserProfile && (
            <ClickAnimation className="rounded-full bg-white flex justify-center items-center absolute right-[-8px] bottom-[0px] cursor-pointer border-2 border-primary h-[35px] w-[35px] md:bottom-[0px] md:right-[10px]">
              <input
                type="file"
                name="profile-pic"
                id="profile-pic-input"
                className="profile-pic-input"
                onChange={(e) => {
                  dispatch(
                    postUpdatePhoto(
                      getFormData({ profilePic: e.target.files[0] })
                    )
                  );
                }}
              />
              <label htmlFor="profile-pic-input" className="profile-pic-label">
                dwd
              </label>
              {authReducer.profilePicLoader === "loading" ? (
                <CircularProgress size={20} />
              ) : (
                <ModeEditOutlineOutlinedIcon className="text-primary" />
              )}
            </ClickAnimation>
          )}
        </div>
        <div className="profile-detail">
          {/* name */}
          <div className="name-box">
            <AccountCircleOutlinedIcon className="icon" />
            <div className="name">
              <h4>Name</h4>
              <ScaleDivsAnimation openState={nameInput.open}>
                <p>
                  {isUserProfile
                    ? loggedUser.firstName + " " + loggedUser.lastName
                    : otherUser
                    ? otherUser.firstName + " " + otherUser.lastName
                    : "Select a chat"}
                </p>
                <input
                  onChange={(e) => {
                    setNameInput({
                      ...nameInput,
                      value: e.target.value,
                    });
                  }}
                  value={nameInput.value}
                  className="profile-detail-input"
                />
              </ScaleDivsAnimation>
            </div>
            {isUserProfile && (
              <div className="accept-reject-icon">
                {nameInput.open && (
                  <ClickAnimation
                    onClick={() =>
                      setNameInput({
                        ...nameInput,
                        open: !nameInput.open,
                      })
                    }
                    className="edit-name-container"
                  >
                    <ClearOutlinedIcon className="icon" />
                  </ClickAnimation>
                )}
                <ClickAnimation
                  onClick={() => {
                    if (nameInput.open) {
                      dispatch(
                        postUpdateName({
                          email: loggedUser.email,
                          name: nameInput.value,
                        })
                      );
                    }
                    setNameInput({ ...nameInput, open: !nameInput.open });
                  }}
                  className="edit-name-container"
                >
                  <ScaleDivsAnimation openState={nameInput.open}>
                    <ModeEditOutlineOutlinedIcon className="icon" />
                    <CheckOutlinedIcon className="icon" />{" "}
                  </ScaleDivsAnimation>
                </ClickAnimation>
              </div>
            )}
          </div>

          {/* email */}
          <div className="name-box">
            <AlternateEmailIcon className="icon" />
            <div className="name">
              <h4>Email</h4>
              <p>
                {isUserProfile
                  ? loggedUser.email
                  : otherUser
                  ? otherUser.email
                  : "Select a chat"}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="status-box">
            <InfoOutlinedIcon className="icon" />
            <div className="name">
              <h4>Status</h4>
              <ScaleDivsAnimation openState={statusInput.open}>
                {isUserProfile
                  ? loggedUser.status
                  : otherUser?.status || "selected a chat"}
                <textarea
                  value={statusInput.value}
                  onChange={(e) => {
                    setStatusInput({
                      ...statusInput,
                      value: e.target.value,
                    });
                  }}
                  cols={"26"}
                  className="profile-detail-input"
                />
              </ScaleDivsAnimation>
            </div>
            {isUserProfile && (
              <>
                <div className="accept-reject-icon">
                  {statusInput.open && (
                    <ClickAnimation
                      onClick={() =>
                        setStatusInput({
                          ...statusInput,
                          open: !statusInput.open,
                        })
                      }
                      className="edit-name-container"
                    >
                      <ClearOutlinedIcon className="icon" />
                    </ClickAnimation>
                  )}
                  <ClickAnimation
                    onClick={() => {
                      if (statusInput.open) {
                        dispatch(
                          postUpdateStatus({
                            email: loggedUser.email,
                            status: statusInput.value,
                          })
                        );
                      }
                      setStatusInput({
                        ...statusInput,
                        open: !statusInput.open,
                      });
                    }}
                    className="edit-name-container"
                  >
                    <ScaleDivsAnimation openState={statusInput.open}>
                      <ModeEditOutlineOutlinedIcon className="icon" />
                      <CheckOutlinedIcon className="icon" />{" "}
                    </ScaleDivsAnimation>
                  </ClickAnimation>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        onClick={(e) => {
          dispatch(actions.setInfoDrawer(false));
        }}
        className={`back-drop rounded-r-2xl overflow-hidden ${
          infoDrawer === true ? "active" : ""
        } `}
      ></div>
    </>
  );
};

export default InfoDrawer;
