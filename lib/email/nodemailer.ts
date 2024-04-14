import nodemailer from "nodemailer";
import { env } from "../env";
import { EmailProps } from ".";

// Create a transporter object with SMTP configuration
const transporter = nodemailer.createTransport({
  host: env.SMTP_EMAIL_HOST,
  port: 587,
  secure: false, // Enable SSL
  auth: {
    user: env.SMTP_AUTH_USER,
    pass: env.SMTP_AUTH_PASSWORD,
  },
});

// Send the email
export const mail = async ({
  to_email,
  subject,
  message,
}: EmailProps): Promise<{ status: number; message: string }> => {
  // Define the email options
  const mailOptions = {
    from: env.SMTP_AUTH_USER,
    to: to_email,
    subject: subject,
    text: message,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        reject({
          message: `Error: ${error}`,
          status: 500,
        });
      } else {
        // console.log("Email sent:", { ...info });
        const status = info.response.includes("250 OK") ? 200 : 500;
        resolve({
          message: "Email sent successfuly.",
          status: status,
        });
      }
    });
  });
};
