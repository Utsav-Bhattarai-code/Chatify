import nodeMailer from "nodemailer";
import { ENV } from "../lib/ENV.js";

// mail sending functionality
export const mailSender = async (email) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "gmail",
      auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Chatify <${ENV.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: generateEmailTemplate(name , ENV.CLIENT_URL),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.log("Error occurred in the mailSender func:", error.message);
    throw error;
  }
};
