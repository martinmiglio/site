import { Golos_Text as Sans, Source_Code_Pro as Mono } from "next/font/google";

export const sans = Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const mono = Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
