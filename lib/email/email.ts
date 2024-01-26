import { sendForm } from "@emailjs/browser";
import { env } from "../env";
import { string } from "zod";
import { EMAILTYPES } from "@/constants";

type FormProps = {
  to_email: string;
  subject: string;
  extraArgs?: {
    [key: string]: string | undefined;
  };
  emailType: EMAILTYPES | EMAILTYPES.DEFAULT;
};

export const mail = async ({
  subject,
  emailType,
  to_email,
  extraArgs,
}: FormProps) => {
  const emailData = {
    service_id: env.SERVICE_ID,
    template_id:
      emailType === EMAILTYPES.EMAILVERIFICATION
        ? env.EMAIL_VERIFICATION_TEMPLATE_ID
        : emailType == EMAILTYPES.RESETPASSWORD
        ? env.PASSWORD_RESET_TEMPLATE_ID
        : env.DEFAULT_TEMPLATE_ID,
    user_id: env.PUBLIC_KEY,
    accessToken: env.PRIVATE_KEY,
    template_params: {
      from_name: env.DEFAULT_FROM_NAME,
      to_email: to_email,
      subject: subject,
      ...extraArgs,
    },
  };

  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      },
    );

    if (response.ok) {
      console.log("Email sent successfully!");
    } else {
      console.error("Failed to send email:", response.statusText);
    }
    return response.status;
  } catch (error) {
    console.error("An error occurred while sending the email:", error);
    return 500;
  } finally {
  }
};
