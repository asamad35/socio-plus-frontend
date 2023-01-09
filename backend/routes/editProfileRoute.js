const express = require("express");
const router = express.Router();

const { updateStatus, updateName } = require("../controllers/userController");

router.route("/update-status").post(updateStatus);
router.route("/update-name").post(updateName);

module.exports = router;
