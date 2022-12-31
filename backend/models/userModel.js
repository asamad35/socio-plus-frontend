const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "First Name is a required field"],
    maxlength: [10, "First Name should be less than 10 characters"],
  },
  lastName: {
    type: String,
    require: [true, "Last Name is a required field"],
    maxlength: [10, "Last Name should be less than 10 characters"],
  },
  email: {
    type: String,
    require: [true, "Email is a required field"],
    unique: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  password: {
    type: String,
    require: [true, "Password is a required field"],
    minlength: [6, "Password should be atleast 6 characters long"],
    select: false,
  },
});

// hash pass before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// comapre user pass with hashed password
userSchema.methods.isPasswordValid = async function (userEnteredPassword) {
  return await bcrypt.compare(userEnteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("UserSchema", userSchema);
