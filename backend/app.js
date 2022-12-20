require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
// const fileUpload = require("express-fileupload");

// middlewares
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );
app.use(morgan("tiny"));

// route
// const signupRoute = require("./routes/signupRoute");

module.exports = app;
