const { sendVerificationCode, welcomeEmail } = require("../middlewares/email");
const User = require("../models/user-model");
const otp = require("../models/otp-model");
const bcrypt = require("bcryptjs");

//home page
const home = async (req, res) => {
  try {
    res.status(200).send("welcome router using controller");
  } catch (error) {
    console.log(error);
  }
};

//SignUp page
const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist =
      (await User.findOne({ email })) || (await User.findOne({ phone }));

    //if user is exists then show error 
    if (userExist) {
      return res.status(400).json({ message: "User already Exists" });
    }

    //verification code (OTP)
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    //if new user :-
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
      verificationCode,
    });

    sendVerificationCode(userCreated.email, verificationCode);
    res.status(201).json({
      message: "SignUp Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    req.status(500).json("Internal server error");
  }
};

//Verifiction of Email at the time of registration
const verifyEmail = async (req, res) => {
  try {
    if (!req.session.attempts) {
      req.session.attempts = 0;
    }

    const { code } = req.body;
    const user = await User.findOne({ verificationCode: code });

    if (!user) {
      req.session.attempts += 1;

      if (req.session.attempts >= 2) {
        const userToDelete = await User.findOne({ isverified: false });

        if (userToDelete) {
          await User.deleteOne({ _id: userToDelete._id });
          // console.log(
          //   "Unverified user deleted successfully:",
          //   userToDelete._id,
          //   userToDelete.email
          // );
        } else {
          console.log("No unverified user found.");
        }

        req.session.destroy(); // Reset session
        return res.status(400).json({
          message: "Too many failed attempts. Please sign up again.",
          redirect: "/Signup_Form",
        });
      }

      return res.status(400).json({ message: "Inavalid Or Expired OTP" });
    }

    req.session.attempts = 0;

    user.isverified = true;
    user.verificationCode = undefined;
    await user.save();
    await welcomeEmail(user.email, user.username);
    return res.status(200).json({ message: "Email Verified Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Login page
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const userExist = await User.findOne({ email });
    if (!userExist) {
      console.log("User Not Found!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await userExist.comparePassword(password);
    //if password matches:-
    if (user) {
      res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    //req.status(500).json("Internal server error");
    next(error);
  }
};

//Sending Email for forgot password
const sendMail = async (req, res) => {
  try {
    const { email } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const otpUser = await otp.create({
        email,
        code: verificationCode,
      });

      sendVerificationCode(otpUser.email, verificationCode);

      return res.status(200).json({
        message: "otp User created Successfully and Email sent Successfully",
      });
    } else {
      return res.status(401).json({ message: "Invalid Email Id" });
    }
  } catch (error) {
    console.log(error);
  }
};

//function to verify otp at forgot password
const changePassword = async (req, res) => {
  try {
    const { email, code } = req.body;

    const userExist = await otp.findOne({ email, code });

    if (userExist) {
      let user = await User.findOne({ email });
      user.password = req.body.password;
      user.save();
      return res.status(200).json("Password change Succsessfully");
    } else {
      return res
        .status(401)
        .json({ message: "Invalid Email Id or Verification code" });
    }
  } catch (error) {
    console.log(error);
  }
};

//to get logged in user data
const user = async (req, res) => {
  try {
    const userData = req.user;
    // console.log(userData);
    return res.status(200).json({ message: userData });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  home,
  register,
  login,
  verifyEmail,
  sendMail,
  changePassword,
  user,
};
