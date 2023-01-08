const express = require("express");
const router = express.Router();

const { changeStatus } = require("../controllers/userController");

router.route("/change-status").post(changeStatus);

module.exports = router;
