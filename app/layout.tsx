import type { Metadata } from "next";
import { fraunces, outfit, familjenGrotesk } from "@/lib/fonts";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Throttl AI — Executive AI Training & Enablement",
  description:
    "Throttl helps executives and management teams become AI-enabled. Hands-on AI workshops, certification, and in-house AI enablement for leadership teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable} ${familjenGrotesk.variable}`}>
      <body className="antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
