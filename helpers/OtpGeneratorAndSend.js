const User = require("../models/usersModel");
const sendEmail = require("../helpers/sendEmail");
const otpTemplate = require("../helpers/otpTemplate");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

const OtpGeneratorAndSend = async (email) => {
  const generator = aleaRNGFactory(Date.now());
  const generatedOtp = generator.uInt32().toString().substring(0, 6);
  await User.findOneAndUpdate(
    { email },
    { $set: { otp: generatedOtp } },
    { new: true }
  );
  setTimeout(async () => {
    await User.findOneAndUpdate(
      { email },
      { $unset: { otp: "" } },
      { new: true }
    );
  }, 120000);
  sendEmail(email, generatedOtp, otpTemplate);
};

module.exports = OtpGeneratorAndSend;
