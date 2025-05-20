const Order = require("../models/order-model");
const Product = require("../models/product-model");
const Cart = require("../models/cart-model")

// Create new order
const createOrder = async (req, res, next) => {
  try {

    const {orderData} = req.body;
    //console.log(orderData)

    const orderCreated = await Order.create({
      user : orderData.user,
      products : orderData.products,
      address : orderData.address,
      paymentMethod : orderData.paymentMethod,
      paymentStatus : orderData.paymentStatus,
      finalPrice : orderData.finalPrice,
      razorpayOrderId : orderData.razorpayOrderId,
      razorpayPaymentId : orderData.razorpayPaymentId,
       razorpaySignature : orderData.razorpaySignature,
    });

    if (!orderCreated) {
      return res.status(404).json({ message: "Order has not been Placed" });
    }

    for (const item of orderData.products) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock -= item.quantity;
        if (product.stock < 0) product.stock = 0;
        await product.save();
      }
    }
    const orderedProductIds = orderData.products.map((item) => item.product);

    const deletedCart = await Cart.deleteMany({
      user : orderData.user,
      product: orderedProductIds ,
    });
    // console.log(deletedCart)

    const populatedOrder = await Order.findById(orderCreated._id)
  .populate('products.product') // <-- populate product details
  .populate('address') // (optional) if you want full address info
  .populate('user'); 

    return res.status(201).json({ message:populatedOrder });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get all orders for admin panel
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "-password")
      .populate("products.product")
      .populate("address");

    if (!orders) {
      return res.status(404).json({ message: "Failed to get Orders" });
    }

    return res.status(200).json({ message: orders });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get Orders for Particular user
const getOrdersByUser = async (req, res, next) => {
  try {
    const { user } = req.body;
    const ordersByUser = await Order.find({ user })
      .populate("products.product")
      .populate("address");

    if (!ordersByUser) {
      return res.status(404).json({ message: "Failed to get Orders" });
    }


    return res.status(200).json({ message: ordersByUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get a single order by order id
const getSingleOrder = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const singleOrder = await Order.find({ _id })
      .populate("user")
      .populate("products.product")
      .populate("address");

    if (!singleOrder) {
      return res.status(404).json({ message: "Order not Exist" });
    }

    return res.status(200).json({ message: singleOrder });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Update Order status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, _id } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      _id,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Failed to update Order status" });
    }

    return res
      .status(200)
      .json({ message: "Order status Updated Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Update Payment status
const updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus, _id } = req.body;
    const updatedPaymentStatus = await Order.findByIdAndUpdate(
      _id,
      { paymentStatus },
      { new: true }
    );

    if (!updatedPaymentStatus) {
      return res
        .status(404)
        .json({ message: "Failed to update payment status" });
    }

    return res
      .status(200)
      .json({ message: "Payment status Updated Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//delete order ( In case of order Cancellation )
const deleteOrder = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const order = await Order.findById(_id);

    if (order) {
      for (const item of order.products) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }
    const deletedOrder = await Order.findByIdAndDelete({ _id });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Failed to delete the Order" });
    }

    return res.status(200).json({ message: "Order deleted Successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getSingleOrder,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
};
