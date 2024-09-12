import nodemailer from "nodemailer";
import { env } from "../env";
import { EmailProps } from ".";
import path from "path";
import fs from "fs";

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

  // Define a simple template for the email

  const logoPath = path.resolve("./public/logo.png");

  const logoData = fs.readFileSync(logoPath).toString("base64");

  const htmlTemplate = `<html>
  <head>
    <title>Infinite Talent Limited</title>
    <style>
      body {
       font-family: Garamond, sans-serif;
        background-color: whitesmoke;
        font-family: 'Google Sans', Garamond;
      }
      div {
       background-color: white;
        border-radius: 20px;
      }
      h1 {
        color: #F97316;
      }
      p {
        color: #333333;
        font-size:1rem;
      }
      address {
        font-size: 0.7rem;
        line-height: 1rem;
      }
    </style>
  </head>
  <body>
      <div>
        <h1>${subject}</h1>
        <p>${message}</p>

        <p style="margin: 0;">Thank you.</p>
        <p style="margin: 0;"><i>Jobs Connect Limited Team</i></p><br>
        <address>
            <p>1st Floor, Muthaiga Square, Thika road, Nairobi</p>
            <p>Tel: 0203 151 2410</p>
            <p>Mobile +254712428640</p>
        </address>
        <img src="cid:logo" style="background-color:white; max-height:40px; height:auto; width:auto; object-fit:contain">

      </div>
  </body>
  </html>`;
  const mailOptions = {
    from: env.SMTP_AUTH_USER,
    name: "Infinite Talent Limited",
    to: to_email,
    subject: subject,
    html: htmlTemplate,
    attachments: [
      {
        filename: "logo.png",
        path: logoPath,
        cid: "logo", // You can give it any unique identifier.
      },
    ],
  };

  if (!to_email || !subject || !message || !env.SMTP_AUTH_USER) {
    return Promise.reject({
      status: 400,
      message: "Invalid or missing email parameters.",
    });
  }

  if (typeof to_email === "string" && to_email.trim() === "") {
    return Promise.reject({
      status: 400,
      message: "Invalid or missing recipient email.",
    });
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        reject({
          message: `${error}`,
          status: 500,
        });
      } else {
        const status = info.response.includes("250 OK") ? 200 : 500;
        resolve({
          message: "Email sent successfully.",
          status: status,
        });
      }
    });
  });
};
