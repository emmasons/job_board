import zod from "zod";

const envSchema = zod.object({
  ADMIN_EMAIL: zod.string().min(1),
  GITHUB_ID: zod.string().min(1),
  GITHUB_SECRET: zod.string().min(1),
  GOOGLE_CLIENT_ID: zod.string().min(1),
  GOOGLE_CLIENT_SECRET: zod.string().min(1),
  MAILER_USER: zod.string().min(1),
  MAILER_PASSWORD: zod.string().min(1),
  DEFAULT_FROM_EMAIL: zod.string().min(1),
  BASE_DOMAIN: zod.string().min(1),
  SERVICE_ID: zod.string().min(1),
  DEFAULT_TEMPLATE_ID: zod.string().min(1),
  EMAIL_VERIFICATION_TEMPLATE_ID: zod.string().min(1),
  PASSWORD_RESET_TEMPLATE_ID: zod.string().min(1),
  PUBLIC_KEY: zod.string().min(1),
  DEFAULT_FROM_NAME: zod.string().min(1),
  PRIVATE_KEY: zod.string().min(1),
  GS_BUCKET_URL: zod.string().min(1, "Please provide GS_BUCKET_URL"),
  GS_CREDENTIALS: zod.string().min(1, "Please provide GS_CREDENTIALS"),
  GS_BUCKET_NAME: zod.string().min(1, "Please provide GS_BUCKET_NAME"),
  GS_LOCATION: zod.string().min(1, "Please provide GS_LOCATION"),
});

export const env = envSchema.parse(process.env);
