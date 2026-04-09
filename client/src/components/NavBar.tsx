/*
 * NavBar — shared across all pages
 * Structure: Logo | Visible Pages | Contact | Book a Call
 * On page change, the currently active page is removed from the visible links, leaving the other 2.
 * Transparent on load, cream/blur on scroll
 */
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { IMGS, C, BOOKING_URL } from "@/lib/constants";

const ALL_PAGES = [
  { label: "About Us", href: "/about" },
  { label: "AI Workshops", href: "/workshops" },
  { label: "Business Transformation", href: "/transformation" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const isDark =
    location === "/" ||
    location === "/transformation" ||
    location === "/workshops" ||
    location === "/about" ||
    location === "/contact";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const textColor = scrolled ? C.navy : isDark ? C.cream : C.navy;
  const logoFilter = "none";

  // Filter out the current page so we always show the OTHER pages
  const visiblePages = ALL_PAGES.filter(p => p.href !== location);

  return (
    <nav
      className="nav-mobile-invisible"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.35s ease",
        backgroundColor: scrolled ? `${C.cream}F5` : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${C.navy}14`
          : "1px solid transparent",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="hidden md:flex"
          style={{ alignItems: "center", textDecoration: "none" }}
        >
          <img
            src={IMGS.logo}
            alt="Throttl"
            style={{
              height: "34px",
              width: "auto",
              filter: logoFilter,
              transition: "filter 0.35s ease",
            }}
          />
        </Link>

        {/* Desktop links */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "2.5rem" }}
        >
          <AnimatePresence mode="popLayout">
            {visiblePages.map((page) => (
              <motion.div
                key={page.href}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  href={page.href}
                  style={{
                    color: textColor,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    opacity: 0.72,
                    transition: "opacity 0.2s, color 0.35s",
                    letterSpacing: "0.01em",
                    display: "block"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.72")}
                >
                  {page.label}
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Contact */}
          <motion.div layout transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
            <a
              href={BOOKING_URL}
              style={{
                color: textColor,
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                opacity: 0.72,
                transition: "opacity 0.2s, color 0.35s",
                letterSpacing: "0.01em",
                display: "block"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.72")}
            >
              Contact
            </a>
          </motion.div>

          {/* CTA */}
          <motion.div layout transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}>
            <a
              href={BOOKING_URL}
              style={{
                backgroundColor: C.coral,
                color: C.white,
                padding: "0.5rem 1.25rem",
                borderRadius: "3px",
                fontSize: "0.825rem",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "all 0.25s ease",
                display: "block"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = C.coralDark;
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = C.coral;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get Started
            </a>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            color: mobileOpen ? "#fff" : textColor,
            padding: "8px",
            transition: "color 0.35s",
            marginLeft: "auto",
            position: "relative",
            zIndex: 110,
            cursor: "pointer",
          }}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Full-screen Dark Premium Mobile menu overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: `rgba(15, 28, 63, 0.98)`,
            backdropFilter: "blur(24px)",
            zIndex: 105,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5rem 1.5rem",
            animation: "fadeIn 0.2s ease-out",
          }}
          className="md:hidden"
        >
          {/* CTA At the Top */}
          <div style={{ marginBottom: "4rem", width: "100%", maxWidth: "340px", marginTop: "auto" }}>
            <a
              href={BOOKING_URL}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                backgroundColor: C.coral,
                color: "#fff",
                padding: "1.2rem 2rem",
                borderRadius: "4px",
                textAlign: "center",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.05rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                boxShadow: "0 8px 32px rgba(232, 93, 53, 0.3)",
              }}
            >
              Get Started
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", alignItems: "center", width: "100%", maxWidth: "340px", marginBottom: "auto" }}>
            {visiblePages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#fff",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                {page.label}
              </Link>
            ))}

            {/* Contact */}
            <a
              href={BOOKING_URL}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
