import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
// import GoogleIcon from "@mui/icons-material/Google";
import GoogleIcon from "../../assets/google-icon.svg";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import AuthError from "./AuthError";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../../thunks";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPassVisible, setisPassVisible] = useState(false);
  const token = useSelector((state) => state.authReducer.token);
  const authButton = useSelector((state) => state.authReducer.authButton);

  // yup validation
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(10).required(),
    rememberMe: yup.string(),
  });

  useEffect(() => {
    if (token) navigate("/chatUI");
  }, [token]);

  const onSubmit = (data) => {
    dispatch(postLogin(data));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "abdus@gmail.com",
      password: "123456",
    },
  });

  return (
    <div className="authentication">
      {/* // <div className="authentication"> */}
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

          <form className="validation-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="authentication-label">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              className="authentication-input"
              id="email"
              placeholder="Enter your email"
            />
            {<AuthError errors={errors} field="email" />}

            <label htmlFor="password" className="authentication-label">
              Password
            </label>
            <div className="password-box">
              <input
                {...register("password")}
                type={isPassVisible ? "text" : "password"}
                className="password-input"
                id="password"
                placeholder="Enter your password"
              />
              {!isPassVisible && (
                <VisibilityOffIcon
                  onClick={() => {
                    setisPassVisible(!isPassVisible);
                  }}
                  sx={{
                    color: "#cdcdcd",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                />
              )}
              {isPassVisible && (
                <VisibilityIcon
                  onClick={() => {
                    setisPassVisible(!isPassVisible);
                  }}
                  sx={{
                    color: "#cdcdcd",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
            {<AuthError errors={errors} field="password" />}

            <div className="remember-me">
              <input type="checkbox" />{" "}
              <span className="remember-me-text">Remember me for 30 days</span>
              <span className="forgot-password-text"> Forgot password</span>
            </div>

            <Button
              type="submit"
              className={`auth-button signin-button ${
                authButton === "loading" ? "loading-button" : ""
              } `}
              variant="contained"
              disableElevation
            >
              {
                authButton === "loading" ? (
                  <CircularProgress size={"25px"} className="button-loader" />
                ) : (
                  "Log in"
                )
                // "Log in"
              }
            </Button>
            <Button
              className="google-signin-button"
              variant="contained"
              disableElevation
            >
              {/* <GoogleIcon sx={{ color: "red", marginRight: "4px" }} /> */}
              <img className="google-icon" src={GoogleIcon} alt="" srcset="" />
              Sign in with Google
            </Button>
          </form>

          <p
            className="go-to-signup"
            onClick={() => {
              navigate("/");
            }}
          >
            Don't have an account yet? <span> Sign Up </span>
          </p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Login;
