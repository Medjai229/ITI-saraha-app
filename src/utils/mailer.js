import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config({});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, name, verify) => {
  try {
    const mailOptions = {
      from: `"Saraha App" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Saraha User Verification',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    /* General styling */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #4caf50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .email-body {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .email-body h2 {
      color: #4caf50;
    }
    .email-button {
      display: block;
      text-align: center;
      margin: 20px 0;
    }
    .email-button a {
      text-decoration: none;
      background-color: #4caf50;
      color: #ffffff;
      padding: 12px 20px;
      font-size: 16px;
      border-radius: 5px;
      display: inline-block;
    }
    .email-footer {
      background-color: #f9f9f9;
      text-align: center;
      padding: 10px 20px;
      font-size: 12px;
      color: #777777;
    }
    .email-footer a {
      color: #4caf50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Verify Your Email</h1>
    </div>

    <div class="email-body">
      <h2>Hello, ${name}</h2>
      <p>Thank you for signing up! Please verify your email address to activate your account. Just click the button below:</p>
      <div class="email-button">
        <a href="${verify}" target="_blank">Verify Email</a>
      </div>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    </div>

    <div class="email-footer">
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${verify}" target="_blank">${verify}</a></p>
    </div>
  </div>
</body>
</html>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log('Error sending email: ', error);
  }
};

export default sendEmail;
