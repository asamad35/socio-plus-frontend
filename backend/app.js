require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
// const fileUpload = require("express-fileupload");
var cors = require("cors");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );
app.use(morgan("tiny"));

// import routes here
const signupRoute = require("./routes/signupRoute");
// route middleware
app.use("/api/v1", signupRoute);
app.use((err, req, res, next) => {
  //   console.error(err.stack);
  res.status(500).json({
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
