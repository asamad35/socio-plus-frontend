import "./App.scss";
import { Container } from "@mui/material";
import SideSearch from "./components/SideSearch";
import ChatWindow from "./components/chatWindow/ChatWindow";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ReactSlideRoutes from "react-slide-routes";

function App() {
  const location = useLocation();
  return (
    <div className="outer">
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "90%",
          width: "60%",
          borderRadius: "1.5rem",
          overflow: "hidden",
          padding: { xs: "0" },
          position: "relative",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {/* <>
          <SideSearch />
          <ChatWindow />
        </> */}

        {/* <AnimatePresence>
          <Routes location={location} key={location.pathname}> */}
        <ReactSlideRoutes duration={500} timing={"ease-in-out"}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </ReactSlideRoutes>
        {/* </Routes>
        </AnimatePresence> */}
      </Container>
    </div>
  );
}

export default App;
