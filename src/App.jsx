import "./index.scss";
import { Container } from "@mui/material";
import SideSearch from "./components/sideSearch/SideSearch";
import ChatWindow from "./components/chatWindow/ChatWindow";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import InfoDrawer from "./components/InfoDrawer";

import { Route, Routes } from "react-router-dom";
import ReactSlideRoutes from "react-slide-routes";
import ToastMessage from "./components/ToastMessage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginWithGoogleSuccess } from "./thunks/index";

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    if (!token) dispatch(getLoginWithGoogleSuccess());
  }, []);

  return (
    <div
      className="grid w-screen place-items-center bg-secondary"
      style={{ height: "100dvh" }}
    >
      <section className="bg-white h-full w-full relative md:w-4/5 md:h-5/6 md:rounded-2xl md:max-w-5xl md:shadow-2xl">
        <ToastMessage />
        {/* <Routes> */}
        <ReactSlideRoutes duration={500} timing={"ease-in-out"}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Signup />} />
          <Route
            path="/chatUI"
            element={
              <>
                <div className="flex w-full h-full md:rounded-2xl">
                  <SideSearch />
                  <ChatWindow />
                  <InfoDrawer />
                </div>
              </>
            }
          />
        </ReactSlideRoutes>
        {/* </Routes> */}
      </section>
    </div>
  );
}
