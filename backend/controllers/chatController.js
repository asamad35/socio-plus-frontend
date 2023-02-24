const bigPromise = require("../middlewares/bigPromise");
const chatSchema = require("../models/chatModel");
const mongoose = require("mongoose");

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

exports.updateLatestMessage = bigPromise(
  async ({ message, socket, io, onlineUsers }) => {
    // create a chatListEl according to frontend need
    const chatListEl = {
      ...message.selectedChat,
      unreadCount: message.selectedChat.unreadCount + 1,
      latestMessage: {
        ...message.selectedChat.latestMessage,
        content: message.content,
      },
    };
    const allSocketsInRoom = await io.in(message.chat).fetchSockets();

    // allSocketsInRoom.forEach((el) => {
    //   // if it is otherUser
    //   if (socket.id !== el.id) {
    //     const isUserOnline = !!onlineUsers.find(
    //       (onlineUser) => onlineUser.socketID === el.id
    //     );

    //     if (isUserOnline) {
    //       console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", socket.id);
    //       socket.to(message.chat).emit("updateLatestMessage", chatListEl);
    //     }
    //   }
    // });

    // check if otherUser is online

    const isOtherUserOnline = onlineUsers.some(
      (el) => el._id === message.otherUserId
    );
    const isOtherUserInRoom = allSocketsInRoom.length === 2 ? true : false;
    const otherUserSocketId = isOtherUserOnline
      ? onlineUsers.find((el) => el._id === message.otherUserId).socketID
      : null;

    console.log({ isOtherUserOnline, otherUserSocketId, isOtherUserInRoom });

    // if otherUser is in the room then do nothing
    // if it's not in the room emit and update on db
    // if its offline then only update in db

    //  if it's not in the room emit and update on db
    if (isOtherUserOnline && !isOtherUserInRoom) {
      io.to(otherUserSocketId).emit("updateLatestMessage", chatListEl);

      const chat = await chatSchema.findOne({ _id: message.chat });
      chat.unreadCount = chat.unreadCount + 1;
      chat.unreadUser = mongoose.Types.ObjectId(message.otherUserId);

      console.log(chat, message.chat, "not in room");
      await chat.save();
    }

    // if user is offline
    if (!isOtherUserOnline) {
      const chat = await chatSchema.findOne({ _id: message.chat });
      console.log(chat.unreadCount, "pehle");
      chat.unreadCount = chat.unreadCount + 1;
      console.log(chat.unreadCount, "baadme");
      chat.unreadUser = mongoose.Types.ObjectId(message.otherUserId);

      console.log(chat, message.chat, "user offline");

      await chat.save();
    }
  }
);
