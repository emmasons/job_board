import { mail } from "./nodemailer";

interface Props {
  to_email: string;
  subject?: string;
  message?: string;
}

export const sendEmail = async ({
  to_email,
  subject,
  message,
}: Props): Promise<{ status: number; message: string }> => {
  try {
    const formProps = {
      subject,
      to_email,
      message,
    };
    const response = await mail(formProps);
    return { ...response };
  } catch (error) {
    throw new Error(String(error));
  }
};
