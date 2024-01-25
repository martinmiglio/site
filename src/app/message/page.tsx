"use client";

import Captcha from "@/components/Captcha";
import { MouseBackground } from "@/components/MouseBackground";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { z } from "zod";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [success, setSuccess] = useState(false);
  const [triggerRedirect, setTriggerRedirect] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    if (isErrored) {
      setRefreshReCaptcha((r) => !r);
      setTimeout(() => {
        setIsErrored(false);
      }, 1000);
    }
  }, [isErrored]);

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

  const submitForm = useCallback(
    async (event: React.FormEvent<MessageFormElement>) => {
      if (!token) {
        return;
      }

      event.preventDefault();

      const formData = await verifyForm(event);

      if (!formData) {
        setIsErrored(true);
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
      } else {
        setIsErrored(true);
      }

      setRefreshReCaptcha((r) => !r);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    },
    [token],
  );

  if (triggerRedirect) {
    redirect(`/`);
  }

  const buttonClassName = `rounded-md p-2 border transition-colors duration-200 ease-in-out text-theme-800 dark:text-theme-100 ${
    isErrored
      ? "border-red-500 bg-red-300/70 dark:bg-red-500/30 animate-shake"
      : "border-theme-500 bg-theme-300/70 dark:bg-theme-700/70 enabled:hover:bg-theme-300 dark:enabled:hover:bg-theme-700"
  }`;

  return (
    <Captcha handleVerify={handleVerify} refreshReCaptcha={refreshReCaptcha}>
      <h1 className="pb-2 text-2xl font-bold">Send me a message</h1>
      <form className="flex flex-col gap-2" onSubmit={submitForm}>
        <Input type="text" placeholder="Subject" id="subject" />
        <Input type="email" placeholder="Email" id="email" />
        <Textarea placeholder="Message" id="message" />
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
