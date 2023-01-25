const bigPromise = require("../middlewares/bigPromise");
const chatSchema = require("../models/chatModel");

exports.accessChat = bigPromise(async (req, res) => {
  const { otherUserID } = req.body;

  //   first find if chat exist
  const findQuery = {
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: otherUserID } } },
    ],
  };
  const existingChat = await chatSchema.find(findQuery);

  if (existingChat.length > 0) {
    res.json({ data: existingChat[0] });
  } else {
    // create new chat
    const newChat = await chatSchema.create({
      users: [otherUserID, req.user._id],
    });

    const populatedNewChat = await chatSchema
      .find({ _id: newChat._id })
      .populate("users");

    res.json({ data: populatedNewChat[0] });
  }
});

exports.fetchChatList = bigPromise(async (req, res) => {
  const findQuery = { users: { $elemMatch: { $eq: req.user._id } } };
  let chatList = await chatSchema
    .find(findQuery)
    .sort({ updatedAt: "desc" })
    .populate("users")
    .populate("latestMessage");

  res.json({ data: chatList });
});
