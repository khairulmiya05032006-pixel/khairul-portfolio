"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const DarkToggle = ({
  darkMode,
  mounted,
  toggleDark,
  size = 16,
}: {
  darkMode: boolean;
  mounted: boolean;
  toggleDark: () => void;
  size?: number;
}) => (
  <button
    onClick={toggleDark}
    aria-label="Toggle dark mode"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2.25rem",
      height: "2.25rem",
      borderRadius: "9999px",
      border: "1px solid var(--border)",
      background: "transparent",
      color: "var(--subtext)",
      cursor: "pointer",
      transition: "color 200ms, border-color 200ms, background 200ms",
      flexShrink: 0,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = "var(--primary)";
      e.currentTarget.style.borderColor = "var(--primary)";
      e.currentTarget.style.background = "var(--primary-muted)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "var(--subtext)";
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.background = "transparent";
    }}
  >
    {/* Only render icon after mount to avoid hydration mismatch */}
    {mounted ? (darkMode ? <Sun size={size} /> : <Moon size={size} />) : <Moon size={size} />}
  </button>
);

/** 
 * Applies the correct theme classes to <html>.
 * - isDark=true  → adds `.dark`,  removes `.light`
 * - isDark=false → adds `.light`, removes `.dark`
 * 
 * The `.light` class is required so the CSS media query
 * `@media (prefers-color-scheme: dark) { html:not(.light) }` can be
 * correctly overridden when the user manually selects light mode.
 */
function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const prefersDark = mediaQuery.matches;
    const isDark = stored ? stored === "dark" : prefersDark;

    applyTheme(isDark);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDarkMode(isDark);
     
    setMounted(true);

    // React to OS-level theme changes (only when user hasn't manually set a preference)
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches);
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    applyTheme(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About",     href: "#about" },
    { name: "Skills",    href: "#skills" },
    { name: "Projects",  href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact",   href: "#contact" },
  ];



  return (
    <>
      <style>{`
        .nav-desktop { display: none; }
        .nav-mobile-controls { display: flex; }
        @media (min-width: 768px) {
          .nav-desktop { display: flex; }
          .nav-mobile-controls { display: none; }
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          transition: "background 200ms, box-shadow 200ms, padding 200ms",
          background: scrolled ? "var(--bg-alt)" : "transparent",
          boxShadow: scrolled ? "0 1px 0 var(--border)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          padding: scrolled ? "0.875rem 0" : "1.25rem 0",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            {/* Logo */}
            <a href="#" style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textDecoration: "none",
            }}>
              KM
            </a>

            {/* Desktop nav links + single toggle */}
            <div
              className="nav-desktop"
              style={{ alignItems: "center", gap: "2rem" }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "var(--subtext)",
                    textDecoration: "none",
                    transition: "color 200ms",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--subtext)")}
                >
                  {link.name}
                </a>
              ))}
              <DarkToggle darkMode={darkMode} mounted={mounted} toggleDark={toggleDark} size={16} />
            </div>

            {/* Mobile: single toggle + hamburger */}
            <div
              className="nav-mobile-controls"
              style={{ alignItems: "center", gap: "0.5rem" }}
            >
              <DarkToggle darkMode={darkMode} mounted={mounted} toggleDark={toggleDark} size={15} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                style={{ color: "var(--subtext)", background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div style={{
            position: "absolute",
            width: "100%",
            background: "var(--bg-alt)",
            borderBottom: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
          }}>
            <div style={{ padding: "0.75rem 1rem 1rem" }}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.625rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color: "var(--subtext)",
                    textDecoration: "none",
                    transition: "background 200ms, color 200ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--primary-muted)";
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--subtext)";
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
