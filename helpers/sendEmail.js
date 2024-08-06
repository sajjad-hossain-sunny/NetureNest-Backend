const nodemailer = require("nodemailer");

function sendEmail(email, verify, template) {
  console.log(process.env.EMAIL);
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Please verify your email",
    html: template(verify),
  });
}

module.exports = sendEmail