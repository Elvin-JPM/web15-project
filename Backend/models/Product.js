const mongoose = require ('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, index: true},
        photo: String,
        description: String,
        sale: { type: Boolean, index: true},
        price: Number,
        tags: [{ type: String, index: true }],
        date: { type: Date, index: true},
        owner: { type: String, index: true}
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;