import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ClickAnimation from "./ClickAnimation";
import ScaleDivsAnimation from "./ScaleDivsAnimation";
import { postUpdateName, postUpdatePhoto, postUpdateStatus } from "../thunks";
import { getFormData } from "../helper";

const InfoDrawer = () => {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState({ value: "", open: false });
  const [statusInput, setStatusInput] = useState({ value: "", open: false });
  const infoDrawer = useSelector((state) => state.chatReducer.infoDrawer);
  const isUserProfile = useSelector((state) => state.chatReducer.isUserProfile);
  const loggedUser = useSelector((state) => state.authReducer.user);
  const selectedUser = useSelector((state) => state.chatReducer.selectedUser);

  console.log({ loggedUser });
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
          {isUserProfile && (
            <ClickAnimation className="edit-pic">
              <input
                type="file"
                name="profile-pic"
                id="profile-pic-input"
                className="profile-pic-input"
                onChange={(e) => {
                  console.log(
                    getFormData({ fileName: e.target.files[0] }),
                    "ddddddddddddddddddddddddddddd"
                  );

                  dispatch(
                    postUpdatePhoto(
                      getFormData({ fileName: e.target.files[0] })
                    )
                  );
                }}
              />
              <label htmlFor="profile-pic-input" className="profile-pic-label">
                dwd
              </label>
              <ModeEditOutlineOutlinedIcon className="edit-icon" />
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
                <p>{loggedUser.firstName + " " + loggedUser.lastName}</p>
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

          {/* Status */}
          <div className="status-box">
            <InfoOutlinedIcon className="icon" />
            <div className="name">
              <h4>Status</h4>
              <ScaleDivsAnimation openState={statusInput.open}>
                {isUserProfile
                  ? loggedUser.status
                  : selectedUser?.status || "selected user status"}
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
        className={`back-drop ${infoDrawer === true ? "active" : ""} `}
      ></div>
    </>
  );
};

export default InfoDrawer;
