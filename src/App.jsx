import { useState } from "react";
import "./App.css";
import { Container } from "@mui/material";
import SideSearch from "./components/SideSearch";
import ChatWindow from "./components/ChatWindow";

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
          width: "70%",
          borderRadius: "1.5rem",
          overflow: "hidden",
          padding: { xs: "0" },
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <SideSearch />
        <ChatWindow />
      </Container>
    </div>
  );
}

export default App;
