const Notifications = require("../models/Notifications");

class MarkReadMessageController {
  async markMessage(req, res, next) {
    const notificationId = req.params.notificationId;
    const { notificationReadValue } = req.body; // {message: new-message, from: who-wrote-the-message, date: new Date()}

    try {
      const updatedNotification = await Notifications.findOneAndUpdate(
        { _id: notificationId },
        { read: notificationReadValue },
        { new: true }
      );

      if (!updatedNotification) {
        res.json({ success: false, message: "Notification not found" });
      }

      res.status(200).json({ success: true, chat: updatedNotification });
    } catch (error) {
      console.error("Error updating notification:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = MarkReadMessageController;
