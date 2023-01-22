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
  console.log({ existingChat });

  if (existingChat.length > 0) {
    res.json({ message: "chat already exist" });
  } else {
    // create new chat
    const newChat = await chatSchema.create({
      users: [otherUserID, req.user._id],
    });

    res.json({ newChat });
  }
});

exports.fetchChatList = bigPromise(async (req, res) => {
  const findQuery = { users: { $elemMatch: { $eq: req.user._id } } };
  const chatList = await chatSchema.find(findQuery).sort({ updatedAt: "desc" });

  res.json({ chatList });
});
