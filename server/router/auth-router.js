const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller")
const validate = require("../middlewares/validate-middleware");
const {signUpSchema,loginSchema} = require("../validators/auth-validator");
const authMiddeleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);
router.route("/register").post(validate(signUpSchema),authControllers.register);
router.route("/verifyEmail").post(authControllers.verifyEmail);
router.route("/login").post(validate(loginSchema),authControllers.login);
router.route("/sendMail").post(authControllers.sendMail);
router.route("/changePassword").post(authControllers.changePassword);
router.route("/user").get(authMiddeleware,authControllers.user);


module.exports = router; 