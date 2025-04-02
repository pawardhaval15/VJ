const OTP = require("../models/otp");
const { OTP_EXPIRY } = require("../config/constants");
const nodemailer = require("nodemailer"); // Import nodemailer
// Generate and send OTP
exports.generateAndSendOTP = async (email) => {
  const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
  const expiry = new Date(Date.now() + OTP_EXPIRY);

  // Store OTP in the database
  await OTP.create({ email, otp, expiry });

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your Karyah Verification Code",
    text: `Dear User,

  Your verification code is ${otp}. This code is valid for the next 1 minute. Please keep it confidential and do not share it with anyone.

Thank you for choosing Karyah.

Best regards,
Team Karyah`,
  });
  return otp;
};

// Verify OTP
exports.verifyOTP = async (email, otp) => {
  const storedOtp = await OTP.findOne({ where: { email, otp } });

  if (!storedOtp) {
    return false; // OTP not found
  }

  if (storedOtp.expiry < new Date()) {
    await storedOtp.destroy(); 
    return false; // OTP expired
  }

  await storedOtp.destroy(); 
  return true;
};
