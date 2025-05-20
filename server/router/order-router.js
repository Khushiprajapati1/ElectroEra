const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getSingleOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
} = require("../controllers/order-controller");

const orderRouter = express.Router();

orderRouter.route("/createOrder").post(createOrder);
orderRouter.route("/getAllOrders").get(getAllOrders);
orderRouter.route("/getOrderByUser").post(getOrdersByUser);
orderRouter.route("/getSingleOrder").post(getSingleOrder);
orderRouter.route("/updateOrderStatus").patch(updateOrderStatus);
orderRouter.route("/updatePaymentStatus").patch(updatePaymentStatus);
orderRouter.route("/deleteOrder").delete(deleteOrder);

module.exports = orderRouter;
