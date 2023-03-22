import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
// import Peer from "simple-peer";
import { SOCKET_CONNECTION_URL } from "./config/apiUrls";

const SocketContext = createContext();

// const socket = io(SOCKET_CONNECTION_URL);
const socket = "test";

const ContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
