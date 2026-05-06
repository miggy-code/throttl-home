import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Throttl AI — Executive AI Training & Enablement",
  description:
    "Throttl helps executives and management teams become AI-enabled. Hands-on AI workshops, certification, and in-house AI enablement for leadership teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        Applying both font classNames to body ensures both fonts are injected
        into the document. Outfit becomes the default; Playfair Display is
        loaded and available for inline-style overrides throughout the pages.
      */}
      <body className={`${outfit.className} ${playfair.className}`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
