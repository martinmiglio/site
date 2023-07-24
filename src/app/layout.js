import "../styles/global.css";

export const metadata = {
  title: "Martin Miglio",
  description: "Martin Miglio's Portfolio",
  keywords: "Martin Miglio, Portfolio, Software Engineer, Web Developer",
  url: "https://martinmiglio.dev/",
  httpEquiv: {
    "Cache-Control": "max-age=86400",
    "Permissions-Policy": "interest-cohort=()",
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
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://martinmiglio.dev/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
