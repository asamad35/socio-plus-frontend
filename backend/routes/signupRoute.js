const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/userMiddleware");
const { signup, login, allUsers } = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/search-users").post(isLoggedIn, allUsers);

module.exports = router;
