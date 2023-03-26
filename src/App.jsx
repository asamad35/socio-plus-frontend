import "./index.scss";
import { Container } from "@mui/material";
import SideSearch from "./components/sideSearch/SideSearch";
import ChatWindow from "./components/chatWindow/ChatWindow";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import InfoDrawer from "./components/InfoDrawer";

import { Route, Routes, useNavigate } from "react-router-dom";
import ReactSlideRoutes from "react-slide-routes";
import ToastMessage from "./components/ToastMessage";
import { ContextProvider } from "./SocketPeerContext";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  resetAuthReducer,
  resetChatReducer,
  setSelectedChat,
} from "./redux/actions";
import { useEffect, useState } from "react";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatReducer = useSelector((state) => state.chatReducer);
  const token = useSelector((state) => state.authReducer.token);
  const [test, setTest] = useState(false);

  useEffect(() => {
    const chatReducerSize = Object.keys(chatReducer).length;
    if (chatReducerSize !== 22) {
      dispatch(logout());
      dispatch(setSelectedChat(null));
      dispatch(resetAuthReducer());
      dispatch(resetChatReducer());
      navigate("/");
    }
    setTest(true);

    console.log("i am in effect", { chatReducerSize });
  }, []);

  console.log("i am in app");

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
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/chatUI"
            element={
              test && token ? (
                <>
                  <div className="flex w-full h-full md:rounded-2xl">
                    <SideSearch />
                    <ChatWindow />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center w-full h-full font-bold text-primary text-3xl ">
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Login to cotinue
                  </p>
                </div>
              )
            }
          />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center w-full h-full font-bold text-primary text-3xl ">
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login to cotinue
                </p>
              </div>
            }
          />
        </ReactSlideRoutes>
        {/* </Routes> */}
      </section>
    </div>
  );
}
