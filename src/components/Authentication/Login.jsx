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
import AuthLeft from "./AuthLeft";

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
    <div className="log-auth flex h-full w-full ">
      <AuthLeft />
      <section className="grid place-items-center basis-full overflow-auto overflow-x-hidden md:overflow-hidden md:basis-1/2">
        <div className="flex flex-col items-start m-8">
          <h1 className="text-3xl font-bold text-primary mb-6">SocioPlus</h1>
          <h1 className="text-xl mb-1 font-semibold">Log in</h1>
          <p className="text-sm text-gray-500 font-semibold mb-6 ">
            Welcome back! Please enter your details.
          </p>

          <form className="validation-form" onSubmit={handleSubmit(onSubmit)}>
            <label
              htmlFor="email"
              className="block text-sm mb-1 text-input font-medium"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              className="bg-input p-2 text-sm rounded-xl text-input border-2 border-input focus:border-input-focus outline-0 w-full mb-4"
              id="email"
              placeholder="Enter your email"
            />
            {<AuthError errors={errors} field="email" />}

            <label
              htmlFor="password"
              className="block text-sm mb-1 text-input font-medium"
            >
              Password
            </label>
            <div className="flex items-center bg-input mb-4 border-2 rounded-xl border-input focus:border-input-focus">
              <input
                {...register("password")}
                type={isPassVisible ? "text" : "password"}
                className="bg-input p-2  rounded-xl text-sm text-input outline-0 w-full "
                id="password"
                placeholder="Enter your password"
              />
              {!isPassVisible && (
                <VisibilityOffIcon
                  onClick={() => {
                    setisPassVisible(!isPassVisible);
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="accent-primary cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-sm ml-2 mr-4 text-input"
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
                "Log in"
              )}
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className={`bg-white border-primary border-2 flex text-input justify-center items-center gap-2  px-4 py-1 rounded-xl w-full mt-6 ${
                authButton === "loading" ? "opacity-80 pointer-events-none" : ""
              } `}
            >
              <img className="w-8" src={GoogleIcon} alt="" srcset="" />
              Sign in with Google
            </button>
            <p
              className=" text-sm text-center mt-8"
              onClick={() => {
                navigate("/");
              }}
            >
              Don't have an account yet?{" "}
              <span className="text-primary font-semibold cursor-pointer">
                {" "}
                Sign Up{" "}
              </span>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
