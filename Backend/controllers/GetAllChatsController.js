const Chat = require("../models/Chat");

class GetAllChatsController {
  async getProductChats(req, res, next) {
    try {
      const productId = req.params.id;
      const productOwner = req.params.owner;

      const allChatsForOneProduct = await Chat.find({
        $and: [{ productId: productId }, { receiver: productOwner }],
      });

      if (allChatsForOneProduct.length === 0) {
        return res.status(404).json({
          message: "No chats found for the given criteria",
          numChats: 0,
        });
      }

      res
        .status(200)
        .json({ message: "Chats found", chats: allChatsForOneProduct });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GetAllChatsController;
