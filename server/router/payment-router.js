const express = require('express');
const { createOrder } = require('../controllers/payment-controller');

const paymentRouter = express.Router();

paymentRouter.route("/createOrder").post(createOrder);





module.exports = paymentRouter;