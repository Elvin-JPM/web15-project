const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  client: { type: String, index: true },
  owner: { type: String, index: true },
  productId: { type: String, index: true },
  messages: {
    type: [
      {
        message: String,
        from: String,
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  date: { type: Date, index: true, default: Date.now },
});

chatSchema.statics.filters = function (filter, skip, limit) {
  const query = Chat.find(filter).sort({ date: -1 }).skip(skip).limit(limit);
  return query.exec();
};

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
