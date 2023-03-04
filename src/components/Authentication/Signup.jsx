import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence, motion } from "framer-motion";
import AuthError from "./AuthError";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { postSignup } from "../../thunks";
import AuthLeft from "./AuthLeft";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const authButton = useSelector((state) => state.authReducer.authButton);

  const token = useSelector((state) => state.authReducer.token);

  // yup validation
  const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(10).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
    rememberMe: yup.string(),
  });
  const onSubmit = (data) => {
    dispatch(postSignup(data));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (token) navigate("/chatUI");
  }, [token]);

  return (
    <div className="signup-auth flex h-full w-full">
      <AuthLeft signup={"signup"} />

      <section className="grid place-items-center basis-full overflow-auto overflow-x-hidden md:overflow-hidden md:basis-2/3 ">
        <div className="flex flex-col items-start m-4 w-4/5">
          <h1 className="text-3xl font-bold text-primary mb-6">SocioPlus</h1>
          <h1 className="text-xl mb-1 font-semibold">Sign in</h1>
          <p className="text-sm text-gray-500 font-semibold mb-6 ">
            Few steps away from connecting to the world.
          </p>
          <form
            className="validation-form w-full "
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* name */}
            <div className="flex flex-col gap-1 w-full md:gap-3 md:flex-row mb-4">
              <div className="name flex-1">
                <label
                  htmlFor="first-name"
                  className="block text-sm mb-1 text-input font-medium"
                >
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  className="bg-input p-2 text-sm rounded-xl text-input border-2 border-input focus:border-input-focus outline-0 w-full"
                  id="first-name"
                  placeholder="First Name"
                />
                {<AuthError errors={errors} field="firstName" />}
              </div>
              <div className="name flex-1">
                <label
                  htmlFor="last-name"
                  className="block text-sm mb-1 text-input font-medium"
                >
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  className="bg-input p-2 text-sm rounded-xl text-input border-2 border-input focus:border-input-focus outline-0 w-full"
                  id="last-name"
                  placeholder="Last Name"
                />
                {<AuthError errors={errors} field="lastName" />}
              </div>
            </div>
            {/* email */}
            <div className="flex flex-col gap-1 w-full md:gap-3 md:flex-row mb-4">
              <div className="name flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm mb-1 text-input font-medium"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="text"
                  className="bg-input p-2 text-sm rounded-xl text-input border-2 border-input focus:border-input-focus outline-0 w-full"
                  id="email"
                  placeholder="Email"
                />
                {<AuthError errors={errors} field="email" />}
              </div>
              <div className="name flex-1">
                <label
                  htmlFor="phone-number"
                  className="block text-sm mb-1 text-input font-medium"
                >
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber")}
                  type="text"
                  className="bg-input p-2 text-sm rounded-xl text-input border-2 border-input focus:border-input-focus outline-0 w-full"
                  id="phone-number"
                  placeholder="Phone Number"
                />
                {<AuthError errors={errors} field="phoneNumber" />}
              </div>
            </div>
            {/* password */}
            <div className="flex flex-col gap-1 w-full md:gap-3 md:flex-row mb-4">
              <div className="pass flex-1">
                <label
                  htmlFor="password"
                  className="block text-sm mb-1 text-input font-medium"
                >
                  Password
                </label>
                <div className="flex items-center bg-input border-2 rounded-xl border-input focus:border-input-focus">
                  <input
                    {...register("password")}
                    type={isPassVisible ? "text" : "password"}
                    className="bg-input p-2 rounded-xl text-sm text-input outline-0 w-full "
                    id="password"
                    placeholder="Enter your password"
                  />
                  {!isPassVisible && (
                    <VisibilityOffIcon
                      onClick={() => {
                        setIsPassVisible(!isPassVisible);
                      }}
                      className="mr-2"
                      sx={{
                        color: "#cdcdcd",
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
                {<AuthError errors={errors} field="password" />}
              </div>
              <div className="pass flex-1">
                <label
                  htmlFor="password"
                  className="block text-sm mb-1 text-input font-medium"
                >
                  Confirm Password
                </label>
                <div className="flex items-center bg-input border-2 rounded-xl border-input focus:border-input-focus">
                  <input
                    {...register("confirmPassword")}
                    type={isConfirmPassVisible ? "text" : "password"}
                    className="bg-input p-2  rounded-xl text-sm text-input outline-0 w-full "
                    id="confirm-password"
                    placeholder="Confirm your password"
                  />
                  {!isConfirmPassVisible && (
                    <VisibilityOffIcon
                      onClick={() => {
                        setIsConfirmPassVisible(!isConfirmPassVisible);
                      }}
                      className="mr-2"
                      sx={{
                        color: "#cdcdcd",
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
                {<AuthError errors={errors} field="confirmPassword" />}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="accent-primary cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-sm ml-2 mr-auto text-input"
              >
                Remember me for 30 days
              </label>
              <span className="text-primary text-sm font-semibold cursor-pointer">
                Forgot password?
              </span>
            </div>
            <button
              type="submit"
              className={`bg-primary flex justify-center text-white block px-4 py-2 rounded-xl w-full mt-6 ${
                authButton === "loading" ? "opacity-80 pointer-events-none" : ""
              } `}
            >
              {authButton === "loading" ? (
                <CircularProgress size={"25px"} sx={{ color: "white" }} />
              ) : (
                "Sign in"
              )}
            </button>
            <p
              className=" text-sm text-center mt-8 mb-2"
              onClick={() => {
                navigate("/");
              }}
            >
              Already have an account?{" "}
              <span className="text-primary font-semibold cursor-pointer">
                {" "}
                Log in{" "}
              </span>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Signup;
