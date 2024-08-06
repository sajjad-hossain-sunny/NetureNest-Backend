const express = require("express");
const _ = express.Router();
const {
  signupController,
  otpVerificationController,
  loginController,
  forgetPasswordController,
  newPasswordController,
  changePasswordController,
} = require("../../controllers/authControllers");

_.post("/signup", signupController);
_.post("/verify-otp", otpVerificationController);
_.post("/login", loginController);
_.post("/forget-password", forgetPasswordController);
_.post("/new-password", newPasswordController);
_.post("/change-password", changePasswordController);

module.exports = _;
