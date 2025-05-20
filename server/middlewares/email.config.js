const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "electroera001@gmail.com",
    pass: "hnju gnhl pxyc oeqc",
  },
});

module.exports = {transporter};