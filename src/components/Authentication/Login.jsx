import { Button } from "@mui/material";
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

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prevPage = useSelector((state) => state?.testReducer?.prevPage);
  const nextPage = useSelector((state) => state?.testReducer?.nextPage);
  const [isPassVisible, setisPassVisible] = useState(false);

  // yup validation
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(10).required(),
    rememberMe: yup.string(),
  });
  console.log(prevPage, nextPage, "in login page");

  const onSubmit = (data) => console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    console.log("mountinggggggggg");

    return () => {
      dispatch(actions.setPrevPage("login"));
    };
  }, []);
  function getInitialAnimation(prevPage, nextPage) {
    // if (prevPage === null) return 0;
    if (prevPage === nextPage) {
      return "100%";
    } else {
      return "-100%";
    }
  }
  function getInAnimation(prevPage, nextPage) {
    return 0;
  }
  function getOutAnimation(prevPage, nextPage) {
    if (prevPage === nextPage) {
      return "100%";
    } else {
      return "-100%";
    }
  }

  const pageVariants = {
    initial: {
      // opacity: 0,
      x: getInitialAnimation(prevPage, nextPage),
      // scale: 0.8,
    },
    in: {
      // opacity: 1,
      x: getInAnimation(prevPage, nextPage),
      // scale: 1,
    },
    out: {
      // opacity: 0,
      x: getOutAnimation(prevPage, nextPage),
      // scale: 1.2,
    },
  };
  const pageTransition = {
    // type: "tween",
    // ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div
      // initial="initial"
      // animate="in"
      // exit="out"
      // variants={pageVariants}
      // transition={pageTransition}
      className="authentication"
    >
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
              {/* <GoogleIcon sx={{ color: "red", marginRight: "4px" }} /> */}
              <img className="google-icon" src={GoogleIcon} alt="" srcset="" />
              Sign in with Google
            </Button>
          </form>

          <p
            className="go-to-signup"
            onClick={() => {
              dispatch(actions.setNextPage("signup"));
              // dispatch(actions.setPrevPage("login"));
              navigate("/");
            }}
          >
            Don't have an account yet? <span> Sign Up </span>
          </p>
        </div>
      </div>
      {/* </div> */}
    </motion.div>
  );
};

export default Login;
