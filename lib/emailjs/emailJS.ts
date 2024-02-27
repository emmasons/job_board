import { env } from "../env";

type FormProps = {
  to_email: string;
  subject: string;
  message: string;
};

export const mail = async ({
  subject,
  to_email,
  message,
}: FormProps): Promise<{ status: number; message: string }> => {
  const emailData = {
    service_id: env.SERVICE_ID,
    template_id: env.DEFAULT_TEMPLATE_ID,
    user_id: env.PUBLIC_KEY,
    accessToken: env.PRIVATE_KEY,
    template_params: {
      to_email: to_email,
      subject: subject,
      message: message,
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
      console.log(response.statusText);
      return {
        status: 200,
        message: `Success: ${response.statusText}`,
      };
    } else {
      console.error("Failed to send email:", response.statusText);
      return {
        status: response.status,
        message: `Failed to send email: ${response.statusText}`,
      };
    }
  } catch (error) {
    console.error("An error occurred while sending the email:", error);
    return {
      status: 500,
      message: `An error occurred while sending the email: ${error.toString()}`,
    };
  }
};
