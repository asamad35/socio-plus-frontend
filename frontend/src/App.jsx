import "./App.scss";
import { Container } from "@mui/material";
import SideSearch from "./components/sideSearch/SideSearch";
import ChatWindow from "./components/chatWindow/ChatWindow";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import InfoDrawer from "./components/InfoDrawer";

import { Route } from "react-router-dom";
import ReactSlideRoutes from "react-slide-routes";
import ToastMessage from "./components/ToastMessage";

function App() {
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
        <ToastMessage />

        <ReactSlideRoutes duration={500} timing={"ease-in-out"}>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chatUI"
            element={
              <>
                <div style={{ display: "flex", height: "100%" }}>
                  <InfoDrawer />
                  <SideSearch />
                  <ChatWindow />
                </div>
              </>
            }
          />
        </ReactSlideRoutes>
      </Container>
    </div>
  );
}

export default App;
