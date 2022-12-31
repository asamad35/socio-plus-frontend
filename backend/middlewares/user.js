const bigPromise = require("./bigPromise");

exports.isLoggedIn = bigPromise(async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    res.json({ message: "Please login first to continue" });
    return next();
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.json({ decoded });
  next();
});
