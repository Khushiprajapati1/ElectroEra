const express = require('express');
const {products,createProduct,deleteProduct, updateProduct} = require('../controllers/product-controller');

// const {addProduct,listProduct,removeProduct,singleProduct} = require('../controllers/product-controller');
const productRouter = express.Router();

// productRouter.route("/add").post(addProduct);
// productRouter.route("/list").get(listProduct);
// productRouter.route("/remove").post(removeProduct);
// productRouter.route("/single").post(singleProduct);

productRouter.route("/products").get(products);
productRouter.route("/addNewProduct").post(createProduct);
// productRouter.route("/getProductsByPrice").get(getProductByPrice);
productRouter.route("/deleteProduct").delete(deleteProduct);
productRouter.route("/updateProduct").put(updateProduct);


module.exports = productRouter;
