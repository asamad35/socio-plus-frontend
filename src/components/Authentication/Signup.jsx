import { Button } from "@mui/material";
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Signup = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

  return (
    <div className="authentication signup">
      <div className="authentication-left">
        <div className="image"></div>
      </div>

      <div className="authentication-right">
        <div className="right-inner">
          <h1 className="app-name">SocioPlus</h1>
          <h1 className="heading">Sign up</h1>
          <p className="heading-info">
            Few steps away from connecting to the world.
          </p>

          <div className="user-name">
            <div className="first-name">
              <label htmlFor="first-name" className="authentication-label">
                First Name
              </label>
              <input
                type="text"
                className="authentication-input"
                id="first-name"
                placeholder="First Name"
              />
            </div>
            <div className="last-name">
              <label htmlFor="last-name" className="authentication-label">
                Last Name
              </label>
              <input
                type="text"
                className="authentication-input"
                id="last-name"
                placeholder="Last Name"
              />
            </div>
          </div>

          <label htmlFor="email" className="authentication-label">
            Email
          </label>
          <input
            type="text"
            className="authentication-input"
            id="email"
            placeholder="Enter your email"
          />
          <label htmlFor="password" className="authentication-label">
            Password
          </label>
          <div className="password-box">
            <input
              type={isPassVisible ? "text" : "password"}
              className="password-input"
              id="password"
              placeholder="Enter your password"
            />
            {!isPassVisible && (
              <VisibilityOffIcon
                onClick={() => {
                  setIsPassVisible(!isPassVisible);
                }}
                sx={{ color: "#cdcdcd", marginRight: "8px", cursor: "pointer" }}
              />
            )}
            {isPassVisible && (
              <VisibilityIcon
                onClick={() => {
                  setIsPassVisible(!isPassVisible);
                }}
                sx={{ color: "#cdcdcd", marginRight: "8px", cursor: "pointer" }}
              />
            )}
          </div>
          <label htmlFor="password" className="authentication-label">
            Confirm Password
          </label>
          <div className="password-box">
            <input
              type={isConfirmPassVisible ? "text" : "password"}
              className="password-input"
              id="confirm-password"
              placeholder="Confirm your password"
            />
            {!isConfirmPassVisible && (
              <VisibilityOffIcon
                onClick={() => {
                  setIsConfirmPassVisible(!isConfirmPassVisible);
                }}
                sx={{ color: "#cdcdcd", marginRight: "8px", cursor: "pointer" }}
              />
            )}
            {isConfirmPassVisible && (
              <VisibilityIcon
                onClick={() => {
                  setIsConfirmPassVisible(!isConfirmPassVisible);
                }}
                sx={{ color: "#cdcdcd", marginRight: "8px", cursor: "pointer" }}
              />
            )}
          </div>

          <div className="remember-me">
            <input type="checkbox" />{" "}
            <span className="remember-me-text">Remember me for 30 days</span>
            <span className="forgot-password-text"> Forgot password</span>
          </div>

          <Button
            className="signin-button"
            variant="contained"
            disableElevation
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
