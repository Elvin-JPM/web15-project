const Chat = require("../models/Chat");

class InsertChatMessageController {
  async insertChatMessage(req, res, next) {
    const chatId = req.params.chatId;
    const { message, from, date } = req.body; // {message: new-message, from: who-wrote-the-message, date: new Date()}

    console.log("New message:", { message, from, date });
    console.log(chatId);
    try {
      const updatedChat = await Chat.findOneAndUpdate(
        { _id: chatId },
        { $push: { messages: { message, from, date } } },
        { new: true }
      );

      if (!updatedChat) {
        res.json({ success: false, message: "Chat not found" });
      }

      //   const serializedChat = updatedChat.toObject({
      //     getters: true,
      //     virtuals: true,
      //   });
      console.log(updatedChat);

      res.status(200).json({ success: true, chat: updatedChat });
    } catch (error) {
      console.error("Error updating chat:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = InsertChatMessageController;
