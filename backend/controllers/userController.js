const bigPromise = require("../middlewares/bigPromise");
const UserSchema = require("../models/userModel");

exports.signup = bigPromise(async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) throw new Error("Password does not match");

  const user = await UserSchema.create({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  res.status(200).json({
    data: user,
    token: user.getJwtToken(),
  });
});

exports.login = bigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email }).select("+password");

  // check if user exist
  if (!user)
    res
      .status(200)
      .json({ message: "email is not registered", error: "error" });

  const isPasswordValid = await user.isPasswordValid(password);

  if (!isPasswordValid) throw Error("Password does not match.");

  res.status(200).json({ data: user, token: user.getJwtToken() });
});
