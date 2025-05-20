const { Schema, model, get } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true, get: Math.round, set: Math.round },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true },
});

const Product = new model("Product", productSchema);

module.exports = Product; 
