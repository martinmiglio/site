import { z } from "zod";

const envSchema = z.object({
  RECAPTCHA_SECRET_KEY: z.string(),
});

const env = envSchema.parse(process.env);

export default async function verifyCapatch(
  response: string,
  remoteip?: string,
) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${env.RECAPTCHA_SECRET_KEY}&response=${response}&remoteip=${remoteip}`;
  const res = await fetch(url, { method: "POST" });
  const data = await res.json();

  if (data.success) {
    return true;
  } else {
    return false;
  }
}
