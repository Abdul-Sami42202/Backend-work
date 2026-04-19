import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const emailConfig = {
    service: 'gmail',
    auth: {
        user: process.env.PORTAL_EMAIL,
        pass: process.env.PORTAL_PASSWORD,
    },
};

async function sendEmailOTP(mail, otp) {
    const transporter = nodemailer.createTransport(emailConfig);
    console.log("EMAIL:", process.env.PORTAL_EMAIL)
    console.log("PASS:", process.env.PORTAL_PASSWORD)
    const mailOptions = {
        from: process.env.PORTAL_EMAIL,
        to: mail,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return `OTP sent to ${mail} via email`;
    } catch (error) {
        throw `Error sending OTP to ${mail} via email: ${error}`;
    }
}

export default sendEmailOTP;
