const Product = require("../models/product-model");
const Cart = require("../models/cart-model");
const Wishlist = require("../models/wishlist-model")
const Review = require("../models/review-model");
const Order = require("../models/order-model");


// to get all products
const products = async (req, res) => {
  try {
    const response = await Product.find();

    if (!response) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: response });
  } catch (error) {
    console.log(`products: ${error}`);
  }
};

//create new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, rating, stock, brand, category, images } =
      req.body;

    const createdProduct = await Product.create({
      name,
      price,
      description,
      rating,
      stock,
      brand,
      category,
      images,
    });
    if (!createdProduct) {
      return res.status(500).json({ message: "Error in adding new Product" });
    }

    return res.status(200).json({ message: "New Product Added Successfully" });
  } catch (error) {
    console.log(error);
  }
};

//delete Product
const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.body;

    const productToBeDeleted = await Product.findOne({ _id });

    if (!productToBeDeleted) {
      return res.status(404).json({ message: "Product not Found in database" });
    }

    const deletedProduct = await Product.deleteOne({ _id });
    await Cart.deleteMany({ product: _id });
    await Wishlist.deleteMany({product:_id});
    await Review.deleteMany({product:_id});
    await Order.deleteMany({"products.product":_id});


    if (!deletedProduct) {
      return res.status(404).json({ message: "Failed to delete Product" });
    }

    return res.status(201).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

//Update the Product
const updateProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      price,
      description,
      rating,
      stock,
      brand,
      category,
      images,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        price,
        description,
        rating,
        stock,
        brand,
        category,
        images,
      },
      { new: true }
    );

    const updateTotalPriceOfCart = await Cart.find({ product: _id });
    for (const cartItem of updateTotalPriceOfCart) {
      cartItem.totalPrice = parseInt(
        Number(price.replace(/,/g, "")) * cartItem.quantity
      );
      // console.log(cartItem.totalPrice);
      await cartItem.save();
    }

    if (!updatedProduct) {
      return res.status(404).json({ message: "Failed to Update the Product" });
    }

    return res.status(201).json({ message: "Product Updated Successfully" });
  } catch (error) {
    console.log(error);
  }
};

//get Products by price
// const getProductByPrice = async(req,res) =>{
//     try {

//         const {price,brand,category} = req.body;

//     } catch (error) {

//         console.log(error);

//     }
// }

module.exports = { products, createProduct, deleteProduct, updateProduct };
