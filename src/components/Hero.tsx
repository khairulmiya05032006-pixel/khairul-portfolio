"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Subtle background blobs */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-6rem", left: "-4rem",
          width: "28rem", height: "28rem",
          background: "radial-gradient(circle, rgba(36,96,232,0.08) 0%, transparent 70%)",
          borderRadius: "9999px",
        }} />
        <div style={{
          position: "absolute", bottom: "0", right: "-4rem",
          width: "24rem", height: "24rem",
          background: "radial-gradient(circle, rgba(11,165,224,0.07) 0%, transparent 70%)",
          borderRadius: "9999px",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <p style={{
            display: "inline-block",
            marginBottom: "1.25rem",
            padding: "0.3rem 1rem",
            borderRadius: "9999px",
            background: "var(--primary-muted)",
            color: "var(--primary)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            Welcome to my portfolio
          </p>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "1.25rem",
          }}>
            Hi, I&apos;m{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {portfolioData.name}
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: "clamp(1.0625rem, 2.5vw, 1.25rem)",
            color: "var(--subtext)",
            lineHeight: 1.65,
            maxWidth: "36rem",
            margin: "0 auto 2.5rem",
          }}>
            {portfolioData.role} — building clean, performant digital products from front to back.
          </p>

          {/* CTA row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
            <a
              href="#projects"
              className="btn-primary"
            >
              View My Work
              <ArrowRight size={17} />
            </a>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {(
                [
                  { href: portfolioData.github,   Icon: Github,   label: "GitHub" },
                  { href: portfolioData.linkedin, Icon: Linkedin, label: "LinkedIn" },
                  ...(portfolioData.twitter ? [{ href: portfolioData.twitter, Icon: Twitter, label: "Twitter" }] : []),
                ] as { href: string; Icon: typeof Github; label: string }[]
              ).map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "2.625rem",
                    height: "2.625rem",
                    borderRadius: "9999px",
                    border: "1px solid var(--border)",
                    background: "var(--bg-alt)",
                    color: "var(--subtext)",
                    transition: "color 200ms, border-color 200ms, background 200ms",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.background = "var(--primary-muted)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--subtext)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--bg-alt)";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
