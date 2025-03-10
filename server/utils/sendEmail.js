import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Verification from "../models/emailVerification.js";
import { generateOTP, hashString } from "./index.js";

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, CLIENT_URL } = process.env;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (user, res, token) => {
  const { _id, email, name } = user;
  const otp = generateOTP();

  //   mail options
  const mailOptions = {
    from: 'Bugema University Data Team "<data@bugemauniv.ac.ug>"',
    to: email,
    subject: "Email Verification",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px; text-align: center;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <img src="https://cloud.appwrite.io/v1/storage/buckets/676995bd003a7bc1e278/files/67a9b43a0028ad0400db/view?project=674dcf7b003d57db960a&mode=admin" alt="Bugema University Logo" style="max-width: 150px; margin-bottom: 20px;">
            <h2 style="color: #0838BC; margin-bottom: 10px;">Verify Your Email Address</h2>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
                Hi <b>${name}</b>,<br>  
                Please use the OTP below to verify your email address.
            </p>
            <div style="background: #0838BC; color: #fff; font-size: 24px; font-weight: bold; padding: 15px; border-radius: 6px; display: inline-block; margin-bottom: 20px;">
                ${otp}
            </div>
            <p style="font-size: 14px; color: #777;">
                This OTP <b>expires in 2 minutes</b>. If you did not request this, please ignore this email.
            </p>
            <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
            <p style="font-size: 14px; color: #555;">
                Regards,<br>
                <b>Bugema University Blogs Team</b>
            </p>
        </div>
    </div>`
};


  try {
    const hashedToken = await hashString(String(otp));

    const newVerifiedEmail = await Verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 120000,
    });

    if (newVerifiedEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(201).send({
            success: "PENDING",
            message:
              "OTP has been sent to your account. Check your email and verify your email.",
            user,
            token,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "Something went wrong" });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};


export const sendPasswordResetEmail = async (user, resetToken) => {
  const { email, name } = user;
  const resetLink = `${CLIENT_URL}/auth/reset-password/${resetToken}`;

  const mailOptions = {
    from: 'Bugema University Data Team "<data@bugemauniv.ac.ug>"',
    to: email,
    subject: "Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px; text-align: center;">
          <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #0838BC;">Reset Your Password</h2>
              <p>Hi <b>${name}</b>,<br>Click the button below to reset your password.</p>
              <a href="${resetLink}" style="background: #0838BC; color: #fff; padding: 10px 20px; text-decoration: none; font-size: 18px; border-radius: 6px;">
                  Reset Password
              </a>
              <p>This link <b>expires in 1 hour</b>.</p>
              <hr>
              <p>Regards,<br><b>Bugema University Blogs Team</b></p>
          </div>
      </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};