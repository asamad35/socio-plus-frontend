require("dotenv").config();
const app = require("./app");
const connectWithDb = require("./config");

connectWithDb();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("a user connected", { socketID: socket.id });

  // add user to list of online users
  socket.on("new-user", (user) => {
    onlineUsers.push({ ...user, socketID: socket.id });
    // console.log({ userId, socketID: socket.id });
    io.emit("onlinUsersList", onlineUsers);
  });

  // user joining room based on chat id
  socket.on("chatSelected", ({ loggedUser, selectedChat }) => {
    socket.join(selectedChat._id);
    // console.log(
    //   "user " + loggedUser._id + " joined the room " + selectedChat._id
    // );
  });

  socket.on("newMessage", (message) => {
    socket.to(message.chat).emit("updateMessages", message);
  });

  socket.on("typing", (selectedChat) => {
    console.log("startTyping");
    socket.to(selectedChat._id).emit("userIsTyping");
  });

  socket.on("stoppedTyping", (selectedChat) => {
    console.log("stoppedTyping");
    socket.to(selectedChat._id).emit("userStoppedTyping");
  });

  // user leaving room based on chat id
  socket.on("leaveRoom", ({ loggedUser, selectedChat }) => {
    socket.leave(selectedChat._id);
  });

  socket.on("disconnecting", () => {
    // remove user from online list
    onlineUsers = onlineUsers.filter((el) => {
      // console.log(el.socketID, socket.id);
      return el.socketID !== socket.id;
    });
    // console.log({ onlineUsers });
    io.emit("onlinUsersList", onlineUsers);

    console.log("socket disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.Port}`);
});
