/*
 * NavBar — shared across all pages
 * Structure: Logo | About Us | Services (dropdown) | Contact | Book a Call
 * Services dropdown: AI Workshops, AI Business Transformation
 * Transparent on load, cream/blur on scroll
 */
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { IMGS, C, BOOKING_URL } from "@/lib/constants";

const SERVICES = [
  {
    label: "AI Workshops",
    href: "/workshops",
    desc: "Hands-on AI training & certification for executives",
  },
  {
    label: "AI Business Transformation",
    href: "/transformation",
    desc: "In-house enablement using the Throttl Accelerator",
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
    location === "/about";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

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

  const textColor = scrolled ? C.navy : isDark ? C.white : C.navy;
  const logoFilter = "none";

  const isServicesActive = SERVICES.some((s) => location === s.href);

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
          style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
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
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
        >
          {/* About Us */}
          <Link
            href="/about"
            style={{
              color: textColor,
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              opacity: location === "/about" ? 1 : 0.72,
              transition: "opacity 0.2s, color 0.35s",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.opacity =
                location === "/about" ? "1" : "0.72")
            }
          >
            About Us
          </Link>

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
                opacity: isServicesActive || servicesOpen ? 1 : 0.72,
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

            {/* Invisible hover bridge so the mouse can travel to the panel */}
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
            {servicesOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 18px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: C.white,
                  borderRadius: "8px",
                  boxShadow:
                    `0 18px 48px ${C.navy}29, 0 2px 8px ${C.navy}10`,
                  border: `1px solid ${C.navy}12`,
                  minWidth: "300px",
                  padding: "0.5rem",
                  animation: "fadeDropdown 0.18s ease",
                }}
              >
                <style>{`@keyframes fadeDropdown{from{opacity:0;transform:translateX(-50%) translateY(-6px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
                {/* Arrow */}
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
                {SERVICES.map((s) => (
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
                      backgroundColor:
                        location === s.href
                          ? `${C.coral}0D`
                          : "transparent",
                      transition: "background-color 0.15s, transform 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${C.coral}12`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        location === s.href ? `${C.coral}0D` : "transparent";
                    }}
                  >
                    <div
                      style={{
                        width: "3px",
                        alignSelf: "stretch",
                        backgroundColor:
                          location === s.href ? C.coral : "transparent",
                        borderRadius: "2px",
                        transition: "background-color 0.15s",
                      }}
                    />
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
            color: textColor,
            padding: "8px",
            transition: "color 0.35s",
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            backgroundColor: C.cream,
            borderTop: `1px solid rgba(15,28,63,0.08)`,
            padding: "1.25rem 1.5rem 2rem",
          }}
          className="md:hidden"
        >
          {/* About Us */}
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            style={{
              display: "block",
              padding: "0.8rem 0",
              color: C.navy,
              fontWeight: 500,
              textDecoration: "none",
              borderBottom: `1px solid rgba(15,28,63,0.06)`,
              fontSize: "0.95rem",
            }}
          >
            About Us
          </Link>

          {/* Services accordion */}
          <div style={{ borderBottom: `1px solid rgba(15,28,63,0.06)` }}>
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "0.8rem 0",
                color: C.navy,
                fontWeight: 500,
                background: "none",
                border: "none",
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Services
              <ChevronDown
                size={16}
                style={{
                  transition: "transform 0.25s",
                  transform: mobileServicesOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </button>
            {mobileServicesOpen && (
              <div style={{ paddingBottom: "0.5rem" }}>
                {SERVICES.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "0.6rem 0 0.6rem 1rem",
                      color: C.navy,
                      fontWeight: 500,
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      borderLeft: `2px solid ${C.coral}`,
                      marginBottom: "0.25rem",
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
              display: "block",
              padding: "0.8rem 0",
              color: C.navy,
              fontWeight: 500,
              textDecoration: "none",
              borderBottom: `1px solid rgba(15,28,63,0.06)`,
              fontSize: "0.95rem",
            }}
          >
            Contact
          </a>

          <a
            href={BOOKING_URL}
            onClick={() => setMobileOpen(false)}
            style={{
              display: "block",
              marginTop: "1.25rem",
              backgroundColor: C.coral,
              color: "#fff",
              padding: "0.85rem 1.5rem",
              borderRadius: "3px",
              textAlign: "center",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "0.875rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
