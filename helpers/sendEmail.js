const nodemailer = require("nodemailer");

function sendEmail(email, verify, template) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sajjadhossainsunny.official@gmail.com",
      pass: "gkhvftodfsqryqnq",
    },
  });

  transporter.sendMail({
    from: 'sajjadhossainsunny.official@gmail.com',
    to: email,
    subject: "Please verify your email",
    html: template(verify),
  });
}

module.exports = sendEmail