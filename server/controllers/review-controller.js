const Review = require("../models/review-model");
const Product = require("../models/product-model");

const createReview = async (req, res, next) => {
  try {
    const { product, rating, comment, user } = req.body;

    const productExist = await Product.findById({ _id: product });
    if (!productExist)
      return res.status(404).json({ message: "Product not found" });

    const alreadyReviewed = await Review.findOne({ user, product });
    if (alreadyReviewed)
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });

    const review = new Review({
      user,
      product,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getReviewByProduct = async (req, res, next) => {
  try {
    const { product } = req.body;

    const reviews = await Review.find({ product })
      .populate("user")
      .sort({ createdAt: -1 });

    return res.status(201).json({ message: reviews });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//for admin
const deleteReviews = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const review = await Review.findByIdAndDelete({ _id });
    if (!review) return res.status(404).json({ message: "Review not found" });

    
    return res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const allReviews = await Review.find().populate("user").populate("product");;

    

    if (!allReviews) {
      res.status(404).json({ message: "Reviews not found" });
      return;
    }
   
    res.status(200).json({ message: allReviews });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createReview,
  getReviewByProduct,
  deleteReviews,
  getAllReviews,
};
