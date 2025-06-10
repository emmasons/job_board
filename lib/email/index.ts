import { mail } from "./nodemailer";

export interface EmailProps {
  to_email: string;
  subject?: string;
  message?: string;
}

export const sendEmail = async ({
  to_email,
  subject,
  message,
}: EmailProps): Promise<{ status: number; message: string }> => {
  try {
    const formProps = {
      subject,
      to_email,
      message,
    };
    const response = await mail(formProps);
    return { ...response };
  } catch (error: any) {
    console.error("[EMAIL ERROR]", error); // Better logging
    throw new Error(error.message || "Unknown email sending error");
  }
};
