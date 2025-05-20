const express = require('express');
const {addToCart,cartByUser, updateCart, removeFromCart} = require('../controllers/cart-controller');
// const {addProduct,listProduct,removeProduct,singleProduct} = require('../controllers/product-controller');
const cartRouter = express.Router();

// productRouter.route("/add").post(addProduct);
// productRouter.route("/list").get(listProduct);
// productRouter.route("/remove").post(removeProduct);
// productRouter.route("/single").post(singleProduct);

cartRouter.route("/addToCart").post(addToCart);
cartRouter.route("/fetchUser").post(cartByUser);
cartRouter.route("/updateQuantity").put(updateCart);
cartRouter.route("/removeItemFromCart").delete(removeFromCart);


module.exports = cartRouter;
