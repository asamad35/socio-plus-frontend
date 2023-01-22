const bigPromise = require("./bigPromise");
const UserSchema = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = bigPromise(async (req, res, next) => {
  console.log(req.header("Authorization"), "ppppppppppppppppppp");
  const token =
    req.body.token ||
    (req.header("Authorization") &&
      req.header("Authorization").replace("Bearer ", ""));

  console.log({ token }, "nnnnnnnn");

  if (!token) {
    throw new Error("Please login first to continue");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserSchema.findById(decoded.id).select("-password");
  next();
});
