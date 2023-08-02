import Footer from "@/components/page/Footer";
import Header from "@/components/page/Header";
import { GTagScript } from "@/components/scripts/GTag";
import { Metadata } from "next";
import "@/styles/global.css";
import { Golos_Text as Font } from "next/font/google";
import { z } from "zod";

const font = Font({ subsets: ["latin"] });

const schema = z.object({
  GA_MEASUREMENT_ID: z.string(),
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
    <html lang="en" className="bg-theme-50 dark:bg-theme-900">
      <head>
        <GTagScript measurementId={env.GA_MEASUREMENT_ID} />
        <link rel="canonical" href="https://martinmiglio.dev/" />
      </head>
      <body className={font.className}>
        <div className="fixed inset-0 -z-50 h-screen w-screen bg-theme-50 bg-grid-theme-100 dark:bg-theme-900 dark:bg-grid-theme-950" />
        <div className="mx-auto flex h-full w-11/12 max-w-screen-md flex-col justify-between text-theme-900 dark:text-theme-100">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
