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
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          index="true"
          element={<Login />}
          // errorElement={<ErrorBoundary />}
        />
        <Route
          element={<Signup />}
          path="signup"
          // errorElement={<ErrorBoundary />}
        />
      </Route>
    )
  );
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
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {/* <>
          <SideSearch />
          <ChatWindow />
        </> */}

        {/* <Login /> */}
        {/* <Signup /> */}

        <RouterProvider router={router} />
      </Container>
    </div>
  );
}

export default App;
