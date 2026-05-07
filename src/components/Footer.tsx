"use client";


import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: portfolioData.github,   Icon: Github,   label: "GitHub" },
    { href: portfolioData.linkedin, Icon: Linkedin, label: "LinkedIn" },
    ...(portfolioData.twitter ? [{ href: portfolioData.twitter, Icon: Twitter, label: "Twitter" }] : []),
    { href: `mailto:${portfolioData.email}`, Icon: Mail, label: "Email" },
  ];

  return (
    <footer style={{
      background: "var(--bg)",
      borderTop: "1px solid var(--border)",
      padding: "3rem 0",
    }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
        }}>

          {/* Branding */}
          <div>
            <span style={{
              display: "inline-block",
              fontSize: "1.125rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.375rem",
            }}>
              KM
            </span>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", maxWidth: "20rem", lineHeight: 1.65 }}>
              Building clean, performant web experiences with passion and precision.
            </p>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "9999px",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 200ms, border-color 200ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.borderColor = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>
              © {currentYear} {portfolioData.name}. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
