const bigPromise = require("../middlewares/bigPromise");
const UserSchema = require("../models/userModel");
const cloudinary = require("cloudinary").v2;

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
    message: "Registration successful",
  });
});

exports.login = bigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email }).select("+password");

  // check if user exist
  if (!user) throw new Error("email is not registered");

  const isPasswordValid = await user.isPasswordValid(password);

  if (!isPasswordValid) throw Error("Password does not match.");

  res.status(200).json({
    data: user,
    token: user.getJwtToken(),
    message: "Login successful",
  });
});

exports.updateStatus = bigPromise(async (req, res, next) => {
  const { email, status } = req.body;

  const user = await UserSchema.findOne({ email });

  user.status = status;
  // throw new Error("status not updated");

  await user.save();

  res.status(200).json({ data: user, message: "status updated successfully" });
});

exports.updateName = bigPromise(async (req, res, next) => {
  const { email, name } = req.body;

  const user = await UserSchema.findOne({ email });

  user.firstName = name.split(" ")[0];
  user.lastName = name.split(" ")[1] ?? "";
  console.log(user.firstName, user.lastName, "lllllllllllllll");
  // throw new Error("status not updated");

  await user.save();

  res.status(200).json({ data: user, message: "Name updated successfully" });
});

exports.allUsers = bigPromise(async (req, res, next) => {
  const dynamicRegex = new RegExp("^" + req.query.search);
  const keyword = req.query.search
    ? {
        $and: [
          {
            $or: [
              { firstName: { $regex: dynamicRegex, $options: "i" } },
              { email: { $regex: dynamicRegex, $options: "i" } },
            ],
          },
          { email: { $not: { $regex: req.user.email, $options: "i" } } },
        ],
      }
    : {};

  const users = await UserSchema.find(keyword);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await sleep(2000);
  res.json({ data: users, message: "list of users" });
});

exports.updatePhoto = bigPromise(async (req, res, next) => {
  console.log("i am running", req.files, req.body);

  if (!req.files) {
    throw new Error("No photo found");
  }
  const uploadedData = await cloudinary.uploader.upload(
    req.files.profilePic.tempFilePath,
    {
      folder: "chatApp",
    }
  );

  const user = await UserSchema.findOne({ email: req.user.email });
  user.photoUrl = uploadedData.secure_url;

  await user.save();

  res.json({ data: user, message: "Profile pic updated successfully" });
});
