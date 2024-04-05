const Chat = require("../models/Chat");

class FindOrCreateChatController {
  async findOrCreateChat(req, res) {
    try {
      const { client, owner, productId, message } = req.body;

      let existingChat = await Chat.findOne({
        client,
        owner,
        productId,
      });

      if (existingChat) {
        return res
          .status(200)
          .json({ message: "Chat found", chat: existingChat });
      }

      // Create a new chat instance
      const newChat = new Chat({
        client,
        owner,
        productId,
        messages: [message],
        date: new Date(),
      });

      // Save the new chat to the database
      await newChat.save();

      res.status(201).json({ message: "New chat created", chat: newChat });
    } catch (error) {
      console.error("Error creating or finding chat:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = FindOrCreateChatController;
