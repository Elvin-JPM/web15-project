const Notifications = require("../models/Notifications");

class FindUserNotifications {
  async findNotifications(req, res) {
    try {
      const { recipient } = req.params;
      const notifications = await Notifications.find({ recipient });

      res.status(200).json(notifications);
    } catch (error) {
      console.error("Error retrieving notifications", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = FindUserNotifications;
