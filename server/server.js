require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const productRouter = require("./router/product-router");
const cartRouter = require("./router/cart-router");
const adminRouter = require("./router/admin-router");
const wishlistRouter = require("./router/wishlist-router");
const addressRouter = require("./router/address-router");
const orderRouter = require("./router/order-router");
const paymentRouter = require("./router/payment-router");
const reviewRouter = require("./router/review-router");
// const Razorpay = require("razorpay");

//

const _dirname = path.resolve();

const corsOptions = {
  origin :"http://localhost:5173", 
  methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials : true,
}
app.use(cors(corsOptions));

//to get data in json
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 600000 }, // Cookie expires in 10 mins
  })
);

//for auth-router
app.use("/api/auth", router);

//for product-router
app.use("/api/product",productRouter)

app.use("/api/cart",cartRouter)

app.use("/api/wishlist",wishlistRouter)

app.use("/api/admin",adminRouter)

app.use("/api/address",addressRouter)

app.use("/api/order",orderRouter)

app.use("/api/payment",paymentRouter)

app.use("/api/review",reviewRouter)

//for error-handling
app.use(errorMiddleware);

//server listening to the port

app.use(express.static(path.join(_dirname, "/client/dist")))
app.get('*', (req,res)=>{
  res.sendFile(path.resolve(_dirname,"client","dist","index.html"));
})

const port = 5000;
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`server is running at port : ${port}`);
  });
});
