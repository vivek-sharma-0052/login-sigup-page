const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {

 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
   user: process.env.EMAIL_USER,
   pass: process.env.EMAIL_PASS
  }
 });

 await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to,
  subject,
  text
 });
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
 console.log("Email sent successfully");
};

module.exports = sendEmail;