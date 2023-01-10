const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/userMiddleware");

const { updateStatus, updateName } = require("../controllers/userController");

router.route("/update-name").post(isLoggedIn, updateName);
router.route("/update-status").post(updateStatus);

module.exports = router;
