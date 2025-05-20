require("dotenv").config();
const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const createOrder = async (req, res) => {

    const { amount } = req.body;
  
    try {
      const options = {
        amount: amount, // Convert to paise
        currency: "INR",
        receipt: `receipt_order_${shortid.generate()}`,
      };
  
      const order = await razorpay.orders.create(options);
  
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error("Razorpay Error:", error);
      res.status(500).json({ success: false, message: "Failed to create order" });
    }
  };

  module.exports = {
       createOrder,
     };
    
  