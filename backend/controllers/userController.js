const BigPromise = require("../middlewares/bigPromise");
const UserSchema = require("../models/userModel");

exports.signup = BigPromise(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  res.status(200).json({
    success: true,
    firstName,
    lastName,
    email,
    password,
  });
});
