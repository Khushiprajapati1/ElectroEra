// models/Review.js
const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    // order: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Order", // optional, helps trace which order it was in
    // },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true }); // One review per product per user

const Review = new mongoose.model("Review", reviewSchema);
module.exports = Review
