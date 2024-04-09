const Notifications = require("../models/Notifications");

class CreateNewMessageNotification {
  async createNotification(req, res) {
    try {
      const { recipient, sender, message, productId } = req.body;

      // Create a new notification instance
      const newNotification = new Notifications({
        recipient,
        sender,
        message,
        productId,
      });

      // Save the new notification to the database
      await newNotification.save();

      res.status(201).json(newNotification);
    } catch (error) {
      console.error("Error creating notification", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = CreateNewMessageNotification;
