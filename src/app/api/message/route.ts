import verifyCapatch from "@/lib/captcha";
import { sendEmail } from "@/lib/smtp";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const messageSchema = z.object({
  subject: z.string(),
  message: z.string(),
  email: z.string().email(),
  token: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { subject, message, email, token } = messageSchema.parse(body);

    const remoteIp = req.ip ?? req.headers.get("x-real-ip");
    if (!verifyCapatch(token, remoteIp)) {
      return NextResponse.error();
    }

    await sendEmail(subject, message + `\n\nFrom: ${email}`);
  } catch (e) {
    return NextResponse.error();
  }
  return NextResponse.json({ ...body, success: true });
}
