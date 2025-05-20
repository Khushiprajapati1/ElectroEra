const express = require('express');
const { createReview, getReviewByProduct, deleteReviews, getAllReviews } = require('../controllers/review-controller');

const reviewRouter = express.Router();

reviewRouter.route("/createReview").post(createReview);
reviewRouter.route("/getReviewByProduct").post(getReviewByProduct);
reviewRouter.route("/deleteReview").delete(deleteReviews);
reviewRouter.route("/getAllReviews").get(getAllReviews);




module.exports = reviewRouter;