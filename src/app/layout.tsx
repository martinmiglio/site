import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MouseBackground } from "@/components/MouseBackground";
import { ThemeProvider } from "@/components/Theme";
import { sans, mono } from "@/styles/fonts";
import "@/styles/global.css";
import { Metadata } from "next";
import Script from "next/script";
import { z } from "zod";

const schema = z.object({
  ANALYTICS_ID: z.string(),
});
const env = schema.parse(process.env);

export const metadata: Metadata = {
  title: "Martin Miglio",
  description: "Martin Miglio's Site",
  keywords: "Martin Miglio, Site, Software Engineer, Web Developer",
  creator: "Martin Miglio",
  metadataBase: new URL("https://martinmiglio.dev/"),
  alternates: { canonical: "/" },
  icons: { icon: "/icon?v1" },
  twitter: {
    card: "summary_large_image",
    title: "Martin Miglio",
    description: "Martin Miglio's Site",
    images: ["https://martinmiglio.dev/og?v2"],
  },
  openGraph: {
    type: "website",
    title: "Martin Miglio",
    description: "Martin Miglio's Site",
    siteName: "Martin Miglio",
    images: [
      {
        url: "https://martinmiglio.dev/og?v2",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://analytics.martinmiglio.dev/script.js"
          data-website-id={env.ANALYTICS_ID}
          data-domains="martinmiglio.dev,www.martinmiglio.dev"
        />
      </head>
      <ThemeProvider>
        <body
          className={`${sans.variable} ${mono.variable} bg-theme-50 font-sans dark:bg-theme-900`}
        >
          <div className="fixed inset-0 -z-50 h-screen w-screen bg-theme-50 bg-grid-theme-100 dark:bg-theme-900 dark:bg-grid-theme-950">
            <MouseBackground className="z-40" />
          </div>
          <div className="mx-auto flex h-full w-11/12 max-w-screen-md flex-col justify-between text-theme-900 dark:text-theme-100">
            <Header />
            {children}
            <Footer />
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
