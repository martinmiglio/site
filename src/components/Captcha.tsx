"use client";

import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

export default function Captcha({
  handleVerify,
  refreshReCaptcha,
  children,
}: Readonly<{
  handleVerify: (token: string) => void;
  refreshReCaptcha: boolean;
  children: React.ReactNode;
}>) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      <GoogleReCaptcha
        onVerify={handleVerify}
        refreshReCaptcha={refreshReCaptcha}
      />
      {children}
    </GoogleReCaptchaProvider>
  );
}
