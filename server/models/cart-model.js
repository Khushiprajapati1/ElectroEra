const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  quantity: { type: Number, required: true, default: 1 },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalPrice : {type: Number,default:0}
});

const Cart = new model("Cart", cartSchema);

module.exports = Cart;
