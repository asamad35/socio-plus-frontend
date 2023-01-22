require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

app.use(morgan("tiny"));

// import routes here
const signupRoute = require("./routes/signupRoute");
const editProfileRoute = require("./routes/editProfileRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");
// route middleware
app.use("/api/v1", signupRoute);
app.use("/api/v1", editProfileRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/message", messageRoute);
app.use((err, req, res, next) => {
  //   console.error(err.stack);
  res.status(200).json({
    message: err.message,
    code: err.code,
    name: err.name,
    stack: err.stack,
  });
});
// app.post("/api/v1/signup", (req, res) => {
//   res.send("success");
// });

module.exports = app;
