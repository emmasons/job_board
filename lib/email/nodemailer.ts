import nodemailer from "nodemailer";
import { env } from "@/lib/env";
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

export const mail = async ({
  to_email,
  subject,
  message,
}: EmailProps): Promise<{ status: number; message: string }> => {
  const logoPath = path.resolve("./public/logo2.png");
  const logoData = fs.readFileSync(logoPath).toString("base64");

  const htmlTemplate = `<html>
  <head>
    <title>Talentra.io</title>
    <style>
      body {
        font-family: Garamond, sans-serif;
        background-color: whitesmoke;
        font-family: 'Google Sans', Garamond;
      }
      div {
        background-color: white;
        border-radius: 20px;
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
      }
      h1 {
        color: #F97316;
      }
      p {
        color: #333333;
        font-size: 1rem;
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
      <p style="margin: 0;"><i>The Talentra.io Team</i></p><br>
      <address>
        <p>Dubai, UAE</p>
        <p>Phone: +971507092468</p>
        <p>Email: notify@talentra.io</p>
      </address>
      <img src="cid:logo" style="background-color:white; max-height:40px; height:auto; width:auto; object-fit:contain">
    </div>
  </body>
  </html>`;

  const mailOptions = {
    from: env.SMTP_AUTH_USER,
    name: "Talentra.io",
    to: to_email,
    subject: subject,
    html: htmlTemplate,
    attachments: [
      {
        filename: "logo2.png",
        path: logoPath,
        cid: "logo",
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
        const status = info.response.includes("250 2.0.0 Ok") ? 200 : 500;
        resolve({
          message: "Email sent successfully.",
          status: status,
        });
      }
    });
  });
};
