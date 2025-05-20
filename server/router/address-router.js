const express = require('express');
const { addAddress, getAddress, updateAddress } = require('../controllers/address-controller');

const addressRouter = express.Router();

addressRouter.route("/addAddress").post(addAddress);
addressRouter.route("/getAddress").post(getAddress);
addressRouter.route("/updateAddress").put(updateAddress);




module.exports = addressRouter;