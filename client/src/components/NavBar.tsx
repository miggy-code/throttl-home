/*
 * NavBar — shared across all pages
 * Structure: Logo | Services (Dropdown) | Contact | Book a Call
 * On page change, the currently active page is removed from the visible links inside the Services dropdown.
 * Transparent on load, cream/blur on scroll
 */
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { IMGS, C, BOOKING_URL } from "@/lib/constants";

const ALL_PAGES = [
  {
    label: "AI Workshops",
    href: "/workshops",
    desc: "Hands-on AI training & certification for executives",
  },
  {
    label: "Business Transformation",
    href: "/transformation",
    desc: "In-house enablement using our 4-step framework",
  },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const textColor = scrolled ? C.navy : isDark ? C.cream : C.navy;
  const logoFilter = "none";

  // Filter out the current page so we always show the OTHER pages inside the dropdown
  const visiblePages = ALL_PAGES.filter((p) => p.href !== location);

  return (
    <nav
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
          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            style={{ position: "relative" }}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "none",
                border: "none",
                color: textColor,
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                padding: 0,
                opacity: servicesOpen || ALL_PAGES.some((p) => p.href === location) ? 1 : 0.72,
                transition: "opacity 0.2s, color 0.35s",
                letterSpacing: "0.01em",
              }}
            >
              Services
              <ChevronDown
                size={14}
                style={{
                  transition: "transform 0.25s ease",
                  transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {/* Invisible hover bridge */}
            {servicesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "280px",
                  height: "18px",
                }}
              />
            )}
            {/* Dropdown panel */}
            {servicesOpen && visiblePages.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 18px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: C.white,
                  borderRadius: "8px",
                  boxShadow: `0 18px 48px ${C.navy}29, 0 2px 8px ${C.navy}10`,
                  border: `1px solid ${C.navy}12`,
                  minWidth: "320px",
                  padding: "0.5rem",
                  animation: "fadeDropdown 0.18s ease",
                }}
              >
                <style>{`@keyframes fadeDropdown{from{opacity:0;transform:translateX(-50%) translateY(-6px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "12px",
                    height: "12px",
                    backgroundColor: C.white,
                    border: `1px solid ${C.navy}12`,
                    borderRight: "none",
                    borderBottom: "none",
                    rotate: "45deg",
                  }}
                />
                {visiblePages.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setServicesOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.85rem 1rem",
                      borderRadius: "6px",
                      textDecoration: "none",
                      backgroundColor: "transparent",
                      transition: "background-color 0.15s, transform 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${C.coral}12`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          color: C.navy,
                          fontSize: "0.875rem",
                          marginBottom: "3px",
                        }}
                      >
                        {s.label}
                      </div>
                      <div
                        style={{
                          color: C.warmGray,
                          fontSize: "0.78rem",
                          lineHeight: 1.4,
                        }}
                      >
                        {s.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
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
              display: "block",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.72")}
          >
            Contact
          </a>

          {/* CTA */}
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
              display: "block",
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
            
            {/* Services accordion for Mobile */}
            <div style={{ width: "100%", textAlign: "center" }}>
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  width: "100%",
                  color: "#fff",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Services
                <ChevronDown
                  size={26}
                  color={C.gold}
                  style={{
                    transition: "transform 0.25s",
                    transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {mobileServicesOpen && visiblePages.length > 0 && (
                <div style={{ paddingTop: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
                  {visiblePages.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        color: "rgba(255,255,255,0.75)",
                        fontWeight: 500,
                        textDecoration: "none",
                        fontSize: "1.2rem",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

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
