const express = require('express');
const {getAllUsers, makeUserAdmin} = require('../controllers/admin-controller');
const authMiddeleware = require("../middlewares/auth-middleware");
const adminMiddeleware = require("../middlewares/admin-middleware");
const adminRouter = express.Router();

adminRouter.route('/users').get(authMiddeleware,adminMiddeleware,getAllUsers);
adminRouter.route('/makeUserAdmin').post(makeUserAdmin);


module.exports = adminRouter;