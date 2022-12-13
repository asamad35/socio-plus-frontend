import { Button } from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  return (
    <div className="authentication">
      <div className="authentication-left">
        <div className="image"></div>
      </div>

      <div className="authentication-right">
        <div className="right-inner">
          <h1 className="app-name">SocioPlus</h1>
          <h1 className="heading">Log in</h1>
          <p className="heading-info">
            Welcome back! Please enter your details.
          </p>

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
          <input
            type="text"
            className="authentication-input"
            id="password"
            placeholder="Enter your password"
          />

          <div className="remember-me">
            <input type="checkbox" />{" "}
            <span className="remember-me-text">Remember for 30 days</span>
            <span className="forgot-password-text"> Forgot password</span>
          </div>

          <Button
            className="signin-button"
            variant="contained"
            disableElevation
          >
            Sign in
          </Button>
          <Button
            className="google-signin-button"
            variant="contained"
            disableElevation
          >
            <GoogleIcon sx={{ color: "red", marginRight: "4px" }} /> Sign in
            with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
