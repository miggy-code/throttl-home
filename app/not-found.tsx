import Link from "next/link";
import { C } from "@/lib/constants";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: C.cream,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Outfit', sans-serif",
      color: C.navy,
    }}>
      <div style={{ textAlign: "center", maxWidth: "480px", padding: "2rem" }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "6rem",
          fontWeight: 700,
          color: C.navy,
          lineHeight: 1,
          marginBottom: "1rem",
          opacity: 0.12,
        }}>
          404
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 700,
          color: C.navy,
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}>
          Page not found.
        </h1>
        <p style={{ color: C.warmGray, fontSize: "1rem", lineHeight: 1.75, marginBottom: "2.5rem" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          backgroundColor: C.navy, color: "#fff",
          padding: "0.875rem 2rem", borderRadius: "3px",
          fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
        }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
