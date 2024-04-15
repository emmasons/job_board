import zod from "zod";

const envSchema = zod.object({
  ADMIN_EMAIL: zod.string().min(1, "Please provide ADMIN_EMAIL"),
  GITHUB_ID: zod.string().min(1, "Please provide GITHUB_ID"),
  GITHUB_SECRET: zod.string().min(1, "Please provide GITHUB_SECRET"),
  GOOGLE_CLIENT_ID: zod.string().min(1, "Please provide GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: zod
    .string()
    .min(1, "Please provide GOOGLE_CLIENT_SECRET"),
  BASE_DOMAIN: zod.string().min(1, "Please provide BASE_DOMAIN"),
  GS_BUCKET_URL: zod.string().min(1, "Please provide GS_BUCKET_URL"),
  GS_CREDENTIALS: zod.string().min(1, "Please provide GS_CREDENTIALS"),
  GS_BUCKET_NAME: zod.string().min(1, "Please provide GS_BUCKET_NAME"),
  GS_PUBLIC_BUCKET_NAME: zod
    .string()
    .min(1, "Please provide GS_PUBLIC_BUCKET_NAME"),
  GS_LOCATION: zod.string().min(1, "Please provide GS_LOCATION"),
  NODE_ENV: zod
    .string()
    .min(1, "Please provide NODE_ENV")
    .default("development"),

  // nodeemail
  SMTP_EMAIL_HOST: zod.string().min(1, "Please provide SMTP_EMAIL_HOST"),
  SMTP_EMAIL_PORT: zod.string().min(1, "Please provide SMTP_EMAIL_PORT"),
  SMTP_AUTH_USER: zod.string().min(1, "Please provide SMTP_AUTH_USER"),
  SMTP_AUTH_PASSWORD: zod.string().min(1, "Please provide SMTP_AUTH_PASSWORD"),
  TEST_RECIPIENT: zod.string().min(1, "Please provide TEST_RECIPIENT"),
});

export const env = envSchema.parse(process.env);
