const bigPromise = require("./bigPromise");
const UserSchema = require("../models/userModel");

exports.isLoggedIn = bigPromise(async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  console.log({ token }, "nnnnnnnn");

  if (!token) {
    throw new Error("Please login first to continue");
    // res.json({ message: "Please login first to continue" });
    return next();
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserSchema.findById(decoded.id).select("-password");

  // res.json({ decoded });
  next();
});
