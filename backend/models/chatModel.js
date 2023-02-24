const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageSchema",
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
    unreadUser: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatSchema", chatSchema);
