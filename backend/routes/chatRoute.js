const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/userMiddleware");
const { accessChat, fetchChatList } = require("../controllers/chatController");

router.route("/access-chat").post(isLoggedIn, accessChat);
router.route("/fetch-chat-list").post(isLoggedIn, fetchChatList);

module.exports = router;
