const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/userMiddleware");
const { accessChat, fetchChatList } = require("../controllers/chatController");

router.route("/access-chat").post(isLoggedIn, accessChat);
router.route("/get-chat-list").get(isLoggedIn, fetchChatList);

module.exports = router;
