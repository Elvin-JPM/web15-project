const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, index: true },
  photo: String,
  description: String,
  sale: { type: Boolean, index: true },
  price: Number,
  tags: [{ type: String, index: true }],
  date: { type: Date, index: true },
  owner: { type: String, index: true },
  favs: [{ type: String }],
  reserved: Boolean,
  sold: Boolean,
});

productSchema.statics.filters = function (filter, skip, limit) {
  const query = Product.find(filter).sort({ date: -1 }).skip(skip).limit(limit);
  return query.exec();
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
