import { smtp_password, smtp_username } from "@/config";
import nodemailer from "nodemailer";
interface ISendEmailType {
  email: string;
  subject: string;
  html: string;
}
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtp_username,
    pass: smtp_password,
  },
});

const sendingEmail = async (emailData: ISendEmailType) => {
  try {
    const options = {
      from: smtp_username,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
    const info = await transporter.sendMail(options);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default sendingEmail;
