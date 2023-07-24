import { GTagScript } from "@/components/scripts/GTag";
import "../styles/global.css";
import { Golos_Text as Font } from "next/font/google";
import { z } from "zod";

const font = Font({ subsets: ["latin"] });

const schema = z.object({
  GA_MEASUREMENT_ID: z.string(),
});
const env = schema.parse(process.env);

export const metadata = {
  title: "Martin Miglio",
  description: "Martin Miglio's Portfolio",
  keywords: "Martin Miglio, Portfolio, Software Engineer, Web Developer",
  url: "https://martinmiglio.dev/",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  twitter: {
    card: "summary",
    title: "Martin Miglio",
    description: "Martin Miglio's Portfolio",
  },
  og: {
    type: "website",
    title: "Martin Miglio",
    description: "Martin Miglio's Portfolio",
    site_name: "Martin Miglio",
  },
  canonical: "https://martinmiglio.dev/",
  themeColor: "#282c34",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GTagScript measurementId={env.GA_MEASUREMENT_ID} />
      </head>
      <body className={font.className}>
        <div className="fixed inset-0 -z-50 h-screen w-screen bg-grid-theme-50" />
        <div className="mx-auto h-screen min-h-screen max-w-screen-md px-6 text-theme-900 sm:px-0">
          {children}
        </div>
      </body>
    </html>
  );
}
