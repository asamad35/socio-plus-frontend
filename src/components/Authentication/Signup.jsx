import { Button } from "@mui/material";
import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";

const Signup = () => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

  // yup validation
  const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(10).required(),
    confirmPassword: yup.string().required(),
    rememberMe: yup.string(),
  });
  const onSubmit = (data) => console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
          <form className="validation-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="user-name">
              <div className="first-name">
                <label htmlFor="first-name" className="authentication-label">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  className="authentication-input"
                  id="first-name"
                  placeholder="First Name"
                />
                <AnimatePresence>
                  {errors.firstName && (
                    <motion.div
                      className="errorPara"
                      key="errorDiv"
                      initial={{
                        opacity: 0,
                        transform: "translateX(-100%)",
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        transform: "translateX(0%)",
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transform: "translateX(-100%)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {errors.firstName?.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="last-name">
                <label htmlFor="last-name" className="authentication-label">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  className="authentication-input"
                  id="last-name"
                  placeholder="Last Name"
                />
                <AnimatePresence>
                  {errors.lastName && (
                    <motion.div
                      className="errorPara"
                      key="errorDiv"
                      initial={{
                        opacity: 0,
                        transform: "translateX(-100%)",
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        transform: "translateX(0%)",
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        transform: "translateX(-100%)",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {errors.lastName?.message}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
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
            <AnimatePresence>
              {errors.email && (
                <motion.div
                  className="errorPara"
                  key="errorDiv"
                  initial={{
                    opacity: 0,
                    transform: "translateX(-100%)",
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    transform: "translateX(0%)",
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transform: "translateX(-100%)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {errors.email?.message}
                </motion.div>
              )}
            </AnimatePresence>
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
                    setIsPassVisible(!isPassVisible);
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
                    setIsPassVisible(!isPassVisible);
                  }}
                  sx={{
                    color: "#cdcdcd",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.div
                  className="errorPara"
                  key="errorDiv"
                  initial={{
                    opacity: 0,
                    transform: "translateX(-100%)",
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    transform: "translateX(0%)",
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transform: "translateX(-100%)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {errors.password?.message}
                </motion.div>
              )}
            </AnimatePresence>
            <label htmlFor="password" className="authentication-label">
              Confirm Password
            </label>
            <div className="password-box">
              <input
                {...register("confirmPassword")}
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
                  sx={{
                    color: "#cdcdcd",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                />
              )}
              {isConfirmPassVisible && (
                <VisibilityIcon
                  onClick={() => {
                    setIsConfirmPassVisible(!isConfirmPassVisible);
                  }}
                  sx={{
                    color: "#cdcdcd",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.div
                  className="errorPara"
                  key="errorDiv"
                  initial={{
                    opacity: 0,
                    transform: "translateX(-100%)",
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    transform: "translateX(0%)",
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transform: "translateX(-100%)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {errors.confirmPassword?.message}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="remember-me">
              <input {...register("rememberMe")} type="checkbox" />{" "}
              <span className="remember-me-text">Remember me for 30 days</span>
              <span className="forgot-password-text"> Forgot password</span>
            </div>
            <Button
              className="signin-button"
              variant="contained"
              disableElevation
              type="submit"
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
