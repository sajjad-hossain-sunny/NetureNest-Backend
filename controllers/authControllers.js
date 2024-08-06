const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const OtpGeneratorAndSend = require("../helpers/OtpGeneratorAndSend");

const {
  emailValidation,
  passwordValidation,
} = require("../helpers/Validation");

const signupController = async (req, res) => {
  const { fullName, email, password } = req.body;
  const passwordError = passwordValidation(password);

  if (!fullName || !email || !emailValidation(email) || !password) {
    return res.send({
      error: !fullName
        ? "You have to provide your Full Name."
        : !email
        ? "You have to provide an Email."
        : !emailValidation(email)
        ? "You have to provide a Valid Email."
        : "You have to provide a Password.",
    });
  } else if (passwordError) {
    return res.send({ error: passwordError });
  } else {
    let duplicateEmail = await User.find({ email: email });
    if (duplicateEmail.length > 0) {
      return res.send({ error: "This email is already exists" });
    } else {
      bcrypt.hash(password, 10, async function (err, hash) {
        const user = new User({
          fullName: fullName,
          email: email,
          password: hash,
        });

        user.save();
        OtpGeneratorAndSend(email);

        res.send({ success: "Signup successful. Please verify your email." });
      });
    }
  }
};

const otpVerificationController = async (req, res) => {
  const { email, otp } = req.body;

  let findOtp = await User.find({ email });

  if (findOtp.length > 0) {
    if (findOtp[0].otp === otp) {
      if (findOtp[0].emailVerified) {
        await User.findOneAndUpdate(
          { email },
          { $unset: { otp: "" }, $set: { forgetPassword: true } },
          { new: true }
        );
      } else {
        await User.findOneAndUpdate(
          { email },
          { $unset: { otp: "" }, $set: { emailVerified: true } },
          { new: true }
        );
      }
      res.json({ success: "otp matched" });
    } else {
      res.json({ error: "otp did not matched" });
    }
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !emailValidation(email) || !password) {
    return res.send({
      error: !email
        ? "You have to provide an Email."
        : !emailValidation(email)
        ? "You have to provide a Valid Email."
        : "You have to provide a Password.",
    });
  } else {
    let user = await User.find({ email });

    if (user.length > 0) {
      if (user[0].emailVerified) {
        bcrypt.compare(password, user[0].password, function (err, result) {
          if (result) {
            res.send({ success: "Login successful" });
          } else {
            res.send({ error: "Password did not match" });
          }
        });
      } else {
        res.send({ error: "Please verify your email" });
      }
    } else {
      res.send({ error: "Email not found" });
    }
  }
};

const forgetPasswordController = async (req, res) => {
  const { email } = req.body;

  const user = await User.find({ email });

  if (!email || !emailValidation(email)) {
    return res.send({
      error: !email
        ? "You have to provide an Email."
        : "You have to provide a Valid Email.",
    });
  } else {
    if (user.length > 0) {
      OtpGeneratorAndSend(email);
      return res.send({ success: "Otp sent. Check Your Email." });
    } else {
      return res.send({ error: "Can't find account with this email." });
    }
  }
};

const newPasswordController = async (req, res) => {
  const { email, password } = req.body;
  const passwordError = passwordValidation(password);

  const user = await User.find({ email });

  if (passwordError) {
    return res.send({ error: passwordError });
  } else {
    if (user[0].emailVerified) {
      bcrypt.hash(password, 10, async function (err, hash) {
        await User.findOneAndUpdate(
          { email },
          { $set: { password: hash, forgetPassword: false } },
          { new: true }
        );
        res.send({ success: "Password changed successfully" });
      });
    }
  }
};

const changePasswordController = async (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body;

  const user = await User.find({ email });
  const passwordError = passwordValidation(newPassword);

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.send({
      error: !currentPassword
        ? "You have to provide your Current Password."
        : !newPassword
        ? "You have to provide New Password."
        : "You have to Confirm your Password.",
    });
  } else if (passwordError) {
    return res.send({ error: passwordError });
  } else {
    if (user.length > 0) {
      bcrypt.compare(currentPassword, user[0].password, function (err, result) {
        if (result) {
          bcrypt.hash(confirmPassword, 10, async function (err, hash) {
            await User.findOneAndUpdate(
              { email },
              { $set: { password: hash } },
              { new: true }
            );
            res.send({ success: "Password changed successfully" });
          });
        } else {
          res.send({ error: "Current Password did not match" });
        }
      });
    }
  }
};

module.exports = {
  signupController,
  loginController,
  otpVerificationController,
  forgetPasswordController,
  newPasswordController,
  changePasswordController,
};
