const Chat = require("../models/Chat");

class GetAllChatsController {
  async getProductChats(req, res, next) {
    try {
      const productId = req.params.productId;
      const productOwner = req.params.owner;
      console.log("Inside GetAllChatsController", productId, productOwner);

      const allChatsForOneProduct = await Chat.find({
        $and: [{ productId: productId }, { owner: productOwner }],
      });

      if (allChatsForOneProduct.length === 0) {
        return res.status(200).json({
          message: "No chats found for the given criteria",
          numChats: 0,
          data: allChatsForOneProduct,
        });
      }

      res.status(200).json({
        message: "Chats found",
        chats: allChatsForOneProduct,
        numChats: allChatsForOneProduct.length,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GetAllChatsController;
