const BigPromise = require("../middlewares/bigPromise");
const UserSchema = require("../models/userModel");

exports.signup = BigPromise(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  const user = await UserSchema.create({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  res.status(200).json({
    user,
  });
});
