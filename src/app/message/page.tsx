"use client";

import Captcha from "@/components/Captcha";
import { redirect } from "next/navigation";
import { useCallback, useState } from "react";
import { z } from "zod";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [success, setSuccess] = useState(false);
  const [triggerRedirect, setTriggerRedirect] = useState(false);

  const handleVerify = useCallback((token: string) => {
    setToken(token);
  }, []);

  const verifyForm = async (event: React.FormEvent<MessageFormElement>) => {
    const formSchema = z.object({
      subject: z.string().min(1).max(100),
      email: z.string().email(),
      message: z.string().min(1).max(500),
    });

    const formData = {
      subject: event.currentTarget.subject.value,
      email: event.currentTarget.email.value,
      message: event.currentTarget.message.value,
    };

    try {
      return formSchema.parse(formData);
    } catch (err) {
      return null;
    }
  };

  interface FormElements extends HTMLFormControlsCollection {
    subject: HTMLInputElement;
    email: HTMLInputElement;
    message: HTMLTextAreaElement;
  }

  interface MessageFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const submitForm = async (event: React.FormEvent<MessageFormElement>) => {
    if (!token) {
      return;
    }

    event.preventDefault();

    const formData = await verifyForm(event);

    if (!formData) {
      return;
    }

    setIsLoading(true);

    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        subject: "New Message from Personal Site: " + formData.subject,
        token,
      }),
    });

    if (res.status === 200) {
      setSuccess(true);
      setTimeout(() => {
        setTriggerRedirect(true);
      }, 3000);
    }

    setRefreshReCaptcha((r) => !r);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (triggerRedirect) {
    redirect(`/`);
  }

  const inputClassName = "border border-gray-300 rounded-md p-2 text-theme-900";

  const buttonClassName =
    "rounded-md p-2 border-theme-500 border bg-theme-700/70 enabled:hover:bg-theme-700 transition-colors duration-200 ease-in-out text-theme-100";

  return (
    <Captcha handleVerify={handleVerify} refreshReCaptcha={refreshReCaptcha}>
      <form className="flex flex-col gap-2" onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Subject"
          id="subject"
          className={inputClassName}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className={inputClassName}
        />
        <textarea
          placeholder="Message"
          id="message"
          className={inputClassName}
        />
        <button
          type="submit"
          disabled={!token || isLoading || success}
          className={buttonClassName}
          data-umami-event="Message Submit Button Clicked"
        >
          {isLoading
            ? "Sending..."
            : success
              ? "Message Sent!"
              : "Send Message"}
        </button>
      </form>
    </Captcha>
  );
}
