import nodemailer from "nodemailer";
import { z } from "zod";

const envSchema = z.object({
  SMTP_SERVICE: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_DESTINATION: z.string(),
});

const env = envSchema.parse(process.env);

const transporter = nodemailer.createTransport({
  service: env.SMTP_SERVICE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (subject: string, text: string) => {
  await transporter.sendMail({
    from: env.SMTP_USER,
    to: env.SMTP_DESTINATION,
    subject,
    text,
  });
};
