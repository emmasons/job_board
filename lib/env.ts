import zod from "zod";

const envSchema = zod.object({
  ADMIN_EMAIL: zod.string().min(1),
  GITHUB_ID: zod.string().min(1),
  GITHUB_SECRET: zod.string().min(1),
  GOOGLE_CLIENT_ID: zod.string().min(1),
  GOOGLE_CLIENT_SECRET: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
