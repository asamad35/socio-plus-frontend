const express = require("express");
const router = express.Router();

const { signup, login, allUsers } = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/search-users").get(allUsers);

module.exports = router;
