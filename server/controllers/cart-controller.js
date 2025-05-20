const Cart = require("../models/cart-model");
//const User = require("../models/user-model");

const addToCart = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { quantity, product, user,totalPrice } = req.body;
    //console.log(totalPrice)

    if(!product){
      return res.status(400).json({
        message: "Provide Product Id",
      });
    }

    if(!user){
      return res.status(400).json({
        message: "Please Login First",
      });
    }

    if(product.stock <= 0){
      return res.status(400).json({
        message: "Product is out of stock.",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} units available in stock.`,
      });
    }

    const checkItemInCart = await Cart.findOne({ user, product });
    

    if (checkItemInCart) {
      return res.status(400).json({
        message: "Item is already in Cart",
      });
    }

    const cartItem = await Cart.create({
      quantity,
      product,
      user,
      totalPrice
    });

    // const updateCartUser = await User.updateOne(
    //   { _id: user },
    //   {
    //     $push: {
    //       cart: product,
    //     },
    //   }
    // );
//console.log(cartItem)
    res.status(201).json({
      message: "Product added to the cart",
      cartItem,
    });
  } catch (error) {
    next(error);
  }
};

const cartByUser = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { user } = req.body;
    //console.log(user)

    const cartItems = await Cart.find({ user: user })
      .populate("user")
      .populate("product");

    //console.log(cartItems);

    res.status(201).json({
      message: cartItems,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { product,quantity,user } = req.body;

    if (!quantity || !product) {
      return res.status(400).json({
        message: "Provide Product Id and Quantity both",
      });
    }

    const upadteCartItem = await Cart.updateOne(
      {
        product,
        user,
      },
      {
        quantity,
      }
    );

    res.status(201).json({
      message: "Quantity Updated",
      upadteCartItem,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { user, _id,product } = req.body;
    // console.log(_id,user)

    if (!_id){

      res.status(201).json({
        message:"Provide Id" ,
      });
    }

    const deleteCartItem = await Cart.deleteOne({_id,user,product});
    if(!deleteCartItem){
      return res.status(404).json({
        message:"Product not found in the Cart" ,
      });
    }
    // console.log(deleteCartItem)

    //const updateCartUser = await User.findOne({_id:user});
    //console.log(updateCartUser.cart)
    // if (!updateCartUser || !Array.isArray(updateCartUser.cart)) {
    //   return res.status(500).json({
    //     message: "User or user cart not found or is invalid",
    //   });
    // }
    // const cartItem = updateCartUser.cart;
    // const productIndex = cartItem.indexOf(product);
    // if (productIndex === -1) {
    //   return res.status(404).json({
    //     message: "Product not found in user's cart",
    //   });
    // }
    // const updatedUserCart = [...cartItem.slice(0,productIndex),...cartItem.slice(productIndex+1)];
    // updateCartUser.cart=updatedUserCart;
    // await updateCartUser.save();

    return res.status(201).json({
      message:"Product Removed from cart" ,
    });
      
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = { addToCart, cartByUser, updateCart, removeFromCart };
