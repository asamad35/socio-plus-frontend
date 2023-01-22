const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/userMiddleware");
const {
  sendMessage,
  fetchAllMessages,
} = require("../controllers/messageController");

router.route("/send-message").post(isLoggedIn, sendMessage);
router.route("/fetch-all-messages").post(isLoggedIn, fetchAllMessages);

module.exports = router;
