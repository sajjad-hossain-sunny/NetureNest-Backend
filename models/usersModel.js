const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "member",
    enum: ["admin", "member", "merchant", "support"],
  },
  otp: {
    type: String,
  },
  forgetPassword: {
    type: Boolean,
    default: false,
  },
  updated: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
