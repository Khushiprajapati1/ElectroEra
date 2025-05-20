const { Schema, model } = require("mongoose");

const wishListSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Wishlist = new model("Wishlist", wishListSchema);

module.exports = Wishlist;