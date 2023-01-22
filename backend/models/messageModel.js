const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatSchema",
    },
    content: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MessageSchema", messageSchema);
