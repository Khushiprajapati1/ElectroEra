const express = require('express');
const {toggleWishlist,getWishList} = require('../controllers/wishlist-controller');

const wishlistRouter = express.Router();

wishlistRouter.route("/toggleWishlist").post(toggleWishlist);
wishlistRouter.route("/getWishlist").post(getWishList);




module.exports = wishlistRouter;