import type { Metadata } from "next";
import { absoluteUrl, defaultOgImage, siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} AI — Executive AI Training & Enablement`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    title: `${siteName} AI — Executive AI Training & Enablement`,
    description: siteDescription,
    url: absoluteUrl("/"),
    siteName,
    type: "website",
    images: [
      {
        url: absoluteUrl(defaultOgImage),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} AI — Executive AI Training & Enablement`,
    description: siteDescription,
    images: [absoluteUrl(defaultOgImage)],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
