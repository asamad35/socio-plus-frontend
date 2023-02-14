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

io.on("connection", (socket) => {
  console.log("a user connected");

  // user joining room based on chat id
  socket.on("chatSelected", ({ loggedUser, selectedChat }) => {
    socket.join(selectedChat._id);
    console.log(
      "user " + loggedUser._id + " joined the room " + selectedChat._id
    );
  });

  socket.on("newMessage", (message) => {
    socket.to(message.chat).emit("updateMessages", message);
    console.log({ message });
  });

  // user leaving room based on chat id
  socket.on("leaveRoom", ({ loggedUser, selectedChat }) => {
    socket.leave(selectedChat._id);
    console.log(
      "user " + loggedUser._id + " left the room " + selectedChat._id
    );
  });

  socket.on("disconnecting", (loggedUser) => {
    console.log("socket disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.Port}`);
});
