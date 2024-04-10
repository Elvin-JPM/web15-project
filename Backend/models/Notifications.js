const mongoose = require("mongoose");

const notificationsSchema = mongoose.Schema({
  recipient: { type: String, index: true },
  sender: { type: String, index: true },
  productId: { type: String, index: true },
  productName: { type: String },
  type: { type: String },
  message: { type: String },
  date: { type: Date, default: Date.now, index: true },
  read: { type: Boolean, default: false, index: true },
});

notificationsSchema.statics.filters = function (filter, skip, limit) {
  const query = Notifications.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);
  return query.exec();
};

const Notifications = mongoose.model("Notifications", notificationsSchema);
module.exports = Notifications;
