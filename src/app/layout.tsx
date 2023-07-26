import Footer from "@/components/page/Footer";
import Header from "@/components/page/Header";
import { GTagScript } from "@/components/scripts/GTag";
import "@/styles/global.css";
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
  twitter: {
    card: "summary_large_image",
    title: "Martin Miglio",
    description: "Martin Miglio's Portfolio",
    images: ["https://martinmiglio.dev/og"],
  },
  openGraph: {
    type: "website",
    title: "Martin Miglio",
    description: "Martin Miglio's Portfolio",
    site_name: "Martin Miglio",
    images: [
      {
        url: "https://martinmiglio.dev/og",
        width: 1200,
        height: 630,
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1.5,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GTagScript measurementId={env.GA_MEASUREMENT_ID} />
        <link rel="canonical" href="https://martinmiglio.dev/" />
      </head>
      <body className={font.className}>
        <div className="fixed inset-0 -z-50 h-screen w-screen bg-theme-50 bg-grid-theme-100" />
        <div className="mx-auto h-screen min-h-screen max-w-screen-md px-6 text-theme-900 sm:px-0">
          <div className="flex h-full w-full flex-col justify-between">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
